import React, { FunctionComponent } from 'react';
import { RootApplicationProps } from './API';
import { useExtensionContext, useStorageConnector } from '../../../hooks';
import { RootArea } from '../../../routing';

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
