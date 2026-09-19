/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { useRootNavigation } from './useRootNavigation';
import { registerRootRouting } from '../routing/utils';

registerRootRouting([
    {
        id: 'route:root:about',
        path: 'about',
        navigation: {
            label: 'About',
        },
    },
    {
        id: 'route:root:store',
        path: 'store/*',
        navigation: {
            label: 'Store',
        },
    },
]);

describe('[useRootNavigation] hook', () => {
    test('produces absolute nav link paths, even for routes registered without a leading slash', async () => {
        const { result } = renderHook(() => useRootNavigation());

        await waitFor(() => expect(result.current).toHaveLength(2));

        expect(result.current.map(({ path }) => path)).toEqual(['/about', '/store']);
    });
});
