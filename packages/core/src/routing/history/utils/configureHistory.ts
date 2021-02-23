import { createBrowserHistory, History } from 'history';

export function configureHistory(): History {
    return createBrowserHistory();
}
