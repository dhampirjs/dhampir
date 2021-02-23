import { createReducer } from './createReducer';
import { storeRegistry } from '../../store';
import { createMiddleware } from './createMiddleware';
import { configureStore } from './configureStore';
import { runCallbackScope } from '../callbacks';
import { CallbackScope } from '../../callbacks';

export const createStore = <S>() => {
    const rootReducer = createReducer(storeRegistry)

    const middleware = createMiddleware(storeRegistry)
    const store = configureStore<S>(rootReducer, middleware)

    runCallbackScope(CallbackScope.STORE);

    return store;
}
