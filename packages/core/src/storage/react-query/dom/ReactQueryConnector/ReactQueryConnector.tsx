import {FunctionComponent, PropsWithChildren} from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';

export const ReactQueryConnector: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const client = new QueryClient();

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
