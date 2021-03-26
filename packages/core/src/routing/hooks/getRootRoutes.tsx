import React from 'react';
import { EnhancedRootRoute, routingRegistry } from '../factory';

const getRootRoutes: () => EnhancedRootRoute[] = () => {
    return routingRegistry;
};

export { getRootRoutes }
