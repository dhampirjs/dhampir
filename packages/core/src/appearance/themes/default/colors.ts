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
    GRAY,
    LIGHT_GRAY,
    AIR_BLUE,
    RED_MUNSELL,
    CG_BLUE,
    INDIGO_DYE,
    MANTIS,
    BRIGHT_YELLOW_CRYOLA,
    BABY_POWDER,
} = PALETTE;

export const colors: ColorScheme = {
    [ColorScope.APPLICATION]: {
        [ColorScopeApplication.BG]: BABY_POWDER,
        [ColorScopeApplication.FG]: BABY_POWDER,
    },
    [ColorScope.TYPOGRAPHY]: {
        [ColorScopeTypography.TEXT_REGULAR]: BABY_POWDER,
        [ColorScopeTypography.TEXT_DARK]: GRAY,
        [ColorScopeTypography.LINK]: AIR_BLUE,
        [ColorScopeTypography.LINK_HOVER]: INDIGO_DYE,
        [ColorScopeTypography.HEADING]: INDIGO_DYE,
    },
    [ColorScope.CONTAINER]: {
        [ColorScopeContainer.BORDER]: GRAY,
        [ColorScopeContainer.BG]: LIGHT_GRAY,
        [ColorScopeContainer.FG]: LIGHT_GRAY,
    },
    [ColorScope.ACTIONS]: {
        [ColorScopeActions.ACTION]: MANTIS,
        [ColorScopeActions.DANGER]: RED_MUNSELL,
        [ColorScopeActions.COMMON]: CG_BLUE,
    },
    [ColorScope.MESSAGES]: {
        [ColorScopeMessages.WARNING_BG]: BRIGHT_YELLOW_CRYOLA,
        [ColorScopeMessages.INFO_BG]: CG_BLUE,
        [ColorScopeMessages.ERROR_BG]: RED_MUNSELL,
        [ColorScopeMessages.SUCCESS_BG]: MANTIS,
    },
}
