import { useContext, useEffect, useState } from 'react';
import { RootApplicationProps, getRootApplication, ApplicationRegistryEntry, ROOT_APPLICATION_ID } from '../application';
import { ExtensionContext } from '../extensions';

export type RootApplicationHook = (props: RootApplicationProps) => ApplicationRegistryEntry<RootApplicationProps> | undefined;

export const useRootApplication: RootApplicationHook = ({ storageType }) => {
    const [application, setApplication] = useState<ApplicationRegistryEntry<RootApplicationProps>>();

    const { version } = useContext(ExtensionContext);

    useEffect(() => {
        setApplication(getRootApplication(ROOT_APPLICATION_ID));
    }, [version])

    return application;
}
