import { createContext } from 'react';
export interface SkinExtensionContextValue {
    version: number,
}

export const SkinExtensionContext = createContext<SkinExtensionContextValue>({
    version: 0,
});
