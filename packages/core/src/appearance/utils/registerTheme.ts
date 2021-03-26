import { ThemeRegistryEntry } from '../API';
import { registry } from '../registry';

export const registerTheme =  (theme: ThemeRegistryEntry, asDefault = false): void => {
    const existing = registry.themes[theme.id]

    if (existing) {
        // TODO: log message as a toast message, when registering theme on the fly
        throw new Error(`Theme with such id ${theme.id} has already been registered. Please choose another id.`)
    }

    registry.themes[theme.id] = theme;
    if (asDefault) {
        registry.defaultTheme = theme.id
    }
}
