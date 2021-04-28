import { registry } from '../registry';

export const getDefaultThemeId: () => string = () => {
    return registry.defaultTheme;
};
