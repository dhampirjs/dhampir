import { ROOT_APPLICATION_ID } from '../../../application';
import { Middleware, ReducersMapObject } from 'redux';

export interface StoreRegistry {
    [extensionId: string]: StoreRegistryEntry;
}

export interface StoreRegistryEntry {
    reducer: ReducersMapObject<any, any>,
    middleware?: Middleware[],
}

export const storeRegistry: StoreRegistry = {
    [ROOT_APPLICATION_ID]: {
        reducer: {},
        middleware: []
    },
}

