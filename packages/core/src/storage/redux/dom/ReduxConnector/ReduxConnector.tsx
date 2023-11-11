import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux';
import { useDataProvider } from '../../../../hooks';

const ReduxConnector = ({ children }: PropsWithChildren<unknown>) => {
    const store = useDataProvider();

    return (store ? <Provider store={store}>{children}</Provider> : null);
}

export {
    ReduxConnector
}
