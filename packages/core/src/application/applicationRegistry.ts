import { ApplicationRegistry, ApplicationRegistryEntry, ApplicationScope, ROOT_APPLICATION_ID } from './API';
import { RootApplication, RootApplicationProps } from './dom';
import { StorageType } from '../storage';

export const applicationRegistry: ApplicationRegistry<any> = {};

export const getRootApplication = <P extends RootApplicationProps>(id: string = ROOT_APPLICATION_ID): ApplicationRegistryEntry<P> => {
    const application = applicationRegistry[id];

    if (!application) {
        throw Error(`No root application with ID: ${id}`);
    }

    return application as ApplicationRegistryEntry<P>;
}

export const registerRootApplication = <P>(id: string, entry: ApplicationRegistryEntry<P>): void => {
    const application = applicationRegistry[id];

    if (application) {
        throw Error(`Root application with ID "${id}" exists. Please choose another ID`);
    }

    applicationRegistry[id] = entry;
}

registerRootApplication(ROOT_APPLICATION_ID, {
    Component: RootApplication,
    props: {
        storageType: StorageType.REDUX
    },
    scope: ApplicationScope.STANDALONE,
    name: "Entry Point Application"
})
