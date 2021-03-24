import { getRootRoutes } from './getRootRoutes';
import * as React from 'react';

import { EnhancedAreaRoute, flattenRoutes, RoutingArea } from '../../routing';

const useRoutesForArea: (area: RoutingArea, currentPath: string) => EnhancedAreaRoute[] = (area, currentPath) => {
    const rootRoutes = getRootRoutes();

    return flattenRoutes(rootRoutes, area, currentPath);
};

export {
    useRoutesForArea,
}
