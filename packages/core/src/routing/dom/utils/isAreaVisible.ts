import { UIMatch } from 'react-router';
import { DhampirRouteHandle } from '../../factory';

export const isAreaVisible = <T extends string>(area: T, matches: UIMatch<unknown, DhampirRouteHandle>[]): boolean => {
    return matches.some(match => match.handle?.rendering?.some(entry => entry.area === area));
}
