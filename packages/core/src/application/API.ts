import { FunctionComponent, ComponentClass } from 'react';
import { RootApplicationProps } from './dom';

export enum ApplicationScope {
    STANDALONE,
    MULTIPLE,
}
export type ApplicationRegistryEntry<P extends RootApplicationProps> = {
    Component: FunctionComponent<P> | ComponentClass<P>;
    props: P;
    scope: ApplicationScope;
    name: string;
    brief?: string;
};

export type ApplicationRegistry<P extends RootApplicationProps> = { [applicationId: string]: ApplicationRegistryEntry<P> };

export const ROOT_APPLICATION_ID = 'rootApplication';
