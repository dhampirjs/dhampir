import { storeRegistry, StoreRegistryEntry } from '../../store';

export const registerStore = (extensionId: string, entry: StoreRegistryEntry) => {
    if (!extensionId) {
        throw Error(`Extension ID cannot be empty.`);
    }
    if (storeRegistry.hasOwnProperty(extensionId)) {
        throw Error(`Extension ID ${extensionId} has already been used, please choose another one.`);
    }

    storeRegistry[extensionId] = entry;
};
