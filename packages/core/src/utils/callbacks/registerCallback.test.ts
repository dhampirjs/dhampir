import {registerCallback} from './registerCallback';
import {callbackRegistry, CallbackScope} from "../../callbacks";


describe('registerCallback function', () => {
    it('must add callback to the registry', () => {
        const callBackMock = jest.fn();

        registerCallback(CallbackScope.STORE, callBackMock);

        expect(callbackRegistry[CallbackScope.STORE].includes(callBackMock));
    })
});
