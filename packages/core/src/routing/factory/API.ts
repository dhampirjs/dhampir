import { RouteProps } from 'react-router';

export enum RoutingArea {
    TOP         = 'top',
    TOP_LEFT    = 'top_left',
    TOP_CENTER  = 'top_center',
    TOP_RIGHT   = 'top_right',

    MENU        = 'menu',
    MENU_LEFT   = 'menu_left',
    MENU_CENTER = 'menu_center',
    MENU_RIGHT  = 'menu_right',

    BODY        = 'body',
    BODY_LEFT   = 'body_left',
    BODY_MAIN   = 'body_main',
    BODY_RIGHT  = 'body_right',

    BOTTOM          = 'bottom',
    BOTTOM_LEFT     = 'bottom_left',
    BOTTOM_CENTER   = 'bottom_center',
    BOTTOM_RIGHT    = 'bottom_right',
}

export interface RouteNavigationOptions<NAV_PARAMS extends { [K in keyof NAV_PARAMS]?: string | number | boolean } = Record<string, string | number | boolean>> {
    label?: string;
    params?: NAV_PARAMS;
    /**
     * Computes this route's display label from its matched URL params (e.g. resolving a
     * real product name for `:productId`), for routes whose real value isn't known
     * statically. Only consumed by useBreadcrumbs; useNavigation/useRootNavigation read
     * `label` only. Falls back to `label` while pending or on rejection.
     */
    resolveLabel?: (params: Record<string, string>) => string | Promise<string>;
}

export interface NavigationNode extends RouteNavigationOptions {
    path: string | string[];
}

export interface BreadcrumbNode extends NavigationNode {
    isLoading?: boolean;
}

export interface RouteWithNavigation {
    navigation?: RouteNavigationOptions;
    redirect?: string;
}

export type FlattenRendering = {
    isRootRoute: boolean,
    path: string,
    rendering: AreaRouteRendering[],
    area: string,
};

export interface AreaRouteRendering<AREA extends string = string> extends Pick<RouteProps, 'element' | 'caseSensitive'> {
    area: AREA;
}

export type RouteWithChildren = RouteProps &  RouteWithNavigation & {
    id?: string;
    routes?: RouteWithChildren[];
    rendering?: AreaRouteRendering[];
}

