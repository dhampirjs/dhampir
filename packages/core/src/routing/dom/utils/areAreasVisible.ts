import { useIsAreaVisible } from './isAreaVisible';
import { RoutingArea } from '../../../routing';

export const useAreAreasVisible = (areas: RoutingArea[] = []): boolean => {
    // `areas` is always a fixed literal array at each call site, so the number of
    // hook calls per render stays stable here.
    return areas.some(area => useIsAreaVisible(area));
}
