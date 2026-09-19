// @ts-ignore - react-router v8 is ESM-only; resolves fine at runtime via its module-sync export condition, TS's node16 resolution just can't verify it statically
import {BrowserRouter, Route, RouteProps, Routes, Navigate} from 'react-router';
import {getRootRoutes} from '../../hooks';

export const RootArea = () => {
    const routes = getRootRoutes();

    return <BrowserRouter>
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
