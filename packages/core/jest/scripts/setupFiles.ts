// Mocks
import { LocalStorage } from './mocks/localStorage';
import { fetch } from './mocks/fetch';

const successMessage = 'Mocked success message.';
const errorMessage = 'Mocked fail message.';
const error = new Error(errorMessage);

const responseDataSuccess = {
    message: successMessage,
};

const responseDataFail = {
    message: errorMessage,
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseFail = {
    status: 401,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

global['fetch'] = fetch as any;
global['__'] = {
            errorMessage,
            error,
            responseDataSuccess,
            responseDataFail,
            fetchResponseSuccess,
            fetchResponseFail,
    };
global['localStorage'] = new LocalStorage() as any;
