import { getRootRoutes } from './getRootRoutes';
import * as React from 'react';

import { EnhancedAreaRoute, flattenRoutes, RoutingArea } from '../../routing';

const useRoutesForArea: (area: RoutingArea, currentPath: string) => EnhancedAreaRoute[] = (area, currentPath) => {
    const rootRoutes = getRootRoutes();

    const [areaRoutes, setAreaRoutes] = React.useState<EnhancedAreaRoute[]>([]);

    React.useEffect(() => {
        setAreaRoutes(flattenRoutes(rootRoutes, area, currentPath));
    }, [rootRoutes, area, currentPath]);

    return areaRoutes;
};

export {
    useRoutesForArea,
}
