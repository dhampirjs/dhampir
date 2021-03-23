import { registry } from '../registry';
import { ThemeRegistryEntry } from '../API';

export const getThemeList: () => ThemeRegistryEntry[] = () => {
    return [...Object.values(registry.themes)];
};
