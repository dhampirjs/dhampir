import { RouteProps } from 'react-router';

export enum RoutingArea {
    HEADING = 'heading',
    SUBHEADING = 'subheading',
    BODY = 'body',
    MAIN = 'center',
    LEFT = 'left',
    RIGHT = 'right',
    FOOTER = 'footer',
    FOOTER_LEFT = 'footer_left',
    FOOTER_RIGHT = 'footer_right',
}

export interface RouteNavigationOptions {
    label?: string;
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
