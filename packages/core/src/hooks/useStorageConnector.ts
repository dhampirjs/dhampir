import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../extensions';
import { getConnector, StorageType } from '../storage';

export interface StorageConnectorConfig<P> {
    Connector: (props: PropsWithChildren<P>) => JSX.Element | null;
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
