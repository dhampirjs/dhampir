import { registerRootRouting } from "./registerRootRouting";

describe("[registerRootRouting] function", () => {
    test("throws when a root route has children but its own path is missing a trailing \"/*\"", () => {
        expect(() => registerRootRouting([
            {
                id: 'route:root:broken-manage',
                path: 'manage',
                routes: [
                    { id: 'route:broken-manage:products', path: 'products' },
                ],
            },
        ])).toThrow(/route:root:broken-manage/);
    });

    test("throws when a nested (non-root) route has children but is missing a trailing \"/*\"", () => {
        expect(() => registerRootRouting([
            {
                id: 'route:root:store',
                path: 'store/*',
                routes: [
                    {
                        id: 'route:store:products',
                        path: 'products',
                        routes: [
                            { id: 'route:store:products:detail', path: ':productId' },
                        ],
                    },
                ],
            },
        ])).toThrow(/route:store:products/);
    });

    test("does not throw for a route tree where every level with children ends in \"/*\"", () => {
        expect(() => registerRootRouting([
            {
                id: 'route:root:valid-manage',
                path: 'manage/*',
                routes: [
                    { id: 'route:valid-manage:products', path: 'products' },
                ],
            },
        ])).not.toThrow();
    });

    test("does not throw for a leaf root route without children or a wildcard", () => {
        expect(() => registerRootRouting([
            { id: 'route:root:about', path: 'about' },
        ])).not.toThrow();
    });
});
