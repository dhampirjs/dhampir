import { createContext } from 'react';
import { THEME_DEFAULT_ID } from '../API';

export interface SkinContextValue {
    defaultThemeId: string,
    setTheme?: (themeId: string) => void
}

export const SkinContext = createContext<SkinContextValue>({
    defaultThemeId: THEME_DEFAULT_ID,
});
