import { RouteWithChildren } from '../factory';
import { retrieveRoute } from './retrieveRoute';
import { assoc } from 'ramda';
import { updateRoute } from './updateRoute';

export const extendRoute = (parts: string[], route: RouteWithChildren): void => {
    const parentRoute = retrieveRoute([...parts]);

    if (parentRoute) {
        const children = parentRoute.children || [];

        if(children.some(r => r.path === route.path)) {
            throw new Error(`Route with path ${route.path} already exists, please choose correct one.`)
        }

        const newRoute = assoc('children', [...children!, route], parentRoute) as RouteWithChildren;

        updateRoute(parts, newRoute);
    } else {
        throw new Error(`No such route ${JSON.stringify(parts)}.`)
    }
}
