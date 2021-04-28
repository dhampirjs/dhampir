import { getRootRoutes } from './getRootRoutes';

import { flattenRoutes, RouteWithChildren } from '../../routing';

const useRoutesForArea: <AREA extends string = string>(area: AREA, currentPath: string) => RouteWithChildren[] = <AREA extends string = string>(area, currentPath) => {
    const rootRoutes = getRootRoutes();

    return flattenRoutes<AREA>(rootRoutes, area, currentPath);
};

export {
    useRoutesForArea,
}
