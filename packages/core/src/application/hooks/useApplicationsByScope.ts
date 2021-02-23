import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../../context';
import { ApplicationRegistry, applicationRegistry, ApplicationScope } from '../';

const getScopeApps = (scope: ApplicationScope): ApplicationRegistry<any> => {
    const ids = Object
        .keys(applicationRegistry)
        .filter(appId => applicationRegistry[appId]?.scope === scope)

    const appList = {};

    ids.reduce<ApplicationRegistry<any>>((acc, appId) => {
        acc[appId] = applicationRegistry[appId];
        return acc;
    }, appList);

    return appList || {};
};

export const useApplicationsByScope: (scope?: ApplicationScope) => ApplicationRegistry<any> = (scope = ApplicationScope.MULTIPLE) => {
    const { version } = useContext(ExtensionContext);
    const [applications, setApplications] = useState(getScopeApps(scope));

    useEffect(() => {
        setApplications(getScopeApps(scope));
    }, [version, scope]);

    return applications;
};
