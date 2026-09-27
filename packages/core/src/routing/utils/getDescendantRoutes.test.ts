import { getDescendantRoutes } from "./getDescendantRoutes";
import { registerRootRouting } from "./registerRootRouting";

registerRootRouting([
    {
        id: 'route:root:management',
        path: 'manage',
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
    {
        id: 'route:root:about',
        path: 'about',
    },
]);

describe("[getDescendantRoutes] function", () => {
    test("resolves children of a root route by its name", () => {
        const routes = getDescendantRoutes('manage');

        expect(routes.map(({ id }) => id)).toEqual([
            'route:manage:products',
            'route:manage:brands',
        ]);
    });

    test("returns no children for a leaf root route", () => {
        expect(getDescendantRoutes('about')).toEqual([]);
    });

    test("returns no children for a path that matches nothing", () => {
        expect(getDescendantRoutes('does-not-exist')).toEqual([]);
    });
});
