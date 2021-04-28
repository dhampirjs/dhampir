import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const THEME_DEFAULT_ID = 'defaultTheme';

export type ColorScheme = {
    [key in ColorScope]: ColorMap;
}

export type ColorMap = {
    [key in ColorScopes]: string;
}

export interface ThemeRegistry {
    defaultTheme: string;
    themes: {
        [themeName: string]: ThemeRegistryEntry
    };
}

export interface PresentationComponentProps {
    theme?: Theme;
}

export type ThemeRegistryEntry = Theme;

export interface Theme {
    id: string,
    title: string,
    default: boolean;
    colors: ColorScheme;
    icon?: IconProp;
}

export enum ColorScope {
    APPLICATION = 'application',
    TYPOGRAPHY = 'typography',
    CONTAINER = 'container',
    ACTIONS = 'actions',
    MESSAGES = 'messages',
}

export enum ColorScopeApplication {
    BG = 'bg',
    FG = 'fg',
}

export enum ColorScopeTypography {
    LINK = 'link',
    LINK_HOVER = 'link_hover',
    TEXT_REGULAR = 'text_regular',
    TEXT_DARK = 'text_dark',
    HEADING = 'heading',
    ACCENT = 'accent',
}

export enum ColorScopeContainer {
    BORDER = 'border',
    BG = 'bg',
    FG = 'fg',
}

export enum ColorScopeActions {
    DANGER = 'danger',
    DANGER_HOVERED = 'danger_hovered',
    DANGER_DISABLED = 'danger_disabled',
    ACTION = 'action',
    ACTION_HOVERED = 'action_hovered',
    ACTION_DISABLED = 'action_disabled',
    COMMON = 'common',
    COMMON_HOVERED = 'common_hovered',
    COMMON_DISABLED = 'common_disabled',
}

export enum ColorScopeMessages {
    INFO_BG = 'info_bg',
    INFO_FG = 'info_fg',
    INFO_BORDER = 'info_border',
    WARNING_BG = 'warning_bg',
    WARNING_FG = 'warning_fg',
    WARNING_BORDER = 'warning_border',
    ERROR_BG = 'error_bg',
    ERROR_FG = 'error_fg',
    ERROR_BORDER = 'error_border',
    SUCCESS_BG = 'success_bg',
    SUCCESS_FG = 'success_fg',
    SUCCESS_BORDER = 'success_border',
}

export type ColorScopes =
    ColorScopeApplication
    & ColorScopeTypography
    & ColorScopeContainer
    & ColorScopeActions
    & ColorScopeMessages;
