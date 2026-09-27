/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useIsAreaVisible } from './isAreaVisible';
import { useAreAreasVisible } from './areAreasVisible';
import { RoutingArea } from '../../factory';

describe('[useIsAreaVisible] hook', () => {
    test('returns true when a matched route has rendering for the area', async () => {
        const { result } = renderHook(() => useIsAreaVisible(RoutingArea.TOP), {
            wrapper: ({ children }) => (
                <RouterProvider router={createMemoryRouter([
                    {
                        id: 'route:root:settings',
                        path: 'settings',
                        handle: { rendering: [{ area: RoutingArea.TOP, element: <div>Top</div> }] },
                        element: <>{children}</>,
                    },
                ], { initialEntries: ['/settings'] })} />
            ),
        });

        await waitFor(() => expect(result.current).toBe(true));
    });

    test('returns false when no matched route has rendering for the area', async () => {
        const { result } = renderHook(() => useIsAreaVisible(RoutingArea.TOP), {
            wrapper: ({ children }) => (
                <RouterProvider router={createMemoryRouter([
                    { id: 'route:root:settings', path: 'settings', element: <>{children}</> },
                ], { initialEntries: ['/settings'] })} />
            ),
        });

        await waitFor(() => expect(result.current).toBe(false));
    });
});

describe('[useAreAreasVisible] hook', () => {
    test('returns true when any of the given areas has rendering', async () => {
        const { result } = renderHook(() => useAreAreasVisible([RoutingArea.TOP, RoutingArea.MENU]), {
            wrapper: ({ children }) => (
                <RouterProvider router={createMemoryRouter([
                    {
                        id: 'route:root:settings',
                        path: 'settings',
                        handle: { rendering: [{ area: RoutingArea.MENU, element: <div>Menu</div> }] },
                        element: <>{children}</>,
                    },
                ], { initialEntries: ['/settings'] })} />
            ),
        });

        await waitFor(() => expect(result.current).toBe(true));
    });

    test('returns false when none of the given areas has rendering', async () => {
        const { result } = renderHook(() => useAreAreasVisible([RoutingArea.TOP, RoutingArea.MENU]), {
            wrapper: ({ children }) => (
                <RouterProvider router={createMemoryRouter([
                    { id: 'route:root:settings', path: 'settings', element: <>{children}</> },
                ], { initialEntries: ['/settings'] })} />
            ),
        });

        await waitFor(() => expect(result.current).toBe(false));
    });

    test('returns false for an empty areas list', async () => {
        const { result } = renderHook(() => useAreAreasVisible([]), {
            wrapper: ({ children }) => (
                <RouterProvider router={createMemoryRouter([
                    { id: 'route:root:settings', path: 'settings', element: <>{children}</> },
                ], { initialEntries: ['/settings'] })} />
            ),
        });

        await waitFor(() => expect(result.current).toBe(false));
    });
});
