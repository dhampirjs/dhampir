import React, { FunctionComponent, useEffect, useState } from 'react';
import { RootApplicationProps } from './API';
import { useExtensionContext, useStorageConnector } from '../../../hooks';
import { RootArea } from '../../../routing';
import { ThemeProvider } from 'styled-components';
import { useDefaultTheme } from '../../../appearance/hooks/useDefaultTheme';

export const RootApplication: FunctionComponent<RootApplicationProps> = ({ storageType }) => {
    const {
        Connector,
        props,
    } = useStorageConnector(storageType!, {})!;
    const defaultTheme = useDefaultTheme();
    const {
        context,
        Provider: ExtensionProvider,
    } = useExtensionContext();


    return <ExtensionProvider value={context}>
        <ThemeProvider theme={defaultTheme.colors}>
            <Connector {...props}>
                <RootArea/>
            </Connector>
        </ThemeProvider>
    </ExtensionProvider>
};
