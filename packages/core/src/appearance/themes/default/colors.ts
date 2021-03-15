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
    GRAY, LIGHT_GRAY, AIR_BLUE, RED_MUNSELL, CG_BLUE, INDIGO_DYE, MANTIS, BRIGHT_YELLOW_CRYOLA, BABY_POWDER
} = PALETTE;

export const colors: ColorScheme = {
    [ColorScope.APPLICATION]: {
        [ColorScopeApplication.BG_REGULAR]: BABY_POWDER,
    },
    [ColorScope.TYPOGRAPHY]: {
        [ColorScopeTypography.TEXT_REGULAR]: BABY_POWDER,
        [ColorScopeTypography.TEXT_CONTRAST]: GRAY,
        [ColorScopeTypography.LINK]: AIR_BLUE,
        [ColorScopeTypography.LINK_HOVER]: INDIGO_DYE,
        [ColorScopeTypography.HEADING]: INDIGO_DYE,
    },
    [ColorScope.CONTAINER]: {
        [ColorScopeContainer.BORDER]: GRAY,
        [ColorScopeContainer.FILL_REGULAR]: LIGHT_GRAY,
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
