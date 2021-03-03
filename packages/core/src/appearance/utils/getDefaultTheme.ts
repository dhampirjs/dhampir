import { Theme, THEME_DEFAULT_ID } from '../API';
import { registry } from '../registry';

export const getDefaultTheme: () => Theme = () => {
    const defaultId = registry.default;

    const theme = registry.themes[defaultId] || registry[THEME_DEFAULT_ID];

    if(!theme) {
        throw Error('No default theme! Please register at least one theme');
    }

    return theme;
};
