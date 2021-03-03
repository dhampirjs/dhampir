import { PALETTE } from './palette';
import { ColorScopeMap } from '../../API';

export enum ColorScope {
    TYPOGRAPHY = 'typography',
    CONTAINER = 'container',
    ACTIONS = 'actions',
    MESSAGES = 'messages',
}

export enum ColorScopeTypography {
    LINK = 'link',
    LINK_HOVER = 'link_hover',
    TEXT = 'text',
}

export enum ColorScopeContainer {
    BORDER = 'border',
    FILL = 'fill',
}

export enum ColorScopeActions {
    DANGER = 'danger',
    ACTION = 'action',
    COMMON = 'common',
}

export enum ColorScopeMessages {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
    SUCCESS = 'success',
}

const {
    GRAY, LIGHT_GRAY, AIR_BLUE, RED_MUNSELL, CG_BLUE, INDIGO_DYE, MANTIS, BRIGHT_YELLOW_CRYOLA, TYRIAN_PURPLE
} = PALETTE;
export const colors: ColorScopeMap = {
    [ColorScope.TYPOGRAPHY]: {
        [ColorScopeTypography.TEXT]: GRAY,
        [ColorScopeTypography.LINK]: AIR_BLUE,
        [ColorScopeTypography.LINK_HOVER]: INDIGO_DYE,
    },
    [ColorScope.CONTAINER]: {
        [ColorScopeContainer.BORDER]: LIGHT_GRAY,
        [ColorScopeContainer.FILL]: TYRIAN_PURPLE,
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
