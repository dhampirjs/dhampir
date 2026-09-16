import {FlattenRendering} from '../factory';
import {flattenRoutes} from '../utils';
import {getRootRouteByPath} from './getRootRouteByPath';

const resolveAreaRendering: <AREA extends string = string>(area: AREA, currentPath: string) => FlattenRendering[] = <AREA extends string = string>(
    area,
    currentPath
) => {
    const rootRoute = getRootRouteByPath(currentPath);

    const result = rootRoute ? flattenRoutes<AREA>(rootRoute, area, currentPath) : [];
    return result;
};

export {
    resolveAreaRendering,
}
