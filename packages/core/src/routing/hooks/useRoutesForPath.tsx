import * as React from 'react';
import { useContext, useMemo } from "react";
import { ExtensionContext } from '../../extensions';
import { RouteWithChildren, getDescendantRoutes } from '../../routing';

const useRoutesForPath: (path: string | string[], expand: boolean) => RouteWithChildren[] = (path, expand) => {
    const [routes, setRoutes] = React.useState<RouteWithChildren[]>([]);

    const { version } = useContext(ExtensionContext);

    const memoizedRoutes = useMemo(
        () => getDescendantRoutes(path, expand),
        [version, path, expand]
    );

    React.useEffect(() => {
        setRoutes(memoizedRoutes);
    }, [memoizedRoutes, path, version]);

    return routes;
};

export {
    useRoutesForPath,
}
