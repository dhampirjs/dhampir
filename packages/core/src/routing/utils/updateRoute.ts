import { RouteWithChildren, routingRegistry } from '../factory';

export const updateRoute = (parts: string[] = [], route: RouteWithChildren, routes = routingRegistry): void => {
    if (parts.length === 0) {
        return;
    }

    const part = parts.shift();

    if (parts.length > 0) {
        const nextRule = routes.find(route => route.path === part);

        if (nextRule) {
            return updateRoute(parts, route, nextRule.routes);
        } else {
            // TODO: add logger
            console.warn(`Routing rule that corresponds to path ${part} has not been found! Processing stopped`);
        }
    } else {
        // Target Routing Rule
        const index = routes.findIndex(route => route.path === part);

        if (index > -1) {
            routes.splice(index, 1, route);
        } else {
            // TODO: add logger
            console.warn(`Target Routing Rule with path ${part} has not been found!`);
        }
    }
}
