import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../../extensions/context';
import { ApplicationRegistry, applicationRegistry, ApplicationScope, RootApplicationProps } from '../';
import {IndexRouteProps} from "react-router";

const getScopeApps = <P extends RootApplicationProps>(scope: ApplicationScope): ApplicationRegistry => {
    const ids = Object
        .keys(applicationRegistry)
        .filter(appId => applicationRegistry[appId]?.scope === scope)

    const appList = {};

    ids.reduce<ApplicationRegistry>((acc, appId) => {
        acc[appId] = applicationRegistry[appId];
        return acc;
    }, appList);

    return appList || {};
};

export const useApplicationsByScope: <P extends RootApplicationProps>(scope?: ApplicationScope) => ApplicationRegistry = <P>(scope = ApplicationScope.MULTIPLE) => {
    const { version } = useContext(ExtensionContext);
    const [applications, setApplications] = useState(getScopeApps(scope));

    useEffect(() => {
        setApplications(getScopeApps(scope));
    }, [version, scope]);

    return applications;
};
