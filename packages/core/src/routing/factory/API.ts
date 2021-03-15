import { RouteProps } from 'react-router';

export enum RoutingArea {
    TOP         = 'top',
    TOP_LEFT    = 'top_left',
    TOP_CENTER  = 'top_center',
    TOP_RIGHT   = 'top_right',

    MENU = 'menu',
    MENU_LEFT = 'menu_left',
    MENU_CENTER = 'menu_center',
    MENU_RIGHT = 'menu_right',

    BODY        = 'body',
    BODY_LEFT   = 'body_left',
    BODY_MAIN   = 'body_center',
    BODY_RIGHT  = 'body_right',

    BOTTOM          = 'bottom',
    BOTTOM_LEFT     = 'bottom_left',
    BOTTOM_CENTER   = 'bottom_center',
    BOTTOM_RIGHT    = 'bottom_right',
}

export interface RouteNavigationOptions {
    label?: string;
    params?: any;
}

export interface NavigationNode extends RouteNavigationOptions {
    path: string | string[];
}

export interface RouteWithNavigation<OPTIONS> {
    navigation?: OPTIONS;
    redirect?: string;
}

export interface AreaRouteRendering extends Pick<RouteProps, 'component' | 'render' | 'children' | 'exact'> {
    area: RoutingArea;
}

export interface RouteWithChildren extends RouteProps, RouteWithNavigation<RouteNavigationOptions> {
    routes?: EnhancedAreaRoute[];
    rendering?: AreaRouteRendering[];
}

export interface EnhancedRouteWithId {
    id: string;
}

export interface EnhancedRootRoute extends EnhancedRouteWithId, RouteWithChildren {
}

export interface EnhancedAreaRoute extends RouteWithChildren {
}
