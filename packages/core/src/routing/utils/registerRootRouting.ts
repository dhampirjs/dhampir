import { RouteWithChildren, routingRegistry } from '../factory';

const registerRootRouting = (routing: RouteWithChildren[] = []): void => {
    routing.forEach(rootRoute => {
        const { id: rootRouteId } = rootRoute;

        const exists = routingRegistry.some(entry => entry.id === rootRouteId);

        if (exists) {
            throw Error(`Root routing with ID ${rootRouteId} already exists. Please, choose another id`);
        } else {
            routingRegistry.push(rootRoute);
        }
    });
};

export {
    registerRootRouting,
}
