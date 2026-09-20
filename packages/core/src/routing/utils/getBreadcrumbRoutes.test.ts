import { getBreadcrumbRoutes } from "./getBreadcrumbRoutes";
import { registerRootRouting } from "./registerRootRouting";

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
        id: 'route:root:store',
        path: 'store/*',
        navigation: { label: 'Store' },
        routes: [
            {
                id: 'route:store:products',
                path: 'products/*',
                navigation: { label: 'Products' },
                routes: [
                    {
                        id: 'route:store:product',
                        path: ':productId',
                    },
                ],
            },
        ],
    },
]);

describe("[getBreadcrumbRoutes] function", () => {
    test("resolves a static multi-level chain with accumulated paths", () => {
        const chain = getBreadcrumbRoutes('/manage/products');

        expect(chain.map(({ route, path }) => ({ id: route.id, path }))).toEqual([
            { id: 'route:root:management', path: '/manage' },
            { id: 'route:manage:products', path: '/manage/products' },
        ]);
    });

    test("resolves a dynamic segment and accumulates params through the chain", () => {
        const chain = getBreadcrumbRoutes('/store/products/42');

        expect(chain.map(({ route, path, params }) => ({ id: route.id, path, params }))).toEqual([
            { id: 'route:root:store', path: '/store', params: {} },
            { id: 'route:store:products', path: '/store/products', params: {} },
            { id: 'route:store:product', path: '/store/products/42', params: { productId: '42' } },
        ]);
    });

    test("returns an empty array for a path that matches nothing", () => {
        expect(getBreadcrumbRoutes('/does-not-exist')).toEqual([]);
    });
});
