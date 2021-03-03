export const THEME_DEFAULT_ID = 'defaultTheme';

export interface ColorScopeMap {
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
    theme?: ColorScopeMap;
}

export type ThemeRegistryEntry  = Theme;

export interface Theme {
    title: string,
    default: boolean;
    colors: ColorScopeMap;
}
