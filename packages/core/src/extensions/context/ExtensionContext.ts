import { createContext } from 'react';

export interface ExtensionContextType {
    version: number;
    incrementVersion?: () => void;
}

export const ExtensionContext = createContext<ExtensionContextType>({
    version: 1,
});
