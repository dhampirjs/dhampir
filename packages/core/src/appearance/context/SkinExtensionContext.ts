import React from 'react';
export interface SkinExtensionContextValue {
    version: number,
}

export const SkinExtensionContext = React.createContext<SkinExtensionContextValue>({
    version: 0,
});
