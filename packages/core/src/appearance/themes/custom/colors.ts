import { PALETTE } from './palette';

import {
    ColorScheme,
    ColorScope,
    ColorScopeActions,
    ColorScopeApplication,
    ColorScopeContainer, ColorScopeMessages,
    ColorScopeTypography
} from '../../API';

const {
    GRAY, LIGHT_GRAY, RED_MUNSELL, CG_BLUE, INDIGO_DYE, MANTIS, BRIGHT_YELLOW_CRYOLA, BABY_POWDER, COBALT_BLUE, PRUSSIAN_BLUE, TEA_GREEN, GUN_METAL
} = PALETTE;

export const colors: ColorScheme = {
    [ColorScope.APPLICATION]: {
        [ColorScopeApplication.BG_REGULAR]: LIGHT_GRAY,
    },
    [ColorScope.TYPOGRAPHY]: {
        [ColorScopeTypography.TEXT_REGULAR]: GRAY,
        [ColorScopeTypography.TEXT_CONTRAST]: BABY_POWDER,
        [ColorScopeTypography.LINK]: CG_BLUE,
        [ColorScopeTypography.LINK_HOVER]: COBALT_BLUE,
        [ColorScopeTypography.HEADING]: PRUSSIAN_BLUE,
    },
    [ColorScope.CONTAINER]: {
        [ColorScopeContainer.BORDER]: TEA_GREEN,
        [ColorScopeContainer.FILL_REGULAR]: GUN_METAL,
        [ColorScopeContainer.FILL_CONTRAST]: INDIGO_DYE,
    },
    [ColorScope.ACTIONS]: {
        [ColorScopeActions.ACTION]: MANTIS,
        [ColorScopeActions.DANGER]: RED_MUNSELL,
        [ColorScopeActions.COMMON]: CG_BLUE,
    },
    [ColorScope.MESSAGES]: {
        [ColorScopeMessages.WARNING]: BRIGHT_YELLOW_CRYOLA,
        [ColorScopeMessages.INFO]: CG_BLUE,
        [ColorScopeMessages.ERROR]: RED_MUNSELL,
        [ColorScopeMessages.SUCCESS]: MANTIS,
    },
}
