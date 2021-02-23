import { getRootRoutes } from './getRootRoutes';
import * as React from 'react';
import {useMemo} from "react";
import { EnhancedAreaRoute, flattenRoutes, RoutingArea } from '../../routing';

const useRoutesForArea: (area: RoutingArea, currentPath: string) => EnhancedAreaRoute[] = (area, currentPath) => {
    const rootRoutes = getRootRoutes();
    const [areaRoutes, setAreaRoutes] = React.useState<EnhancedAreaRoute[]>([]);
    const routes = useMemo(
        () => flattenRoutes(rootRoutes, area, currentPath),
        [rootRoutes, rootRoutes.length, area, currentPath])

    React.useEffect(() => {
        setAreaRoutes(routes);
    }, [routes]);

    return areaRoutes;
};

export {
    useRoutesForArea,
}
