import { RootApplicationComponent, RootApplicationProps } from './dom';

export enum ApplicationScope {
    STANDALONE,
    MULTIPLE,
}

export type ApplicationRegistryEntry<P extends RootApplicationProps> = {
    Component: RootApplicationComponent<P>
    props: P;
    scope: ApplicationScope;
    name: string;
    brief?: string;
};

export type ApplicationRegistry = { [applicationId: string]: ApplicationRegistryEntry<any> };

export const ROOT_APPLICATION_ID = 'rootApplication';
