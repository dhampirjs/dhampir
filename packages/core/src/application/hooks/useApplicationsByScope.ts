import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../../extensions/context';
import { ApplicationRegistry, applicationRegistry, ApplicationScope, RootApplicationProps } from '../';

const getScopeApps = <P = RootApplicationProps>(scope: ApplicationScope): ApplicationRegistry<P> => {
    const ids = Object
        .keys(applicationRegistry)
        .filter(appId => applicationRegistry[appId]?.scope === scope)

    const appList = {};

    ids.reduce<ApplicationRegistry<P>>((acc, appId) => {
        acc[appId] = applicationRegistry[appId];
        return acc;
    }, appList);

    return appList || {};
};

export const useApplicationsByScope: <P = RootApplicationProps>(scope?: ApplicationScope) => ApplicationRegistry<P> = <P>(scope = ApplicationScope.MULTIPLE) => {
    const { version } = useContext(ExtensionContext);
    const [applications, setApplications] = useState(getScopeApps<P>(scope));

    useEffect(() => {
        setApplications(getScopeApps<P>(scope));
    }, [version, scope]);

    return applications;
};
