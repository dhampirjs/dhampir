import { useState, useEffect, useContext } from 'react';
import { SkinExtensionContext, SkinExtensionContextValue } from '../context';
import { getThemeIdList } from '../utils';

export const useThemeIdList: () => string[] = () => {
    const [themeIds, setThemeIds] = useState<string[]>([]);

    const { version } = useContext<SkinExtensionContextValue>(SkinExtensionContext);

    useEffect(() => {
        setThemeIds(getThemeIdList());
    }, [version]);

    return themeIds;
}
