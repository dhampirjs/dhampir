import { createBrowserRouter, RouterProvider } from 'react-router';
import { useMemo } from 'react';
import { getRootRoutes } from '../../hooks';

export const RootArea = () => {
    const router = useMemo(() => createBrowserRouter(getRootRoutes()), []);

    return <RouterProvider router={router} />;
}
