import * as React from 'react';
import { useContext, useMemo } from "react";
import { ExtensionContext } from '../../extensions/context';
import { EnhancedAreaRoute, getDescendantRoutes } from '../../routing';

const useRoutesForPath: (path: string | string[], expand: boolean) => EnhancedAreaRoute[] = (path, expand) => {
    const [routes, setRoutes] = React.useState<EnhancedAreaRoute[]>([]);

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
