import React from 'react';
import { THEME_DEFAULT_ID } from '../API';
export interface ThemeContextValue {
    themeId: string,
    setTheme?: (themeId: string) => void
}

export const ThemeContext = React.createContext<ThemeContextValue>({
    themeId: THEME_DEFAULT_ID,
});
