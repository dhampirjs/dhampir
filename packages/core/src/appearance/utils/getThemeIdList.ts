import { registry } from '../registry';

export const getThemeIdList: () => string[] = () => {
    return [...Object.keys(registry.themes)];
};
