import { PATH_SEPARATOR, RouteWithChildren } from '../../routing';

const flattenRoutes = <AREA extends string>(
    routes: RouteWithChildren[] = [],
    area: AREA,
    currentPath: string,
    rootRoute?: RouteWithChildren,
): RouteWithChildren[] => {
    let result: RouteWithChildren[] = [];
    routes.forEach(route => {
        let childrenRoutes: RouteWithChildren[] = [];
        const sealed = Object.assign({}, route);
        const { rendering } = sealed;

        const areaRendering = rendering && rendering.find(item => {
            return item.area === area;
        });

        if (areaRendering) {
            sealed.rendering = [areaRendering];
        }

        if (sealed.routes && sealed.routes.length > 0) {
            childrenRoutes = flattenRoutes(sealed.routes, area, currentPath, sealed);
            result = [...result, ...childrenRoutes];
        }

        delete sealed.routes;

        if (areaRendering) {
            result.push(sealed);
        }
    });

    return result;
};

export {
    flattenRoutes
}
