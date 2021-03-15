import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../extensions/context';
import { getConnector, StorageType } from '../storage';

export interface StorageConnectorConfig<P = any> {
    Connector: React.FunctionComponent<P> | React.ComponentClass<P>;
    props?: P;
}

export const useStorageConnector = <P>(storageType: StorageType, props: P): StorageConnectorConfig | undefined  => {
    const [connector, setConnector] = useState<StorageConnectorConfig>(getConnector(storageType, props));
    const {
        version,
    } = useContext(ExtensionContext);

    useEffect(() => {
        setConnector(getConnector(storageType));
    }, [version]);

    return connector;
}
