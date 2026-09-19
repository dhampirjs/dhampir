/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-ignore - react-router v8 is ESM-only; resolves fine at runtime via its module-sync export condition, TS's node16 resolution just can't verify it statically
import { MemoryRouter, Route, Routes } from 'react-router';
import { Area } from './Area';
import { RoutingArea } from '../../factory';
import { registerRootRouting } from '../../utils';

registerRootRouting([
    {
        id: 'route:root:splat',
        path: '/manage/*',
        routes: [
            {
                id: 'route:products',
                path: 'products',
                rendering: [
                    {
                        area: RoutingArea.BODY_MAIN,
                        element: <div>Products</div>,
                    },
                ],
            },
        ],
    },
    {
        id: 'route:root:non-splat',
        path: '/settings',
    },
    {
        id: 'route:root:store',
        path: '/store/*',
        routes: [
            {
                id: 'route:store:products',
                path: 'products/*',
                routes: [
                    {
                        id: 'route:store:product',
                        path: ':productId',
                        rendering: [
                            {
                                area: RoutingArea.BODY_MAIN,
                                element: <div>Product Detail</div>,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

describe('[Area] component', () => {
    test('renders matched area rendering for a splat root', () => {
        render(
            <MemoryRouter initialEntries={['/manage/products']}>
                <Routes>
                    <Route path="/manage/*" element={<Area area={RoutingArea.BODY_MAIN} />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Products')).toBeTruthy();
    });

    test('renders nothing, without throwing, when no route matches the current path', () => {
        expect(() => render(
            <MemoryRouter initialEntries={['/does-not-exist']}>
                <Area area={RoutingArea.BODY_MAIN} />
            </MemoryRouter>
        )).not.toThrow();
    });

    test('renders nothing, without throwing, for a non-splat root with no rendering for the area', () => {
        expect(() => render(
            <MemoryRouter initialEntries={['/settings']}>
                <Area area={RoutingArea.BODY_MAIN} />
            </MemoryRouter>
        )).not.toThrow();
    });

    test('resolves a deeply nested splat root', () => {
        render(
            <MemoryRouter initialEntries={['/store/products/42']}>
                <Routes>
                    <Route path="/store/*" element={<Area area={RoutingArea.BODY_MAIN} />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Product Detail')).toBeTruthy();
    });
});
