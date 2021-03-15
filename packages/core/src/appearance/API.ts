export const THEME_DEFAULT_ID = 'defaultTheme';

export interface ColorScheme {
    [colorScope: string]: ColorMap;
}

export interface ColorMap {
    [colorId: string]: string;
}

export interface ThemeRegistry {
    default: string;
    themes: {
        [themeName: string]: ThemeRegistryEntry
    };
}

export interface PresentationComponentProps {
    theme?: Theme;
}

export type ThemeRegistryEntry = Theme;

export interface Theme {
    title: string,
    default: boolean;
    colors: ColorScheme;
}

export enum ColorScope {
    APPLICATION = 'application',
    TYPOGRAPHY = 'typography',
    CONTAINER = 'container',
    ACTIONS = 'actions',
    MESSAGES = 'messages',
}

export enum ColorScopeApplication {
    BG_REGULAR = 'bg_regular',
    BG_CONTRAST = 'bg_contrast',
}
export enum ColorScopeTypography {
    LINK = 'link',
    LINK_HOVER = 'link_hover',
    TEXT_REGULAR = 'text_regular',
    TEXT_CONTRAST = 'text_contrast',
    HEADING = 'heading',
}

export enum ColorScopeContainer {
    BORDER = 'border',
    FILL_REGULAR = 'fill_regular',
    FILL_CONTRAST = 'fill_contrast',
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
