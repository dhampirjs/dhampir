import {getRootRouteByPath} from "./getRootRouteByPath";
import {registerRootRouting} from "../utils";
import {RoutingArea} from "../factory";

registerRootRouting([
    {
        id: 'route:root:store',
        path: '/store/*',
    },
    {
        id: "route:root:default",
        path: '/*',
        routes: [
            {
                id: 'route:wallmart',
                path: 'wallmart/*',
                rendering: [
                    {
                        area: RoutingArea.TOP,
                        element: <div></div>,
                    },
                    {
                        area: RoutingArea.BODY,
                        element: <div>Welcome to Angler Online Store!</div>,
                    }
                ],
                routes: [{
                    id: 'route:products',
                    path: 'products',
                    rendering: [
                        {
                            area: RoutingArea.TOP,
                            element: <div>Product List Top Panel</div>
                        },
                        {
                            area: RoutingArea.BODY,
                            element: <div>Welcome to Product List!</div>,
                        }
                    ],
                }],
                navigation: {
                    label: 'Online Store'
                },
            }
        ],
    },
]);

describe("[getRootRouteByPath] function", () => {
    test("should return correct root route object", () => {
        expect(getRootRouteByPath("/store")?.path).toEqual("/store/*");

        expect(getRootRouteByPath("/")?.path).toEqual("/*");

        const wallmartRoute = getRootRouteByPath("/wallmart");
        expect(wallmartRoute?.path).toEqual("/*");
        expect(wallmartRoute?.routes?.length).toBe(1);

    });

    test("should resolve correct root route for path", () => {
        expect(getRootRouteByPath("/wallmart/products/33231")?.path).toEqual("/*");
    });
})

