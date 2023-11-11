import { StorageConnectorConfig } from '../hooks';
import { StorageType } from './API';
import { ReduxConnector } from './redux';
import { ReactQueryConnector } from './react-query';
import {RootApplicationProps} from "../application";
export type ConnectorsRegistry<P extends RootApplicationProps> = {
    [connectorId: string]: StorageConnectorConfig<P>
};

export const connectorsRegistry: ConnectorsRegistry<any> = {
    redux: {
        Connector: ReduxConnector,
        props: {},
    },
    query: {
        Connector: ReactQueryConnector,
        props: {},
    },
};

export const registerConnector = <P extends RootApplicationProps, S extends string>(type: S, connector: StorageConnectorConfig<P>): void => {
    const exists = !!connectorsRegistry[type];

    if (exists) {
        console.warn(`Storage connector with type ${type} already exist. Skipping registration.`);
    } else {
        connectorsRegistry[type] = connector
    }
};

export const getConnector = <P>(type: StorageType = 'query', props?: P): StorageConnectorConfig<P> => {
    const connector = connectorsRegistry[type];

    if (!connector) {
        throw Error(`No such connector. You have to register storage connector.`);
    }

    if (props) {
        connector.props = {...connector.props, ...props};
    }

    return connector;
};
