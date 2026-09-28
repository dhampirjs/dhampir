/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Area } from './Area';
import { RoutingArea } from '../../factory';
import { RouteWithChildren } from '../../factory';

const renderAt = (routes: RouteWithChildren[], initialPath: string) => {
    const router = createMemoryRouter(routes, { initialEntries: [initialPath] });
    return render(<RouterProvider router={router} />);
};

describe('[Area] component', () => {
    test('renders matched area rendering for a nested route', () => {
        renderAt([
            {
                id: 'route:root:splat',
                path: '/manage',
                children: [
                    {
                        id: 'route:products',
                        path: 'products',
                        handle: {
                            rendering: [
                                {
                                    area: RoutingArea.BODY_MAIN,
                                    element: <div>Products</div>,
                                },
                            ],
                        },
                        element: <Area area={RoutingArea.BODY_MAIN} />,
                    },
                ],
            },
        ], '/manage/products');

        expect(screen.getByText('Products')).toBeTruthy();
    });

    test('renders nothing, without throwing, when no route matches the current path', () => {
        expect(() => renderAt([
            {
                id: 'route:root:settings',
                path: '/settings',
                element: <Area area={RoutingArea.BODY_MAIN} />,
            },
        ], '/does-not-exist')).not.toThrow();
    });

    test('renders nothing, without throwing, for a route with no rendering for the area', () => {
        expect(() => renderAt([
            {
                id: 'route:root:settings',
                path: '/settings',
                element: <Area area={RoutingArea.BODY_MAIN} />,
            },
        ], '/settings')).not.toThrow();
    });

    test('resolves a deeply nested route, including ancestor rendering for the same area', () => {
        renderAt([
            {
                id: 'route:root:store',
                path: '/store',
                handle: {
                    rendering: [
                        {
                            area: RoutingArea.BODY_MAIN,
                            element: <div>Store Shell</div>,
                        },
                    ],
                },
                children: [
                    {
                        id: 'route:store:products',
                        path: 'products',
                        children: [
                            {
                                id: 'route:store:product',
                                path: ':productId',
                                handle: {
                                    rendering: [
                                        {
                                            area: RoutingArea.BODY_MAIN,
                                            element: <div>Product Detail</div>,
                                        },
                                    ],
                                },
                                element: <Area area={RoutingArea.BODY_MAIN} />,
                            },
                        ],
                    },
                ],
            },
        ], '/store/products/42');

        expect(screen.getByText('Store Shell')).toBeTruthy();
        expect(screen.getByText('Product Detail')).toBeTruthy();
    });
});
