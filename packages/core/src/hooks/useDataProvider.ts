import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../extensions';
import { createStore } from '../utils';
import { ApplicationRootState } from '../storage';
import { Store } from 'redux';

export const useDataProvider = <T extends ApplicationRootState>(): Store<T, any> | undefined => {
    const [store, setStore] = useState<Store<T>>();
    const { version } = useContext(ExtensionContext);

    useEffect(() => {
        setStore(createStore<T>());
    }, [version, setStore])

    return store;
}
