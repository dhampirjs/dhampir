import { useMatches, UIMatch } from 'react-router';
import { DhampirRouteHandle } from '../../factory';

export const useIsAreaVisible = <T extends string>(area: T): boolean => {
    const matches = useMatches() as UIMatch<unknown, DhampirRouteHandle>[];

    return matches.some(match => match.handle?.rendering?.some(entry => entry.area === area));
}
