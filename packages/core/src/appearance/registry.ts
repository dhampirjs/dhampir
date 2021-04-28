import { colors as colorsDefault } from './themes/default';
import { colors as colorsCustom } from './themes/custom';
import { THEME_DEFAULT_ID, ThemeRegistry } from './API';

export const registry: ThemeRegistry = {
    defaultTheme: THEME_DEFAULT_ID,
    themes: {
        [THEME_DEFAULT_ID]: {
            id: THEME_DEFAULT_ID,
            title: 'Default',
            default: false,
            colors: colorsDefault
        },
        ['customTheme']: {
            id: 'customTheme',
            title: 'Custom',
            default: false,
            colors: colorsCustom
        }

    }
};

