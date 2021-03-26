import React, { FunctionComponent } from 'react';
import { useStorageConnector } from '../../../hooks';
import { StorageType } from '../../../storage';

export const StorageConnector: FunctionComponent<{ storageType: StorageType }> = (
    {
        storageType,
        children
    }
) => {
    const {
        Connector,
        props,
    } = useStorageConnector(storageType, {});

    return <Connector {...props}>
        {children}
    </Connector>;
}
