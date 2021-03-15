import { useState, useEffect, useMemo, useContext } from 'react';
import { Theme, THEME_DEFAULT_ID } from '../API';
import { ThemeExtensionContext, ThemeExtensionContextValue } from '../context';
import { getThemeById } from '../utils/getThemeById';
import { getDefaultTheme } from '../utils/getDefaultTheme';

export const useDefaultTheme: () => Theme = () => {
    const [theme, setTheme] = useState<Theme>(getDefaultTheme());

    const { changeCount } = useContext<ThemeExtensionContextValue>(ThemeExtensionContext);

    useEffect(() => {
        const themeFromRegistry = getDefaultTheme();

        const defaultTheme = getThemeById(THEME_DEFAULT_ID);
        // Falling back to general theme colors if some of the latter is missing
        themeFromRegistry.colors = Object.assign({}, defaultTheme.colors, theme.colors);
        setTheme(themeFromRegistry);
    }, [changeCount]);

    return theme;
}
