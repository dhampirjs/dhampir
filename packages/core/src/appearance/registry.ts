import { colors as colorsDefault } from './themes/default';
import { colors as colorsCustom } from './themes/custom';
import { THEME_DEFAULT_ID, ThemeRegistry } from './API';

export const registry: ThemeRegistry = {
    default: THEME_DEFAULT_ID,
    themes: {
        [THEME_DEFAULT_ID]: {
            title: 'Default',
            default: true,
            colors: colorsDefault
        },
        ['custom']: {
            title: 'Custom',
            default: true,
            colors: colorsCustom
        }

    }
};
