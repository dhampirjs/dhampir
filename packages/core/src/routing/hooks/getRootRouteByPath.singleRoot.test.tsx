import {getRootRouteByPath} from "./getRootRouteByPath";
import {registerRootRouting} from "../utils";
import {RoutingArea} from "../factory";

registerRootRouting([
    {
        id: 'route:root:only',
        path: '/store/*',
        children: [
            {
                id: 'route:store:products',
                path: 'products/*',
                handle: {
                    rendering: [
                        {
                            area: RoutingArea.BODY_MAIN,
                            element: <div>Products</div>,
                        },
                    ],
                },
            },
        ],
    },
]);

describe("[getRootRouteByPath] with exactly one root route registered", () => {
    test("resolves the single root route for a nested path beneath it", () => {
        expect(getRootRouteByPath("/store/products/42")?.path).toEqual("/store/*");
    });

    test("resolves the single root route for its own top-level path", () => {
        expect(getRootRouteByPath("/store")?.path).toEqual("/store/*");
    });
});
