import {ApplicationRegistry, ApplicationRegistryEntry, ApplicationScope, ROOT_APPLICATION_ID} from './API';
import {RootApplication, RootApplicationProps} from './dom';

export const applicationRegistry: ApplicationRegistry = {
    [ROOT_APPLICATION_ID]: {
        Component: RootApplication,
        props: {
            storageType: 'query',
        },
        scope: ApplicationScope.STANDALONE,
        name: "Entry Point Application",
    }
};

export const getRootApplication = (id: string = ROOT_APPLICATION_ID) => {
    const application = applicationRegistry[id];

    if (!application) {
        throw Error(`No root application with ID: ${id}`);
    }

    return application;
}

export const registerRootApplication = <P extends RootApplicationProps>(id: string, entry: ApplicationRegistryEntry<P>): void => {
    const application = applicationRegistry[id];

    if (application) {
        throw Error(`Root application with ID "${id}" exists. Please choose another ID`);
    }

    applicationRegistry[id] = entry;
}
