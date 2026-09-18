import {BrowserRouter, BrowserRouterProps, RouteProps, Navigate} from 'react-router-dom';
import {Route, Routes} from 'react-router';
import {getRootRoutes} from '../../hooks';

export interface RootAreaProps {
    future?: BrowserRouterProps['future'];
}

export const RootArea = ({future}: RootAreaProps = {}) => {
    const routes = getRootRoutes();

    return <BrowserRouter future={{v7_startTransition: true, ...future}}>
        <Routes>
            {routes.map(({path, redirect, element}) => {
                const relevant: RouteProps = {
                    element,
                };
                const id = Array.isArray(path) ? path.join('_') : path;

                return redirect
                    ? <Route key={id} path={path} element={<Navigate to={redirect!}/>}/>
                    : <Route key={id} path={path} {...relevant} />
            })}
        </Routes>
    </BrowserRouter>
}
