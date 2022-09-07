import { FunctionComponent } from 'react';
import { Route, Routes, BrowserRouter, RouteProps, Navigate } from 'react-router-dom';
import { getRootRoutes } from '../../hooks';
import { NOT_FOUND_PATH } from '../../constants';

export const RootArea: FunctionComponent = () => {
    const routes = getRootRoutes();

    return <BrowserRouter>
        <Routes>
            {routes.map(({ path, redirect, element, children }) => {
                const relevant: RouteProps = {
                    element,
                    children,
                };
                const id = Array.isArray(path) ? path.join('_') : path;

                return redirect
                    ? <Route key={id} path={path} element={<Navigate to={redirect!}/>}/>
                    : <Route key={id} path={path} {...relevant} />
            })}
            <Route element={<Navigate to={NOT_FOUND_PATH} />} />
        </Routes>
    </BrowserRouter>
}
