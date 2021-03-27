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
    POWDER_BLUE,
    MIDDLE_BLUE,
    GRAY,
    LIGHT_GRAY,
    RED_MUNSELL,
    CG_BLUE,
    INDIGO_DYE,
    MANTIS,
    BRIGHT_YELLOW_CRYOLA,
    BABY_POWDER,
    PRUSSIAN_BLUE,
    TEA_GREEN,
    GUN_METAL,
    FOGRA_29
} = PALETTE;

export const colors: ColorScheme = {
    [ColorScope.APPLICATION]: {
        [ColorScopeApplication.BG]: LIGHT_GRAY,
        [ColorScopeApplication.FG]: FOGRA_29,
    },
    [ColorScope.TYPOGRAPHY]: {
        [ColorScopeTypography.TEXT_REGULAR]: GRAY,
        [ColorScopeTypography.TEXT_DARK]: BABY_POWDER,
        [ColorScopeTypography.LINK]: POWDER_BLUE,
        [ColorScopeTypography.LINK_HOVER]: PRUSSIAN_BLUE,
        [ColorScopeTypography.HEADING]: PRUSSIAN_BLUE,
    },
    [ColorScope.CONTAINER]: {
        [ColorScopeContainer.BORDER]: TEA_GREEN,
        [ColorScopeContainer.BG]: GUN_METAL,
        [ColorScopeContainer.FG]: INDIGO_DYE,
    },
    [ColorScope.ACTIONS]: {
        [ColorScopeActions.ACTION]: MANTIS,
        [ColorScopeActions.DANGER]: RED_MUNSELL,
        [ColorScopeActions.COMMON]: MIDDLE_BLUE,
    },
    [ColorScope.MESSAGES]: {
        [ColorScopeMessages.WARNING_BG]: BRIGHT_YELLOW_CRYOLA,
        [ColorScopeMessages.INFO_BG]: CG_BLUE,
        [ColorScopeMessages.ERROR_BG]: RED_MUNSELL,
        [ColorScopeMessages.SUCCESS_BG]: MANTIS,
    },
}
