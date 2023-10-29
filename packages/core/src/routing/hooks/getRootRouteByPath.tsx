import { RouteWithChildren } from '../factory';
import {getRootRoutes} from "./getRootRoutes";
import {PATH_SEPARATOR} from "../constants";
import {isRootRoute} from "../utils/isRootRoute";

const createFindRouteRule: (parts: string) => (route: RouteWithChildren) => boolean = (firstPart) => ({ path }) => {
    const isRootNested = path === PATH_SEPARATOR + "*";
    const isEqual = path === firstPart;
    const isNested = [firstPart, `*`].join(PATH_SEPARATOR) === path;
    const isNestedWithTrailingSlash = ['', firstPart, `*`].join(PATH_SEPARATOR) === path;
    return isEqual || isNested || isNestedWithTrailingSlash || isRootNested;
}

const getRootRouteByPath: (currentPath: string) => RouteWithChildren | undefined = (currentPath) => {
    const rootRoutes = getRootRoutes();

    if(isRootRoute(currentPath)) {
        return rootRoutes.find(createFindRouteRule(currentPath)) || undefined;
    }

    if(rootRoutes.length === 1) {
        const root = rootRoutes[0];
        const parts = currentPath.split(PATH_SEPARATOR).filter(Boolean);
        return (root && root.routes?.find(createFindRouteRule(parts[0]))) ? root : undefined;
    } else {
        const parts = currentPath.split(PATH_SEPARATOR).filter(Boolean);
        const first = rootRoutes.find(createFindRouteRule(parts[0]));

        if(first) {
            return first;
        } else {
            const root = rootRoutes.find(({ path }) => {
                return path === PATH_SEPARATOR || path === [PATH_SEPARATOR, "*"].join('');
            });

            return (root && root.routes?.find(createFindRouteRule(parts[0]))) ? root : undefined;
        }
    }

    return undefined;
};

export { getRootRouteByPath }
