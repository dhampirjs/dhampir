import { useContext, useEffect, useState } from 'react';
import { getRootApplication, } from '../application/applicationRegistry';
import { ApplicationRegistryEntry, ROOT_APPLICATION_ID } from '../application/API';
import { RootApplicationProps } from '../application/dom/RootApplication';
import { ExtensionContext } from '../extensions/context/ExtensionContext';

export type RootApplicationHook = (props: RootApplicationProps) => ApplicationRegistryEntry<RootApplicationProps> | undefined;

export const useRootApplication: RootApplicationHook = ({ storageType }) => {
    const [application, setApplication] = useState<ApplicationRegistryEntry<RootApplicationProps>>();

    const { version } = useContext(ExtensionContext);

    useEffect(() => {
        setApplication(getRootApplication<RootApplicationProps>(ROOT_APPLICATION_ID));
    }, [version])

    return application;
}
