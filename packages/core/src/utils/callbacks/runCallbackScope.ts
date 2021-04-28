import { compose } from 'redux';
import { callbackRegistry, CallbackScope } from '../../callbacks';

export const runCallbackScope = (scope: CallbackScope): void => {
    const S = callbackRegistry[scope];

    if (S && S.length > 0) {
        const sequence = compose(...S);
        sequence();
    }
}
