import {cleanRoutePath} from './cleanRoutePath';

describe('`cleanRoutePath` utility function', function () {
    it('cleans `/*` from route', () => {
        const validRoute = '/parent/child/*';

        const received = cleanRoutePath(validRoute);
        expect(received).toBe('/parent/child');
    })
    it('keeps `/**/` and similar in route', () => {
        const route = '/parent/child/*/';

        const received = cleanRoutePath(route);
        expect(received).toBe('/parent/child/*/');
    })
});
