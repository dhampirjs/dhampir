# Dhampir

A React framework for composing an app's layout and routing from independently-registered extensions.

## Language

**Root route**:
A top-level route registered via `registerRootRouting`, matched directly by react-router's own `<Route>`. Its `path` must end in `/*` if it has children, since react-router's own matching (not dhampir's) requires that suffix to reach anything nested beneath it.
_Avoid_: top-level route, page route

**Descendant route**:
A route nested under a root route's `routes` array. Matched by dhampir's own path-walking logic (`getDescendantRoutes`, `flattenRoutes`), never by react-router itself — react-router only ever sees the root route's single wildcard path.
_Avoid_: child route, sub-route, nested route

**Label**:
A route's static, always-known display text, set via `navigation.label`. Used by `useNavigation`/`useRootNavigation` for section nav lists, and as the fallback for a route's own `resolveLabel` while pending or on failure.

**Resolve label**:
An async function on a route's `navigation` config (`navigation.resolveLabel`) that computes a route's display text from its currently matched params, for routes whose real value isn't known statically (e.g. `:productId` resolving to an actual product name via a data fetch). Falls back to the route's `label` while pending or on rejection.
_Avoid_: dynamic label, computed title

**Breadcrumb trail**:
The ordered list of every labeled ancestor route from the root down to, and including, the currently matched route. Produced by `useBreadcrumbs`. Distinct from a section's nav list (`useNavigation`'s siblings) — a breadcrumb trail is the ancestry of one specific matched location, not the children of a section.
_Avoid_: nav trail, path list
