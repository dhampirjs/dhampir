import * as React from 'react';
import { Route, Redirect, Switch, RouteProps, useLocation } from 'react-router';
import { useRoutesForArea } from '../../hooks';

interface AreaProps<T> {
    area: T;
}

const renderRedirect = (from: string, to: string) => {
    return <Route key={`${from}-${to}`} path={from}>
        <Redirect exact={true} to={to}/>
    </Route>;
}

const Area: React.FunctionComponent<AreaProps<string> & RouteProps> = ({ area}) => {
    const location = useLocation();
    if (!location) {
        throw new Error(`"location" property is undefined. Most probably you don't use React Router.`);
    }

    const routes = useRoutesForArea(area, location?.pathname);
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
            return <Route key={key} {...{ path, exact, ...props }} />
        })}
    </Switch>;
};

export { Area };
