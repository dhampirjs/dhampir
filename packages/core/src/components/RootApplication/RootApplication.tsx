import React, { FunctionComponent } from 'react';
import { RootApplicationProps } from './API';
import { useStorageConnector } from '../../hooks/useStorageConnector';
import { useExtensionContext } from '../../hooks/useExtensionContext';
import { RootArea } from '../../routing/dom';

export const RootApplication: FunctionComponent<RootApplicationProps> = ({ storageType }) => {
    const {
        Connector,
        props,
    } = useStorageConnector(storageType!, {})!;

    const {
        context,
        Provider: ExtensionProvider,
    } = useExtensionContext();

    return <ExtensionProvider value={context}>
        <Connector {...props}>
            <RootArea/>
        </Connector>
    </ExtensionProvider>
};
