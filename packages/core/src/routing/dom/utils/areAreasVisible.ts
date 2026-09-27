import { UIMatch } from 'react-router';
import { isAreaVisible } from './isAreaVisible';
import { RoutingArea, DhampirRouteHandle } from '../../../routing';

export const areAreasVisible = (areas: RoutingArea[] = [], matches: UIMatch<unknown, DhampirRouteHandle>[]): boolean => {
    if (!areas || areas.length === 0) {
        return false;
    }

    return areas.some(area => isAreaVisible(area, matches));
}
