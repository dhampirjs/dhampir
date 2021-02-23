import * as React from 'react';
import { Route, Redirect, Switch, RouteProps } from 'react-router';
import { EnhancedAreaRoute, RoutingArea } from '../../factory';
import { useRoutesForArea } from '../../hooks';


interface AreaProps {
    area: RoutingArea;
}

const renderRedirect = (from: string, to: string) => {
    return <Route key={`${from}-${to}`} path={from}>
        <Redirect exact={true} to={to}/>
    </Route>;
}

const Area: React.FunctionComponent<AreaProps & RouteProps> = ({ area, location }) => {
    const routes: EnhancedAreaRoute[] = useRoutesForArea(area, location?.pathname!);
    return <Switch>
        {routes.map(({
                         path,
                         exact,
                         rendering = [],
                         redirect
                     }) => {

            if (rendering?.length === 0) {
                return;
            }

            const { component, render, children } = rendering[0];
            const props: RouteProps = {
                component,
                render,
                children,
            };

            const key = Array.isArray(path) ? path.join('_') : path
            return <Route {...{ key, path, exact, ...props }} />
        })}
    </Switch>;
};

export { Area };