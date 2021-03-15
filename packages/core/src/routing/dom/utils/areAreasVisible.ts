import { isAreaVisible, RoutingArea } from '../../../routing';

export const areAreasVisible = (areas: RoutingArea[] = [], currentPath: string): boolean => {
    if (!areas || areas.length === 0) {
        return false;
    }

    for (const area of areas) {
        if(isAreaVisible(area as RoutingArea, currentPath)) {
            return true;
        } else {
            continue;
        }
    }

    return false;
}
