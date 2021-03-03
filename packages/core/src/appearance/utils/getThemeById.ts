import { Theme } from '../API';
import { registry } from '../registry';

export const getThemeById: (themeId: string) => Theme = (themeId: string) => {
    const theme = registry.themes[themeId];

    if(!theme) {
        console.warn(`There is no color theme with id '${themeId}'`)
    }

    return theme;
};
