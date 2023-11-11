import {AreaRouteRendering, FlattenRendering, PATH_SEPARATOR, RouteWithChildren} from '../index'
import {isRootRoute} from './isRootRoute'
import {stripPath} from './stripPath'
import {isRouteDynamic} from './isRouteDynamic'

const isRouteWithStar = (routePath?: string) => {
    return routePath && routePath.endsWith(`${PATH_SEPARATOR}*`)
}

const createFlattenRouteList = (
    path: string,
    rendering: AreaRouteRendering[],
    isRoot: boolean,
    area: string,
    isLast = false
) => {
    return [
        {
            isRootRoute: isRoot,
            rendering: (isRouteWithStar(path) || isLast) && rendering ? rendering : [],
            path,
            area,
        },
    ]
}

const processRoute = ({
                          pathSections = [],
                          area,
                          route,
                          isRoot = true,
                      }: {
    pathSections: string[]
    route: RouteWithChildren
    area: string
    isRoot: boolean
}): FlattenRendering[] => {
    if (pathSections.length === 0) return []

    const {rendering, path, routes = []} = route

    const relevantRendering = rendering?.filter(item => {
        return item.area === area
    })

    const [currentSection, ...sections] = pathSections;

    if (currentSection === stripPath(path!) || isRouteDynamic(stripPath(path!))) {
        const isLast = pathSections.length === 1;

        const searchedRoute = createFlattenRouteList(
            path!,
            relevantRendering!,
            isRootRoute(path!) || isRoot,
            area,
            isLast,
        )
        return [
            ...searchedRoute,
            ...(routes !== undefined && routes.length > 0
                ? routes.reduce<FlattenRendering[]>((acc, route) => {
                    return [
                        ...acc,
                        ...processRoute({
                            route: route,
                            pathSections: sections,
                            area,
                            isRoot: false,
                        }),
                    ]
                }, [])
                : []),
        ]
    }

    return []
}
const flattenRoutes = <AREA extends string>(
    rootRoute: RouteWithChildren,
    area: AREA,
    currentPath: string
): FlattenRendering[] => {
    const {path} = rootRoute
    const parts = currentPath.split(PATH_SEPARATOR).filter(Boolean)

    if (stripPath(path!) !== parts[0]) {
        parts.unshift(PATH_SEPARATOR)
    }

    const routeCopy = Object.assign({}, rootRoute)
    return processRoute({pathSections: parts, route: routeCopy, area, isRoot: true})
}

export {flattenRoutes}
