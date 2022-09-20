import {FlattenRendering, PATH_SEPARATOR, RouteWithChildren} from '../../routing';
import {isRootRoute} from "./isRootRoute";

const isPathRoot = (currentPath: string) => {
    return currentPath === PATH_SEPARATOR;
}

export const stripPath = <T>(path: string): string => {
    if(isRootRoute(path)) return PATH_SEPARATOR;

    if (path === '') return path;

    if (path.endsWith(`${PATH_SEPARATOR}*`)) {
        path = path.substring(0, path!.length - 2)
    }

    if (path.startsWith(PATH_SEPARATOR)) {
        path = path.substring(1, path.length)
    }

    return path;
};

const isRouteWithStar = (routePath?: string) => {
    return routePath && routePath.endsWith(`${PATH_SEPARATOR}*`)
}

const isRouteDynamic = (path?: string) => {
    return path && path.match(/:(\w+)/g);
}

const createFlattenRouteList = (path, rendering, isRoot, area, isLast = false) => {
    return (rendering && rendering.length > 0) ? [{
        isRootRoute: isRoot,
        rendering: (isRouteWithStar(path) || isLast) && rendering ? rendering : [],
        path,
        area
    }] : [];
}

const processRoute = ({pathSections = [], area, route, isRoot = true}: {
    pathSections: string[],
    route: RouteWithChildren,
    area: string,
    isRoot: boolean
}): FlattenRendering[] => {

    if (pathSections.length === 0) return [];

    const {rendering, path, routes} = route;

    const relevantRendering = rendering?.filter(item => {
        return item.area === area;
    });

    const currentSection = pathSections[0];

    if (currentSection === stripPath(path!) || isRouteDynamic(stripPath(path!))) {
        return [
            ...createFlattenRouteList(path, relevantRendering, isRootRoute(path!) || isRoot, area, pathSections.length === 0),
            ...(routes?.length ? processRoute({ route: routes.shift()!, pathSections: pathSections.slice(1), area, isRoot: false }) : []),

        ];

    }

    return [];
}
const flattenRoutes = <AREA extends string>(
    rootRoute: RouteWithChildren,
    area: AREA,
    currentPath: string,
): FlattenRendering[] => {
    const { path } = rootRoute;
    const parts = currentPath.split(PATH_SEPARATOR).filter(Boolean);

    if(stripPath(path!) !== parts[0]) {
        parts.unshift(PATH_SEPARATOR);
    }

    const routeCopy = Object.assign({}, rootRoute);
    return processRoute({ pathSections: parts, route: routeCopy, area, isRoot: true });
};

export {
    flattenRoutes
}
