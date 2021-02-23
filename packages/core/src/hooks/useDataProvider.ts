import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../context';
import { createStore } from '../utils';
import { ApplicationRootState } from '../store';
import { Store } from 'redux';

export const useDataProvider = <T extends ApplicationRootState>() => {
    const [store, setStore] = useState<Store<ApplicationRootState>>();
    const { version } = useContext(ExtensionContext);

    useEffect(() => {
        setStore(createStore<T>());
    }, [version, setStore])

    return store;
}