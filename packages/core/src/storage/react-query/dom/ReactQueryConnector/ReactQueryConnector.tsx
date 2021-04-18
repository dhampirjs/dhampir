import { FunctionComponent } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';

export const ReactQueryConnector: FunctionComponent = ({ children }) => {
    const client = new QueryClient();

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
