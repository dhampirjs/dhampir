import {FunctionComponent, PropsWithChildren} from 'react';
import { useSkinContext } from '../../hooks';
import { ThemeProvider } from 'styled-components';
import { SkinContext } from '../../context';

export const SkinConnector: FunctionComponent<PropsWithChildren<unknown>> = ({ children }) => {
    const {
        Provider: ThemeProvider,
    } = SkinContext;

    const skinContext = useSkinContext();

    return <ThemeProvider value={skinContext}>
        {children}
    </ThemeProvider>;
};
