import { useState, useEffect, useContext } from 'react';
import { SkinExtensionContext, SkinExtensionContextValue } from '../context';
import { getThemeList } from '../utils';
import { ThemeRegistryEntry } from '../API';

export const useThemeList: () => ThemeRegistryEntry[] = () => {
    const [themeIds, setThemeIds] = useState<ThemeRegistryEntry[]>([]);

    const { version } = useContext<SkinExtensionContextValue>(SkinExtensionContext);

    useEffect(() => {
        setThemeIds(getThemeList());
    }, [version]);

    return themeIds;
}
