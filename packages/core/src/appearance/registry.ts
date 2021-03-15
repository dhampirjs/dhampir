import { colors } from './themes/default';
import { THEME_DEFAULT_ID, ThemeRegistry } from './API';

export const registry: ThemeRegistry = {
    default: THEME_DEFAULT_ID,
    themes: {
        [THEME_DEFAULT_ID]: {
            title: 'Default',
            default: true,
            colors
        }
    }
};
