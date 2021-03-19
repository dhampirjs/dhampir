import { createContext } from 'react';

export interface ExtensionContextValue {
    version: number;
    incrementVersion?: () => void;
}

export const ExtensionContext = createContext<ExtensionContextValue>({
    version: 1,
});
