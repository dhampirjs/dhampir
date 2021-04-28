import { colors as colorsDefault } from './themes/default';
import { colors as colorsCustom } from './themes/custom';
import { THEME_DEFAULT_ID, ThemeRegistry } from './API';
import { faBicycle } from '@fortawesome/free-solid-svg-icons/faBicycle';
import { faAtom } from '@fortawesome/free-solid-svg-icons/faAtom';

export const registry: ThemeRegistry = {
    defaultTheme: THEME_DEFAULT_ID,
    themes: {
        [THEME_DEFAULT_ID]: {
            id: THEME_DEFAULT_ID,
            title: 'Default',
            default: false,
            colors: colorsDefault,
            icon: faBicycle
        },
        ['customTheme']: {
            id: 'customTheme',
            title: 'Custom',
            default: false,
            colors: colorsCustom,
            icon: faAtom

        }

    }
};

