import React from 'react';
export interface ThemeExtensionContextValue {
    changeCount?: number,
}

export const ThemeExtensionContext = React.createContext<ThemeExtensionContextValue>({
    changeCount: 0,
});
