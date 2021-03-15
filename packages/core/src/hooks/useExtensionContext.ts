import { ExtensionContext, ExtensionContextType } from '../extensions/context';
import { useCallback, useState, Provider, useContext } from 'react';

export type ExtensionContextData = () => {
    Provider: Provider<ExtensionContextType>,
    context: ExtensionContextType,
}

export const useExtensionContext: ExtensionContextData = () => {
    const { version: currentVersion } = useContext(ExtensionContext);
    const [version, setVersion] = useState(currentVersion);

    const increaseVersion = useCallback(() => {
        setVersion(version + 1);
    }, [])
    return {
        Provider: ExtensionContext.Provider,
        context: {
            version,
            setVersion: increaseVersion,
        }

    };
}
