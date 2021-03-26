import { createReducer } from './createReducer';
import { storeRegistry } from '../../storage/redux/store';
import { createMiddleware } from './createMiddleware';
import { configureStore } from './configureStore';
import { runCallbackScope } from '../callbacks';
import { CallbackScope } from '../../callbacks';
import { Store } from 'redux';

export const createStore = <S>(): Store<S> => {
    const rootReducer = createReducer(storeRegistry)

    const middleware = createMiddleware(storeRegistry)
    const store = configureStore<S>(rootReducer, middleware)

    runCallbackScope(CallbackScope.STORE);

    return store;
}
