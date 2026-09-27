import { registerRootRouting } from "./registerRootRouting";

describe("[registerRootRouting] function", () => {
    test("throws when a route with the same id is already registered", () => {
        registerRootRouting([
            { id: 'route:root:duplicate-check', path: 'duplicate-check' },
        ]);

        expect(() => registerRootRouting([
            { id: 'route:root:duplicate-check', path: 'duplicate-check-again' },
        ])).toThrow(/route:root:duplicate-check/);
    });

    test("does not throw for a route tree with nested children (no wildcard required)", () => {
        expect(() => registerRootRouting([
            {
                id: 'route:root:valid-manage',
                path: 'manage',
                children: [
                    { id: 'route:valid-manage:products', path: 'products' },
                ],
            },
        ])).not.toThrow();
    });

    test("does not throw for a leaf root route without children", () => {
        expect(() => registerRootRouting([
            { id: 'route:root:about', path: 'about' },
        ])).not.toThrow();
    });
});
