import { history } from '../../../routing';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { ROOT_APPLICATION_ID } from '../../../application';
import { Middleware, Reducer, ReducersMapObject } from 'redux';

export interface StoreRegistry {
    [extensionId: string]: StoreRegistryEntry;
}

export interface StoreRegistryEntry {
    reducer: ReducersMapObject<any, any>,
    middleware?: Middleware[],
}

export const storeRegistry: StoreRegistry = {
    [ROOT_APPLICATION_ID]: {
        reducer: {
            router: connectRouter(history) as Reducer,
        },
        middleware: [routerMiddleware(history)]
    },
}

