import { SkinContextValue } from '../context';
import { useCallback, useState } from 'react';
import { getDefaultThemeId, setDefaultTheme } from '../utils';

export const useSkinContext: () => SkinContextValue = () => {
    const [defaultThemeId, setDefaultThemeId] = useState<string>(getDefaultThemeId())
    const setTheme = useCallback((themeId: string) => {
        setDefaultTheme(themeId);
        setDefaultThemeId(themeId);
    }, [setDefaultThemeId]);

    return {
        setTheme,
        defaultThemeId
    };
}
