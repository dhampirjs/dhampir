# React Router Migration

Assessment of upgrading Dhampir Core from React Router v6 to v8, taking v7 as a waypoint.

All version claims below were verified against published npm packages on **2026-09-15** by inspecting package
metadata and the shipped type definitions, not documentation.

## Contents

- [Current state](#current-state)
- [Target: v8](#target-v8)
- [A note on nesting](#a-note-on-nesting)
- [What actually breaks on 6 to 7](#what-actually-breaks-on-6-to-7)
- [Pre-existing defects to fix first](#pre-existing-defects-to-fix-first)
- [Migration plan](#migration-plan)
- [What v8 requires beyond v7](#what-v8-requires-beyond-v7)
- [The data router tension](#the-data-router-tension)

## Current state

| Package | Declared (`dependencies`) | Declared (`peerDependencies`) | Resolved |
|---|---|---|---|
| `react-router` | `^6.26.1` | `^6.17.0` | 6.26.1 |
| `react-router-dom` | `^6.26.1` | `^6.17.0` | 6.26.1 |

Latest v6 is **6.30.6** — four minors behind.

The consumed API surface is small. Eight import sites, nine distinct APIs:

| API | Where |
|---|---|
| `BrowserRouter`, `Navigate` | `src/routing/dom/RootArea/RootArea.tsx:1` |
| `Routes`, `Route` | `src/routing/dom/RootArea/RootArea.tsx:2`, `src/routing/dom/Area/Area.tsx:2` |
| `useLocation` | `src/routing/dom/Area/Area.tsx:2`, `src/components/layout/AppLayout/AppLayout.tsx:5` |
| `NavLink` | `src/routing/dom/Link/Link.tsx:1` |
| `RouteProps` (type) | 11 usages across routing, components |

There is **no** use of `createBrowserRouter`, `RouterProvider`, loaders, actions, fetchers, `Form`, `useMatches`,
`useNavigate` or `useParams`. Dhampir uses React Router purely in declarative mode. This is the single most important
fact for the migration: four of the six v6 future flags are no-ops here.

## Target: v8

The latest published release is **8.3.1**. The v7 line is at **7.18.3**. Target **v8**, reached through v7.

| | v7.18.3 | v8.3.1 | Dhampir today |
|---|---|---|---|
| `react` peer | `>=18` | **`>=19.2.7`** | `^18.3.1` (dep), `^18.2.0` (peer) |
| `node` engine | `>=20.0.0` | **`>=22.22.0`** | inception declares `>=18.16.0` |
| Module format | CJS + ESM (`main` + `module`) | ESM-only (`"type": "module"`) | builds `['es6', 'commonjs']` |
| `react-router-dom` | published, re-exports core | **no v8 release** (stops at 7.18.3) | imported in 3 files |

The routing code change from v7 to v8 is approximately zero — every API Dhampir consumes is exported from bare
`react-router` in v8, with no deprecations. See [What v8 requires beyond v7](#what-v8-requires-beyond-v7). The cost of
v8 is entirely in the three platform bumps in the table above:

1. **React 18 to 19**, on both the `dependencies` entry and the `peerDependencies` range of `@dhampirjs/core`. This is
   the expensive one: it forces React 19 on every consumer, so shipping v8 makes this a Dhampir major in its own right.
2. **Node 18 to 22**, in `packages/inception`'s `engines.node`.
3. **Dropping `react-router-dom`**, which has no v8 release. Three import sites move to bare `react-router`.

**Why still route through v7 rather than jumping 6 to 8 in one step.** The staging mechanism for every behavioural
change between 6 and 7 is the v6 `future` flags, and those flags exist *only* in v6 — there is nothing equivalent to
turn on once you are past it. Landing on 7.18.3 first also separates routing-behaviour breakage from React 19
breakage, so a regression points at one bump rather than two. v7 is a waypoint, not the destination.

## A note on nesting

It is sometimes said that v6 lacks nesting that v7 provides. That is not accurate. Nested routes have existed since
v6.0, and v7 added no nesting capability that v6 lacks.

The real distinction is **which nesting style Dhampir uses**. `Area.tsx:26` renders *descendant* `<Routes>` — a
`<Routes>` tree inside another route's element:

```tsx
// src/routing/dom/Area/Area.tsx:26-31
<Routes>
    <Route path={route?.path} caseSensitive={rendering.caseSensitive} element={<>
        {rendering.element}
        {renderRoutes(restRoutes)}   {/* recurses into another <Routes> */}
    </>} />
</Routes>
```

The alternative is data-router nesting: `createBrowserRouter` with a route-object tree and `<Outlet/>`. Descendant
`<Routes>` still work in v7 and in v8 — verified, with zero `@deprecated` markers anywhere in the v8 type surface — but
they are invisible to the data layer: no loaders, no actions, no `useMatches`, no per-route error boundaries. That is
equally true in v6.4+, v7 and v8.

**Upgrading the router version will not change this.** It is an architectural choice, orthogonal to the version bump.
See [The data router tension](#the-data-router-tension).

## What actually breaks on 6 to 7

v7 has no breaking changes provided the v6 future flags are enabled first. Six flags exist.

| Flag | Applies to Dhampir | Why |
|---|---|---|
| `v7_relativeSplatPath` | **Yes — the only real risk** | the codebase is splat-heavy |
| `v7_startTransition` | Yes, indirectly | changes render scheduling |
| `v7_fetcherPersist` | No-op | no fetchers |
| `v7_normalizeFormMethod` | No-op | no `Form`, no `formMethod` |
| `v7_partialHydration` | No-op | no data router, no SSR |
| `v7_skipActionErrorRevalidation` | No-op | no actions |

Note that the `v7_*` flags exist **only in v6**. In v7 those behaviours are the defaults and the flags are gone
entirely — confirmed by grepping the v7.18.3 type definitions, which contain no `v7_*` identifiers. Staging therefore
has to happen on v6.30.6, before the major bump.

v7 does carry three `v8_*` flags — `v8_middleware`, `v8_passThroughRequests`, `v8_trailingSlashAwareDataRequests` — all
of which are framework/data-mode concerns and no-ops for declarative usage.

### `v7_relativeSplatPath` — audit carefully

Splats are load-bearing throughout routing:

- `isRootRoute` matches `/` and `/*`
- `isRouteWithStar` checks `path.endsWith('/*')` — the mechanism that makes a rendering persist across child routes
- `stripPath` strips a trailing `/*`
- `cleanRoutePath` strips `/\*+$/`
- root routes are registered in the `/manage/*` shape

The flag changes how relative paths resolve *beneath* a multi-segment splat route. The documented fix is to split the
route:

```tsx
// before
<Route path="dashboard/*" element={<Dashboard/>} />

// after
<Route path="dashboard">
  <Route index element={<Dashboard/>} />
  <Route path="*" element={<Dashboard/>} />
</Route>
```

Two places to check in Dhampir:

1. **`Link` targets.** `Navigation.tsx` uses `to={calculatedPath}` derived from `cleanRoutePath`, which yields `/manage`
   — absolute, so likely unaffected. Confirm no relative `to=` values exist in consuming applications.
2. **`Area`'s descendant `<Routes>`** (`Area.tsx:26`). These inherit their base path from the parent splat match, which
   is exactly the resolution behaviour the flag changes. **This is the highest-risk site in the codebase and needs
   tests before and after.**

### `v7_startTransition` — low direct risk, real indirect risk

Switches router state updates from `useState` to `useTransition`. The only documented break is `React.lazy` called
inside a component; Dhampir has none.

The indirect risk is Dhampir's re-render model: mutate a module-global registry, bump `ExtensionContext.version`, let
`useEffect` re-read. Under `useTransition` renders can be interrupted and replayed. Combined with the hook defects
below, this is where latent bugs will surface.

## Pre-existing defects to fix first

These are broken today and become more dangerous under concurrent rendering. Fixing them first keeps the migration from
being blamed for them.

**1. Hook called inside `useMemo`** — `src/routing/dom/Area/Area.tsx:40`

```tsx
const areaRendering = useMemo(() => useRoutesForArea(area, location.pathname), [area, location.pathname]);
```

**2. Hook called conditionally** — `src/routing/dom/utils/isAreaVisible.ts` calls `useRoutesForArea`, and
`AppLayout.tsx` invokes it inside `&&`:

```tsx
{isAreaVisible(RoutingArea.BODY_LEFT, location.pathname) && <Column>…</Column>}
```

Hook count varies per render. Illegal under React 18 and actively hazardous under `useTransition`.

**3. Unguarded destructure** — `src/routing/dom/Area/Area.tsx:42-44`

```tsx
const [root, ...rest] = areaRendering;
return <>{root.rendering?.length > 0 && …}</>;   // throws when areaRendering is []
```

**4. Wrong variable** — `src/hooks/useNavigation.ts:15-18` destructures `routePath` then ignores it, using the hook's
`path` argument instead. Every navigation node in a provider receives an identical path. Unrelated to the router
version, but it sits in code the migration will touch.

Defects 1 to 3 are one fix: build a per-path, per-area index once per navigation, expose `isAreaVisible` as a pure
selector over it, and have `Area` read the same index. That removes the hook violations, the duplicated tree walks and
the crash together.

## Migration plan

**Step 0 — fix the hooks.** Defects 1 to 3 above. Separate PR, no version change. Add tests covering `Area` across
splat and non-splat roots; the package currently has four test files and none cover `Area`.

**Step 1 — `6.26.1` to `6.30.6`.** Minor bump, no flags. Establishes the flag-capable baseline. Update both
`dependencies` and `peerDependencies`.

**Step 2 — flags, one PR each, on v6.30.6.**

```tsx
// src/routing/dom/RootArea/RootArea.tsx:8
<BrowserRouter future={{ v7_startTransition: true }}>
```

Then `v7_relativeSplatPath`, which is the one expected to need code changes and real testing. Then the four no-ops
together.

Worth doing in the same pass: let consumers pass `future` through. `RootArea` currently hardcodes `<BrowserRouter>`
with no props.

**Step 3 — `6.30.6` to `7.18.3`.** If the flags are green this is a version bump plus import consolidation. Move the
three `react-router-dom` imports to `react-router` (`RootArea.tsx:1`, `Link.tsx:1`, `routing/factory/API.ts:1`) and
drop the `react-router-dom` dependency. v7 still re-exports from `react-router-dom`, so v7 alone would not force this —
but v8 publishes no `react-router-dom` at all, so do it here rather than twice.

**Step 4 — manifests, interim.** Peer range to `^7.0.0`. Bump inception's `engines.node` from `>=18.16.0` to
`>=20.0.0`. Releasable state: Dhampir on v7, still React 18, still Node 20.

**Step 5 — React 18 to 19.** The gate for everything below, and the largest piece of work in this plan. Bump `react`
and `react-dom` in `dependencies` and widen `peerDependencies` to include 19; update `@types/react`, `@types/react-dom`
and `@testing-library/react`. Breaking for consumers, so it lands as a Dhampir major. It is also where the Step 0 hook
fixes pay off — React 19 is stricter, and the `useMemo`/conditional-hook violations would not survive it.

**Step 6 — Node 20 to 22.** Bump inception's `engines.node` to `>=22.22.0`, and the CI matrix with it. Required by
v8's own engine field and by the `require(esm)` interop the CommonJS build depends on.

**Step 7 — `7.18.3` to `8.3.1`.** With Steps 3, 5 and 6 done this is a version bump plus a peer range change to
`^8.0.0`. No import changes, no routing code changes. Verify the CommonJS build still resolves v8 through its
`module-sync` export condition.

## What v8 requires beyond v7

Verified by unpacking `react-router@8.3.1` and reading its shipped type definitions.

**The routing code change is approximately zero.** Every API Dhampir uses is exported from bare `react-router` in v8:
`BrowserRouter`, `Routes`, `Route`, `RouteProps`, `NavLink`, `Navigate`, `useLocation`, plus `Link`, `Outlet`,
`HashRouter`, `MemoryRouter`, `useRoutes`, `createRoutesFromChildren` and `createRoutesFromElements`. The v8
`index.d.ts` contains **zero** `@deprecated` markers.

Three points that are easy to get wrong:

1. **`react-router/dom` is irrelevant here.** Its entire public surface is `HydratedRouter`, `RouterProvider` and RSC
   helpers. `BrowserRouter` lives in the main entry. Dhampir imports none of the subpath's exports, so in v8 every
   import uses the bare `react-router` specifier — identical to v7.

2. **ESM-only is not a hard blocker.** v8's exports map includes a `module-sync` condition, which is Node's
   `require(esm)` interop condition. Node 22.12+ supports `require()` of a synchronous ESM graph, and v8 already
   mandates Node 22.22+, so the condition is always satisfiable. For browser bundlers it was never a concern. The
   `dist/commonjs` output is not disqualifying.

3. **The React 19 peer is the actual blocker.** `react: ">=19.2.7"`. Adopting v8 forces React 19 on every consumer of
   `@dhampirjs/core`.

So v8 is a React-version decision, not a router-architecture decision. That is what fixes the shape of the plan
above: Steps 5 and 6 are the real migration, and Step 7 — the router bump itself — is a manifest edit. Ship Steps 5 to
7 as one Dhampir major, since the React 19 peer is breaking for consumers whether or not v8 rides along with it.

## The data router tension

Worth recording, because it determines whether `createBrowserRouter` is ever viable here.

`createBrowserRouter` requires the complete route tree at creation time. Dhampir's `routingRegistry` is a mutable array
that `registerRootRouting` and `extendRoute` write to at runtime — that is the entire extensibility model. Using a data
router would mean recreating the router on every registration, discarding router state, or freezing the registry at
boot and losing runtime extension.

**Descendant `<Routes>` is what buys runtime-mutable routing.** Loaders, actions, and per-route error boundaries are
the price paid for it. Given the project's positioning as a contribution system (see `COMPARISON.md`), that trade
appears correct — but it should be a recorded decision rather than an accident, because it permanently rules out a
whole half of React Router's feature set.
