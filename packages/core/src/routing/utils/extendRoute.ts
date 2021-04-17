import { RouteWithChildren } from '../factory';
import { retrieveRoute } from './retrieveRoute';
import { assoc } from 'ramda';
import { updateRoute } from './updateRoute';

export const extendRoute = (parts: string[], route: RouteWithChildren) => {
    const parentRoute = retrieveRoute([...parts]);

    if (parentRoute) {
        const routes = parentRoute?.routes || [];

        if(routes.some(r => r.path === route.path)) {
            throw new Error(`Route with path ${route.path} already exists, please choose correct one.`)
        }

        const newRoute = assoc('routes', [...routes!, route], parentRoute);

        updateRoute(parts, newRoute);
    } else {
        throw new Error(`No such route ${JSON.stringify(parts)}.`)
    }
}
