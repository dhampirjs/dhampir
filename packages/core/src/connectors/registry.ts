import { StorageConnectorConfig } from '../hooks/useStorageConnector';
import { StorageType } from '../connectors/API';
import { ReduxConnector } from '../connectors/dom/ReduxConnector';
import { ReactQueryConnector } from '../connectors/dom/ReactQueryConnector';
export type ConnectorsRegistry = {
    [connectorId: string]: StorageConnectorConfig
};

export const connectorsRegistry: ConnectorsRegistry = {
    [StorageType.REDUX]: {
        Connector: ReduxConnector,
        props: {},
    },
    [StorageType.QUERY]: {
        Connector: ReactQueryConnector,
        props: {},
    },
};

export const registerConnector = <P, S extends string>(type: S, connector: StorageConnectorConfig<P>): void => {
    const exists = connectorsRegistry[type];

    if (exists) {
        console.warn(`Storage connector with type ${type} already exist. Skipping registration.`);
    } else {
        connectorsRegistry[type] = connector
    }
};

export const getConnector = <P, S extends string>(type: StorageType = StorageType.REDUX, props?: P): StorageConnectorConfig<P> => {
    const connector = connectorsRegistry[type];

    if (!connector) {
        throw Error(`No such connector. You have to register storage connector.`);
    }

    if (props) {
        connector.props = {...connector.props, ...props};
    }

    return connector;
};
