import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
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
]);

describe('[Area] component', () => {
    test('renders matched area rendering for a splat root', () => {
        render(
            <MemoryRouter initialEntries={['/manage/products']}>
                <Area area={RoutingArea.BODY_MAIN} />
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
});
