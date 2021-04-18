import { RouteWithChildren, routingRegistry } from '../factory';

export const retrieveRoute = (parts: string[] = [], routes = routingRegistry): RouteWithChildren | undefined => {
    const part = parts.shift();

    if (parts.length > 0) {
        const nextRule = routes.find(route => route.path === part);

        if (nextRule) {
            return retrieveRoute(parts, nextRule.routes);
        } else {
            // TODO: add logger
            console.warn(`Routing rule that corresponds to path ${part} has not been found! Processing stopped`);
            return;
        }
    } else {
        // Target Routing Rule
        const targetRule = routes.find(route => route.path === part);

        if(targetRule) {
            return targetRule
        } else {
            // TODO: add logger
            console.warn(`Target Routing Rule with path ${part} has not been found!`);
            return;
        }
    }
}
