import { useState, useEffect, useContext } from 'react';
import { Theme, THEME_DEFAULT_ID } from '../API';
import { getThemeById } from '../utils';
import { SkinContext, SkinContextValue } from '../context';

export const useDefaultTheme: () => Theme = () => {
    const { defaultThemeId } = useContext<SkinContextValue>(SkinContext)

    const [theme, setTheme] = useState<Theme>(getThemeById(defaultThemeId));

    useEffect(() => {
        //TODO: move logic to utility function
        const currentTheme = getThemeById(defaultThemeId);
        const defaultTheme = getThemeById(THEME_DEFAULT_ID);

        // Falling back to general theme colors if some of the latter is missing
        currentTheme.colors = Object.assign({}, defaultTheme.colors, currentTheme.colors);
        setTheme(currentTheme);
    }, [defaultThemeId]);

    return theme;
}
