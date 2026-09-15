# Dhampir Areas vs Next.js Parallel Routes

A detailed comparison of Dhampir Core's **Routing Areas** against **Next.js App Router parallel routes**, the closest
mainstream equivalent.

Both solve the same surface problem: one URL resolves into several independent regions of a page, the layout declares
empty slots, and the framework joins them. Everything below that line differs, and all of the differences follow from a
single structural choice.

## Contents

- [The structural difference](#the-structural-difference)
- [Mechanism side by side](#mechanism-side-by-side)
- [How Dhampir resolves an area](#how-dhampir-resolves-an-area)
- [How Next.js resolves a slot](#how-nextjs-resolves-a-slot)
- [Unmatched regions](#unmatched-regions)
- [Capability matrix](#capability-matrix)
- [Worked scenarios](#worked-scenarios)
- [When to use which](#when-to-use-which)
- [Implications for Dhampir](#implications-for-dhampir)

## The structural difference

```
Dhampir    <Area area="body_left"/>  ──pull──>  routingRegistry (mutable array)
                                                       ^
                                                       │ push, at runtime
                                             extendRoute(...) from any module


Next.js    app/@sidebar/products/page.tsx ──push──> layout.tsx({ sidebar })
                     ^
                     │ push, at build time
                the filesystem
```

Dhampir slots **pull by name** from a global registry that any module can mutate at runtime.
Next.js slots are **pushed as props** into exactly one layout, resolved from the file tree at build time.

Next.js bought static analyzability: the router is knowable without executing application code, which is precisely what
pays for React Server Components, per-slot streaming, prefetching and route-level caching. Dhampir bought runtime
openness: a module loaded after boot can add a screen, and nothing needs recompiling.

These two properties are mutually exclusive. Every difference in this document is a consequence of that one choice.

## Mechanism side by side

### Next.js

```
app/
  layout.tsx              export default ({ children, sidebar, main }) => ...
  @sidebar/
    products/page.tsx
    default.tsx
    loading.tsx
    error.tsx
  @main/
    products/page.tsx
    products/[id]/page.tsx
```

`@sidebar` never appears in the URL — it is a prop name. Exactly one layout owns it, and its position in the component
tree is its position in the filesystem. Each slot carries a complete router subtree of its own.

### Dhampir

```ts
registerRootRouting([{
    id: 'manage',
    path: '/manage/*',
    element: <AppLayout/>,
    routes: [{
        path: '/products',
        rendering: [
            { area: RoutingArea.BODY_LEFT, element: <Filters/> },
            { area: RoutingArea.BODY_MAIN, element: <List/> },
        ],
        navigation: { label: 'Products' },
    }],
}]);
```

`AppLayout` contains `<Area area={RoutingArea.BODY_LEFT}/>` and has no reference to `Filters`. `Filters` has no
knowledge of where it will be rendered. Slot and filler never meet.

Relevant source:

- `packages/core/src/routing/factory/routingRegistry.ts` — the registry itself
- `packages/core/src/routing/factory/API.ts` — `AreaRouteRendering`, `RouteWithChildren`, `RoutingArea`
- `packages/core/src/routing/utils/registerRootRouting.ts`, `extendRoute.ts` — registration and extension

## How Dhampir resolves an area

`flattenRoutes(rootRoute, area, currentPath)` splits the path and recurses one segment at a time, filtering each
level's `rendering` down to a single area:

```ts
const relevantRendering = rendering?.filter(item => item.area === area)
```

Each `<Area/>` therefore runs its **own independent walk of the whole route tree**. Five regions on screen means five
full tree walks per render.

`createFlattenRouteList` keeps a level's rendering only when `isRouteWithStar(path) || isLast` — contributions attach at
the leaf segment, or at any segment declared with a trailing `/*`. That is the mechanism behind "this header persists
across all child routes".

`Area` then rebuilds the chain as nested `<Routes>`:

```tsx
const [root, ...rest] = areaRendering;
return <>
    {root.rendering?.length > 0 && root.rendering[0].element}
    {renderRoutes(rest, true)}
</>;

// Leaf
<Routes>
    <Route path={route.path} element={<>
        {rendering.element}
        {renderRoutes(restRoutes)}   {/* next segment nests INSIDE previous */}
    </>}/>
</Routes>
```

Three consequences are visible in that code:

1. **Only `rendering[0]` is used.** Two modules contributing to the same area at the same path — the second is silently
   dropped. Next.js cannot express the collision at all: two things cannot claim one slot folder. Dhampir permits it and
   then discards. For a plugin system, a silent drop is the worse failure mode.
2. **`root` is unguarded.** If `areaRendering` is empty, `root` is `undefined` and `root.rendering` throws. This is why
   every `<Area/>` in `AppLayout` sits behind `isAreaVisible` — the guard is load-bearing, not cosmetic.
3. **Nested `<Routes>` per area per level.** Every region re-enters React Router matching. Next.js achieves the same
   parent-child composition through nested layouts inside the slot folder, in a single match pass.

Source: `packages/core/src/routing/utils/flattenRoutes.ts`, `packages/core/src/routing/dom/Area/Area.tsx`.

## How Next.js resolves a slot

All slots for a URL are resolved in one pass, on the server. Each slot renders as an independent React Server Component
subtree with its own Suspense and error boundaries, streaming to the client separately. A slot can contain its own
nested layouts, its own `loading.tsx` and `error.tsx`, and its own dynamic segments.

Because the slot set is known statically, the router can prefetch, cache and revalidate per region without the
application telling it anything.

## Unmatched regions

Scenario: `@sidebar` has a `/products` route but not `/settings`. The user navigates to `/settings`.

**Next.js.** On soft navigation the slot keeps its previously rendered content. On hard navigation or reload it renders
`default.tsx`, or 404s if that file is absent. This soft/hard asymmetry is the most frequently reported source of
confusion with parallel routes, and `default.tsx` is mandatory boilerplate for every slot.

**Dhampir.**

```tsx
{isAreaVisible(RoutingArea.BODY_LEFT, location.pathname) &&
    <Column><Area area={RoutingArea.BODY_LEFT}/></Column>}
```

The region collapses. No stale content, no fallback file, and the surrounding chrome — the `<Column>`, its borders and
padding — disappears with it. For a back-office layout where an empty sidebar should not leave a 240px gutter, this is
the behaviour you actually want.

Conceptually Dhampir wins here. The implementation currently undercuts it: `isAreaVisible` calls `useRoutesForArea`, so
it is a hook invoked conditionally inside `&&`, and it duplicates the tree walk that `<Area/>` is about to perform
anyway. See [Implications for Dhampir](#implications-for-dhampir).

Source: `packages/core/src/routing/dom/utils/isAreaVisible.ts`,
`packages/core/src/components/layout/AppLayout/AppLayout.tsx`.

## Capability matrix

| | Dhampir | Next.js parallel routes |
|---|---|---|
| Slot addressing | pull, `area: string`, anywhere at any depth | push, prop of one layout, filesystem position |
| Registration time | runtime, mutable array | build time, file tree |
| Slot name safety | none — a typo yields an empty region | folder name, typed layout props |
| Duplicate contributions | silently keeps `rendering[0]` | impossible by construction |
| Per-slot loading state | hand-rolled Suspense per contribution | `loading.tsx`, free |
| Per-slot error isolation | hand-rolled boundary | `error.tsx`, free |
| Per-slot data fetching | client side, inside each element | server side, streamed independently |
| Server Components | no — the registry is client-side mutable state | yes, the headline feature |
| Nested composition per region | yes, via `/*` and recursion | yes, via nested layouts in the slot |
| Modal over list, URL-addressable | none | intercepting routes `(.)`, `(..)` |
| Read the active segment of one slot | walk `flattenRoutes` manually | `useSelectedLayoutSegment('sidebar')` |
| Conditional region by auth or role | filter at registration, or in the layout | branch in the layout on the slot prop |
| Unfilled region | vanishes, chrome included | `default.tsx` or 404; stale on soft navigation |
| Third-party package adds a screen | **yes** — the entire point | **impossible** |
| Runtime, tenant or flag-driven routes | yes, bump `ExtensionContext.version` | no, requires a rebuild |
| Free-form region names | yes, `area` is `string` | no, your own folders only |
| Several whole apps in one shell | `applicationRegistry` + `ApplicationScope.MULTIPLE` | out of scope |
| Host requirement | React 18 + React Router 6, any bundler | Next.js, App Router, a build step |
| Code splitting per region | manual `React.lazy` in the contribution | automatic per route segment |

## Worked scenarios

### A separately-shipped package adds a Reports screen to the admin shell

**Dhampir.** The package runs, on import:

```ts
extendRoute(['/manage'], {
    path: '/reports',
    rendering: [{ area: RoutingArea.BODY_MAIN, element: <Reports/> }],
    navigation: { label: 'Reports' },
});
```

The shell is untouched. Navigation picks the entry up because `NavDataProvider` reads the same registry. This is the
case the whole design exists for.

**Next.js.** No mechanism exists. The package would have to write files into `app/` before the build runs. Parallel
routes are not an extension system and were never intended as one.

### Clicking a product opens it as a modal over the list, with a shareable URL, and reloading that URL shows a full page

**Next.js.** `@modal/(.)products/[id]/page.tsx` plus `@modal/default.tsx`. Intercepting routes give exactly this,
including the reload-shows-full-page half.

**Dhampir.** No analogue. You would model the modal as its own area, place `<Area area="modal"/>` in the layout,
register `/manage/products/:id` contributing to it, and hand-build the intercept semantics. Achievable, not provided.

## When to use which

**Next.js parallel routes**, when the regions are yours, in one repo, owned by one team, and you want server rendering,
per-region isolation and modals. More capability, no maintenance burden, and it is someone else's code to keep working.

**Dhampir areas**, when the contributors are plural and independent — plugins from separate packages, per-tenant screens
decided at runtime, feature-flagged verticals, several applications behind one shell — and when the host is an existing
Vite or CRA single-page app that is not moving to Next.js.

The two overlap on the mechanism and diverge on the problem. Parallel routes are a **rendering** feature: render several
regions of one page well. Dhampir's `Area` is an **architecture** feature: let N independently-shipped modules compose
one shell without knowing about each other.

## Implications for Dhampir

The multi-region framing is the weaker pitch. Next.js covered it in 2023 with considerably more depth, and a React
Router user will reasonably ask why not simply render two `<Routes>` trees — which is what `Area` does internally.

The contribution-model framing is the stronger one. Against that framing the comparison set is not Next.js at all, but
Backstage, Piral and single-spa-layout, and historically Drupal regions and Eclipse extension points.

Three changes would make the stronger pitch hold up:

1. **Make duplicate area contributions explicit.** Either merge them in declaration order, or fail loudly. Silently
   keeping `rendering[0]` is the wrong default for a plugin host.
2. **Turn `isAreaVisible` into a pure selector.** Build a per-path, per-area index once per navigation and read it
   synchronously. This removes the conditional hook call and the repeated tree walks in one move.
3. **Give every contribution an error boundary.** One plugin must not be able to take down the shell. The isolation
   Next.js provides for free is exactly what a plugin host needs most.
