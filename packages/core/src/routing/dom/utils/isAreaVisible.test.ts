import { UIMatch } from 'react-router';
import { isAreaVisible } from './isAreaVisible';
import { areAreasVisible } from './areAreasVisible';
import { RoutingArea, DhampirRouteHandle, AreaRouteRendering } from '../../factory';

const match = (rendering?: AreaRouteRendering[]): UIMatch<unknown, DhampirRouteHandle> => ({
    id: 'route:test',
    pathname: '/test',
    params: {},
    loaderData: undefined,
    handle: rendering ? { rendering } : {},
});

describe('[isAreaVisible] function', () => {
    test('returns true when a matched route has rendering for the area', () => {
        const matches = [match([{ area: RoutingArea.TOP, element: null }])];

        expect(isAreaVisible(RoutingArea.TOP, matches)).toBe(true);
    });

    test('returns false when no matched route has rendering for the area', () => {
        const matches = [match()];

        expect(isAreaVisible(RoutingArea.TOP, matches)).toBe(false);
    });
});

describe('[areAreasVisible] function', () => {
    test('returns true when any of the given areas has rendering', () => {
        const matches = [match([{ area: RoutingArea.MENU, element: null }])];

        expect(areAreasVisible([RoutingArea.TOP, RoutingArea.MENU], matches)).toBe(true);
    });

    test('returns false when none of the given areas has rendering', () => {
        const matches = [match()];

        expect(areAreasVisible([RoutingArea.TOP, RoutingArea.MENU], matches)).toBe(false);
    });

    test('returns false for an empty areas list', () => {
        expect(areAreasVisible([], [match([{ area: RoutingArea.TOP, element: null }])])).toBe(false);
    });
});
