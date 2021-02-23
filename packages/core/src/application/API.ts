import React from 'react';
import { RootApplicationProps } from '../components';

export enum ApplicationScope {
    STANDALONE,
    MULTIPLE,
}
export type ApplicationRegistryEntry<P extends RootApplicationProps> = {
    Component: React.FunctionComponent<P> | React.ComponentClass<P>;
    props: P;
    scope: ApplicationScope;
    name: string;
    brief?: string;
};

export type ApplicationRegistry<P extends RootApplicationProps> = { [applicationId: string]: ApplicationRegistryEntry<P> };

export const ROOT_APPLICATION_ID = 'rootApplication';
