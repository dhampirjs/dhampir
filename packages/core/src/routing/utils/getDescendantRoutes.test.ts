import { getDescendantRoutes } from "./getDescendantRoutes";
import { registerRootRouting } from "./registerRootRouting";

registerRootRouting([
    {
        id: 'route:root:management',
        path: 'manage/*',
        routes: [
            {
                id: 'route:manage:products',
                path: 'products',
                navigation: {
                    label: 'Manage Products',
                },
            },
            {
                id: 'route:manage:brands',
                path: 'brands',
                navigation: {
                    label: 'Manage Brands',
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
    test("resolves children of a wildcard-suffixed root route by its bare name", () => {
        const routes = getDescendantRoutes('manage');

        expect(routes.map(({ id }) => id)).toEqual([
            'route:manage:products',
            'route:manage:brands',
        ]);
    });

    test("returns no children for a leaf root route without a wildcard", () => {
        expect(getDescendantRoutes('about')).toEqual([]);
    });

    test("returns no children for a path that matches nothing", () => {
        expect(getDescendantRoutes('does-not-exist')).toEqual([]);
    });
});
