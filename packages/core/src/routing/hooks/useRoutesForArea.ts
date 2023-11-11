import {FlattenRendering, flattenRoutes, getRootRouteByPath} from '../../routing';

const useRoutesForArea: <AREA extends string = string>(area: AREA, currentPath: string) => FlattenRendering[] = <AREA extends string = string>(
    area,
    currentPath
) => {
    const rootRoute = getRootRouteByPath(currentPath);

    const result = rootRoute ? flattenRoutes<AREA>(rootRoute, area, currentPath) : [];
    return result;
};

export {
    useRoutesForArea,
}
