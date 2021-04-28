import { FunctionComponent } from 'react';
import { useDefaultTheme } from '../../hooks';
import { ThemeProvider } from 'styled-components';

export const ThemeConnector: FunctionComponent = ({ children }) => {

    const defaultTheme = useDefaultTheme();

    return <ThemeProvider theme={defaultTheme}>
            {children}
        </ThemeProvider>;
}
