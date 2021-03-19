import React from 'react';
import { THEME_DEFAULT_ID } from '../API';

export interface SkinContextValue {
    defaultThemeId: string,
    setTheme?: (themeId: string) => void
}

export const SkinContext = React.createContext<SkinContextValue>({
    defaultThemeId: THEME_DEFAULT_ID,
});
