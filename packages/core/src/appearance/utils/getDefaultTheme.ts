import { Theme } from '../API';
import { registry } from '../registry';

export const getDefaultTheme: () => Theme = () => {
    const defaultId = registry.defaultTheme;

    const theme = registry.themes[defaultId];

    if(!theme) {
        throw Error(`There is no theme with id '${defaultId}'! Please register it.`);
    }

    return theme;
};
