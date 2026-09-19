import * as React from 'react';
// @ts-ignore - react-router v8 is ESM-only; resolves fine at runtime via its module-sync export condition, TS's node16 resolution just can't verify it statically
import {Route, Routes, RouteProps, useLocation} from 'react-router';
import {resolveAreaRendering} from '../../hooks';
import {FunctionComponent, useMemo} from "react";
import {FlattenRendering} from "../../factory";

interface AreaProps<T> {
    area: T;
}

const renderRoutes = (routes: FlattenRendering[] = [], isRoot = false) => {
    if (routes.length === 0) return null;
    return <Leaf routes={routes} />;
}

const Leaf: FunctionComponent<{ routes: FlattenRendering[] }> = (
    {
        routes = []
    }
) => {

    const [route, ...restRoutes] = routes;

    if (!route) return null;

    const rendering = route.rendering?.length > 0 ? route.rendering[0] : undefined;
    return <Routes>
        <Route path={route.path} caseSensitive={rendering?.caseSensitive} element={<>
            {rendering?.element}
            {renderRoutes(restRoutes)}
        </>} />
    </Routes>;
}
const Area: React.FunctionComponent<AreaProps<string> & RouteProps> = ({area}) => {
    const location = useLocation();
    if (!location) {
        throw new Error(`"location" property is undefined. Most probably you don't use React Router.`);
    }

    const areaRendering = useMemo(() => resolveAreaRendering(area, location.pathname), [area, location.pathname]);

    if (areaRendering.length === 0) return null;

    const [root, ...rest] = areaRendering;
    return <>
        {root.rendering?.length > 0 && root.rendering[0].element}
        {renderRoutes(rest, true)}
    </>;
};

export {Area};
