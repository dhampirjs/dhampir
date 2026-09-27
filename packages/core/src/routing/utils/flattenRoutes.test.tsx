import {flattenRoutes, RoutingArea} from '../../routing';

describe("[flattenRoute] function", () => {
    it("should return correct data for root route", () => {
        const result = flattenRoutes({
            id: 'route:default',
            path: 'store',
            handle: {
                rendering: [
                    {
                        area: RoutingArea.TOP_LEFT,
                        element: null,
                    },
                    {
                        area: RoutingArea.TOP_CENTER,
                        // We are using `exact={true}` to render it only when route matches exactly
                        element: null,
                    },
                ],
            },
            element: null,
        }, RoutingArea.TOP, '/store');

        expect(result.length).toBe(1);
        expect(result[0].isRootRoute).toBe(true);
    });
    it("should return renderings only for / path", () => {
        const result = flattenRoutes(
            {
                id: 'route:default',
                path: 'store',
                children: [
                    {
                        id: "route:products",
                        path: 'products',
                        handle: {
                            rendering: [
                                {
                                    area: RoutingArea.TOP_LEFT,
                                    element: <div>Products</div>,
                                },
                                {
                                    area: RoutingArea.TOP,
                                    element: <div>Products</div>,
                                },
                            ],
                        },
                        children: [
                            {
                                id: "route:details",
                                path: ':productId',
                                handle: {
                                    rendering: [
                                        {
                                            area: RoutingArea.TOP,
                                            element: <div>Details</div>,
                                        },
                                    ],
                                },
                            }
                        ],
                    }
                ],
                handle: {
                    rendering: [
                        {
                            area: RoutingArea.TOP_LEFT,
                            element: null,
                        },
                        {
                            area: RoutingArea.TOP_CENTER,
                            // We are using `exact={true}` to render it only when route matches exactly
                            element: null,
                        },
                    ],
                },
                element: null,
            }, RoutingArea.TOP, '/store/products/34345');

        expect(result.length).toBe(3);
        expect(result[0].path).toBe('store');
        expect(result[0].isRootRoute).toBe(true);
    });

})
