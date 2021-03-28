import React from 'react';
import { RouteWithChildren, routingRegistry } from '../factory';

const getRootRoutes: () => RouteWithChildren[] = () => {
    return routingRegistry as RouteWithChildren[];
};

export { getRootRoutes }
