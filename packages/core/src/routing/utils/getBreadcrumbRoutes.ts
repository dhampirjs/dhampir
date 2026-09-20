import { RouteWithChildren } from '../factory';
import { getRootRouteByPath } from '../hooks/getRootRouteByPath';
import { PATH_SEPARATOR } from '../constants';
import { stripPath } from './stripPath';
import { isRouteDynamic } from './isRouteDynamic';
import { normalizePath } from './getDescendantRoutes';

export interface BreadcrumbRouteMatch {
    route: RouteWithChildren;
    path: string;
    params: Record<string, string>;
}

const firstPath = (path: string | string[]): string => Array.isArray(path) ? path[0] : path;

const getBreadcrumbRoutes = (currentPath: string): BreadcrumbRouteMatch[] => {
    const rootRoute = getRootRouteByPath(currentPath);

    if (!rootRoute) {
        return [];
    }

    const segments = currentPath.split(PATH_SEPARATOR).filter(Boolean);
    const rootSegments = stripPath(firstPath(rootRoute.path!)).split(PATH_SEPARATOR).filter(Boolean);

    let remaining = segments.slice(rootSegments.length);
    let matchedPath = normalizePath(rootSegments.join(PATH_SEPARATOR));
    let params: Record<string, string> = {};
    let currentRoute = rootRoute;

    const chain: BreadcrumbRouteMatch[] = [
        { route: rootRoute, path: matchedPath, params: { ...params } },
    ];

    while (remaining.length > 0 && currentRoute.routes && currentRoute.routes.length > 0) {
        const [segment, ...rest] = remaining;

        const nextRoute = currentRoute.routes.find(route => {
            const cleanPath = stripPath(firstPath(route.path!));
            return cleanPath === segment || isRouteDynamic(cleanPath);
        });

        if (!nextRoute) {
            break;
        }

        const cleanPath = stripPath(firstPath(nextRoute.path!));

        if (isRouteDynamic(cleanPath)) {
            const paramName = cleanPath.replace(':', '');
            params = { ...params, [paramName]: segment };
        }

        matchedPath = normalizePath([stripPath(matchedPath), segment].filter(Boolean).join(PATH_SEPARATOR));

        chain.push({ route: nextRoute, path: matchedPath, params: { ...params } });

        currentRoute = nextRoute;
        remaining = rest;
    }

    return chain;
};

export { getBreadcrumbRoutes };
