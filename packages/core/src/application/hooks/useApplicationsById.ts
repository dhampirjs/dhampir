import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../../extensions';
import { ApplicationRegistryEntry } from '../API';
import { applicationRegistry } from '../applicationRegistry';

export const useApplicationsById: <P>(id?: string) => ApplicationRegistryEntry<P> | undefined = <P>(id) => {
    const { version } = useContext(ExtensionContext);
    const [application, setApplication] = useState<ApplicationRegistryEntry<P>>();

    useEffect(() => {
        if(id) {
            setApplication(applicationRegistry[id]);
        }
    }, [version, id]);

    return application;
};
