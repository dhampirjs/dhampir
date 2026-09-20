import { RouteWithChildren, routingRegistry } from '../factory';

const WILDCARD_SUFFIX = '/*';

const validateRouteTree = (route: RouteWithChildren): void => {
    const { id, path, routes = [] } = route;

    if (routes.length > 0) {
        const paths = Array.isArray(path) ? path : [path];
        const missingWildcard = paths.some(entry => !entry || !entry.endsWith(WILDCARD_SUFFIX));

        if (missingWildcard) {
            throw Error(
                `Route "${id}" has children but its path "${path}" doesn't end in "${WILDCARD_SUFFIX}". ` +
                `Without it, react-router can never match anything beneath this route, so its children ` +
                `would be reachable in the nav registry but never at those URLs. Add "${WILDCARD_SUFFIX}" to its path.`
            );
        }
    }

    routes.forEach(validateRouteTree);
};

const registerRootRouting = (routing: RouteWithChildren[] = []): void => {
    routing.forEach(rootRoute => {
        const { id: rootRouteId } = rootRoute;

        const exists = routingRegistry.some(entry => entry.id === rootRouteId);

        if (exists) {
            throw Error(`Root routing with ID ${rootRouteId} already exists. Please, choose another id`);
        }

        validateRouteTree(rootRoute);

        routingRegistry.push(rootRoute);
    });
};

export {
    registerRootRouting,
}
