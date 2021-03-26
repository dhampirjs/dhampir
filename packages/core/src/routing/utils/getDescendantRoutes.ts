import { EnhancedAreaRoute, getRootRoutes, PATH_SEPARATOR } from '../../routing';

const getDescendantRoutes = (
    parentPath: string | string[],
    expand = false,
): EnhancedAreaRoute[] => {
    if (Array.isArray(parentPath)) {
        parentPath = parentPath[0]
    }

    const parts = (parentPath === PATH_SEPARATOR) ? [parentPath] : [...parentPath
        .split(PATH_SEPARATOR)
        .filter(part => !!part)
        .map(path => normalizePath(path))];

    return retrieveRoutes(getRootRoutes(), parts);
};

export const normalizePath = (path: string): string => {
    if(!path) {
        return path;
    }

    return `${PATH_SEPARATOR}${path}`.replace(RegExp(`\\${PATH_SEPARATOR}+`, 'gi'), PATH_SEPARATOR);
}

const createPathFinder = (path: string) => (route: EnhancedAreaRoute) => {
    return Array.isArray(route.path) ? route.path.includes(path) : normalizePath(route.path!) === path;
}

const retrieveRoutes = (routes: EnhancedAreaRoute[] = [], parts: string[] = [], prefix = ''): EnhancedAreaRoute[] => {
    if(routes.length === 0) {
        return [];
    }

    const head = parts.shift();
    const route = routes.find(createPathFinder(head!))

    if (route === undefined) {
        return [];
    }

    if(parts.length === 0) {
        return route.routes || [];
    } else {
        const fullPath = normalizePath([prefix, head].join(PATH_SEPARATOR));
        return retrieveRoutes(route.routes!, parts, fullPath);
    }
}

export {
    getDescendantRoutes
}
