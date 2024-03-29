import { registry } from '../registry';

export const setDefaultTheme: (themeId: string) => void = (themeId) => {
    return registry.defaultTheme = themeId;
};
