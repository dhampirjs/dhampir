import { RouteWithChildren, routingRegistry } from '../factory';

const getRootRoutes: () => RouteWithChildren[] = () => {
    return routingRegistry;
};

export { getRootRoutes }
