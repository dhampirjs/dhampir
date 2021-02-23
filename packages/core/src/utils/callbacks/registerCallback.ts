import { callbackRegistry, CallbackScope, ScopeCallback } from '../../callbacks';

export const registerCallback = (scope: CallbackScope, cb: ScopeCallback) => {
    const callbacks = callbackRegistry[scope] || [];

    callbackRegistry[scope] = [...callbacks, cb];
};
