import {FunctionComponent, PropsWithChildren} from 'react'
import { Provider } from 'react-redux';
import { useDataProvider } from '../../../../hooks';

const ReduxConnector: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const store = useDataProvider();

    return (store ? <Provider store={store}>{children}</Provider> : null);
}

export {
    ReduxConnector
}
