import { takeLast } from 'ramda';
import { RoutingArea, useRoutesForArea } from '../../../routing';

export const isAreaVisible = (area: RoutingArea, currentPath: string): boolean => {
    const takeLastOf = takeLast(1);
    const parts = currentPath.split('/');
    const routes = useRoutesForArea(area, currentPath);
    const fr = routes.filter(({ path, exact }) => {
        let toFilterOut = false;

        if (Array.isArray(path)) {
            path.forEach(c => {
                if (takeLastOf(c.split('/')) === takeLastOf(parts)) {
                    toFilterOut = true;
                    return;
                }
            })
        } else {
            if(currentPath === path!) {
                return true;
            }

            const [fixedPath]  = (path as string).split('/:');
            if(currentPath.startsWith(fixedPath!)) {
                const left = takeLastOf(parts);
                const right = takeLastOf(path!.split('/'));
                if(left[0] !== right[0]) {
                    return !exact;
                } else {
                    return true;
                }
            }

            return false;
        }

        return toFilterOut;
    });

    if (fr.length === 0) {
        return false;
    }

    return true;
}
