import { applyMiddleware, createStore, Middleware, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore<T>(reducer: Reducer<T>, middleware: Middleware[]): Store<T> {
    return createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
}
