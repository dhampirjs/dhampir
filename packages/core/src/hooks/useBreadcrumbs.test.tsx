/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useBreadcrumbs } from './useBreadcrumbs';
import { registerRootRouting } from '../routing/utils';

registerRootRouting([
    {
        id: 'route:root:management',
        path: 'manage/*',
        navigation: { label: 'Control Panel' },
        routes: [
            {
                id: 'route:manage:products',
                path: 'products',
                navigation: { label: 'Manage Products' },
            },
        ],
    },
    {
        id: 'route:root:with-fallback',
        path: 'with-fallback/*',
        navigation: { label: 'With Fallback' },
        routes: [
            {
                id: 'route:with-fallback:item',
                path: ':itemId',
                navigation: {
                    label: 'Loading item...',
                    resolveLabel: () => new Promise(resolve => setTimeout(() => resolve('Resolved Item'), 5)),
                },
            },
        ],
    },
    {
        id: 'route:root:no-fallback',
        path: 'no-fallback/*',
        routes: [
            {
                id: 'route:no-fallback:item',
                path: ':itemId',
                navigation: {
                    resolveLabel: (params) => new Promise(resolve => setTimeout(() => resolve(`Item ${params.itemId}`), 5)),
                },
            },
        ],
    },
    {
        id: 'route:root:reject-with-fallback',
        path: 'reject-with-fallback/*',
        routes: [
            {
                id: 'route:reject-with-fallback:item',
                path: ':itemId',
                navigation: {
                    label: 'Fallback Label',
                    resolveLabel: () => new Promise((_, reject) => setTimeout(() => reject(new Error('boom')), 5)),
                },
            },
        ],
    },
    {
        id: 'route:root:reject-no-fallback',
        path: 'reject-no-fallback/*',
        routes: [
            {
                id: 'route:reject-no-fallback:item',
                path: ':itemId',
                navigation: {
                    resolveLabel: () => new Promise((_, reject) => setTimeout(() => reject(new Error('boom')), 5)),
                },
            },
        ],
    },
]);

const renderAt = (path: string) => renderHook(() => useBreadcrumbs(), {
    wrapper: ({ children }) => <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>,
});

describe('[useBreadcrumbs] hook', () => {
    test('resolves the full static trail, including the current page, with no loading state', async () => {
        const { result } = renderAt('/manage/products');

        await waitFor(() => expect(result.current).toHaveLength(2));

        expect(result.current).toEqual([
            { path: '/manage', label: 'Control Panel', params: undefined, isLoading: false },
            { path: '/manage/products', label: 'Manage Products', params: undefined, isLoading: false },
        ]);
    });

    test('shows the static label immediately, then swaps to the resolved value, when both exist', async () => {
        const { result } = renderAt('/with-fallback/42');

        await waitFor(() => expect(result.current).toHaveLength(2));
        expect(result.current[1]).toMatchObject({ label: 'Loading item...', isLoading: false });

        await waitFor(() => expect(result.current[1].label).toBe('Resolved Item'));
        expect(result.current[1].isLoading).toBe(false);
    });

    test('shows isLoading when there is no static label, then resolves using the matched params', async () => {
        const { result } = renderAt('/no-fallback/7');

        await waitFor(() => expect(result.current).toHaveLength(1));
        expect(result.current[0]).toMatchObject({ label: undefined, isLoading: true });

        await waitFor(() => expect(result.current[0].label).toBe('Item 7'));
        expect(result.current[0].isLoading).toBe(false);
    });

    test('falls back to the static label when resolveLabel rejects', async () => {
        const { result } = renderAt('/reject-with-fallback/42');

        await waitFor(() => expect(result.current).toHaveLength(1));
        await waitFor(() => expect(result.current[0]).toMatchObject({ label: 'Fallback Label', isLoading: false }));
    });

    test('drops the crumb when resolveLabel rejects with no static label to fall back to', async () => {
        const { result } = renderAt('/reject-no-fallback/42');

        await waitFor(() => expect(result.current).toHaveLength(1));

        await waitFor(() => expect(result.current).toHaveLength(0));
    });
});
