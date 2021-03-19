import { SkinContextValue } from '../context';
import { useCallback, useState } from 'react';
import { setDefaultTheme } from '../utils';
import { THEME_DEFAULT_ID } from '../API';

export const useSkinContext: () => SkinContextValue = () => {
    const [defaultThemeId, setDefaultThemeId] = useState<string>(THEME_DEFAULT_ID)
    const setTheme = useCallback((themeId: string) => {
        debugger;
        setDefaultTheme(themeId);
        setDefaultThemeId(themeId);
    }, [setDefaultThemeId]);

    return {
        setTheme,
        defaultThemeId
    };
}
