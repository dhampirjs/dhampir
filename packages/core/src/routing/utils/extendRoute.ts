import { RouteWithChildren } from '../factory';
import { retrieveRoute } from './retrieveRoute';
import { assoc } from 'ramda';
import { updateRoute } from './updateRoute';

export const extendRoute = (parts: string[], route: RouteWithChildren) => {
    const parentRoute = retrieveRoute([...parts]);

    if (parentRoute) {
        const routes = parentRoute?.routes || [];

        const newRoute = assoc('routes', [...routes!, route], parentRoute);

        updateRoute(parts, newRoute);
    } else {
        throw new Error(`No such route ${JSON.stringify(parts)}`)
    }
}
