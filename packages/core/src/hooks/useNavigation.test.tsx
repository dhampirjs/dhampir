/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { useNavigation } from './useNavigation';
import { registerRootRouting } from '../routing/utils';

registerRootRouting([
    {
        id: 'route:root:management',
        path: 'manage',
        handle: {
            navigation: { label: 'Control Panel' },
        },
        children: [
            {
                id: 'route:manage:products',
                path: 'products',
                handle: {
                    navigation: { label: 'Manage Products' },
                },
            },
            {
                id: 'route:manage:brands',
                path: 'brands',
                handle: {
                    navigation: { label: 'Manage Brands' },
                },
            },
        ],
    },
]);

describe('[useNavigation] hook', () => {
    test('produces a distinct absolute link path per descendant route, not the parent path repeated', async () => {
        const { result } = renderHook(() => useNavigation('manage'));

        await waitFor(() => expect(result.current).toHaveLength(2));

        expect(result.current.map(({ label, path }) => ({ label, path }))).toEqual([
            { label: 'Manage Products', path: '/manage/products' },
            { label: 'Manage Brands', path: '/manage/brands' },
        ]);
    });
});
