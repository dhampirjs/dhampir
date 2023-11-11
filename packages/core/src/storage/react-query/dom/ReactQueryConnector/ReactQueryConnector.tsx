import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';

export const ReactQueryConnector = ({ children }: PropsWithChildren<unknown>) => {
    const client = new QueryClient();

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
