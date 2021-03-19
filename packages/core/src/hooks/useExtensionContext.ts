import { ExtensionContextValue } from '../extensions/context';
import { useCallback, useState } from 'react';


export const useExtensionContext: () => ExtensionContextValue = () => {
    const [version, setVersion] = useState(0);

    const increaseVersion = useCallback(() => {
        setVersion(version + 1);
    }, [setVersion]);

    return {
        version,
        setVersion: increaseVersion,
    };
}
