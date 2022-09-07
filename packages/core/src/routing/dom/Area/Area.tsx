import * as React from 'react';
import { Route, Navigate, Routes, RouteProps, useLocation } from 'react-router';
import { useRoutesForArea } from '../../hooks';

interface AreaProps<T> {
    area: T;
}

const renderRedirect = (from: string, to: string) => {
    return <Route key={`${from}-${to}`} path={from} element={<Navigate to={to}/>} />
}

const Area: React.FunctionComponent<AreaProps<string> & RouteProps> = ({ area}) => {
    const location = useLocation();
    if (!location) {
        throw new Error(`"location" property is undefined. Most probably you don't use React Router.`);
    }

    const routes = useRoutesForArea(area, location?.pathname);
    return routes.length > 0 ? <Routes>
        {routes.map(({
             path,
             rendering = [],
         }) => {
            if (rendering?.length === 0) {
                return;
            }

            const { element } = rendering[0];
            const props: RouteProps = {
                element,
            };

            const key = Array.isArray(path) ? path.join('_') : path
            return <Route key={key} {...{ path, ...props }} />
        })}
    </Routes> : null;
};

export { Area };
