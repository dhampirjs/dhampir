import { storeRegistry, StoreRegistryEntry } from '../../storage';

export const registerStore = (extensionId: string, entry: StoreRegistryEntry): void => {
    if (!extensionId) {
        throw Error(`Extension ID cannot be empty.`);
    }
    if (storeRegistry[extensionId]) {
        throw Error(`Extension ID ${extensionId} has already been used, please choose another one.`);
    }

    storeRegistry[extensionId] = entry;
};
