import * as React from 'react';
import {PropsWithChildren, useContext, useEffect, useState} from 'react';
import { ExtensionContext } from '../extensions';
import { getConnector, StorageType } from '../storage';
import { RootApplicationProps } from '../application';

export interface StorageConnectorConfig<P extends RootApplicationProps> {
    Connector: React.FunctionComponent<PropsWithChildren<P>> | React.ComponentClass<PropsWithChildren<P>>;
    props?: P;
}

export const useStorageConnector = <P>(storageType: StorageType, props: P): StorageConnectorConfig<P>  => {
    const [connector, setConnector] = useState<StorageConnectorConfig<P>>(getConnector<P>(storageType, props));
    const {
        version,
    } = useContext(ExtensionContext);

    useEffect(() => {
        setConnector(getConnector(storageType));
    }, [version]);

    return connector;
}
