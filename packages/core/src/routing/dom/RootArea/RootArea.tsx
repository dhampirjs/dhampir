import { FunctionComponent } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { getRootRoutes } from '../../hooks';
import { NOT_FOUND_PATH } from '../../constants';
import { history } from '../../history';

export const RootArea: FunctionComponent = () => {
    const routes = getRootRoutes();

    return <Router history={history}>
        <Switch>
            {routes.map(({ path, redirect, component, children, render, exact }) => {
                const relevant: RouteProps = {
                    component,
                    render,
                    children,
                    exact,
                };
                const id = Array.isArray(path) ? path.join('_') : path;

                return redirect
                    ? <Route key={id} exact={exact} path={path}>
                        <Redirect to={redirect!}/>
                    </Route>
                    : <Route key={id} path={path} {...relevant} />
            })}
            <Redirect to={NOT_FOUND_PATH} />
        </Switch>
    </Router>
}
