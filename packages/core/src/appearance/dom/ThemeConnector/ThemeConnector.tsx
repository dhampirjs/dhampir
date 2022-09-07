import {FunctionComponent, PropsWithChildren} from 'react';
import {useDefaultTheme} from '../../hooks';
import {ThemeProvider as ThemeProviderBase} from 'styled-components';

// TODO: remove this when styled-components fix the typings. Right now
const CastedTeamProvider = ThemeProviderBase as any;

export const ThemeConnector: FunctionComponent<PropsWithChildren> = ({children}) => {

    const defaultTheme = useDefaultTheme();

    return <CastedTeamProvider theme={defaultTheme}>
        {children}
    </CastedTeamProvider>;
}
