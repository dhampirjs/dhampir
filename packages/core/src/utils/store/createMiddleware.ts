import { Middleware } from 'redux';
import { StoreRegistry } from '../../store';

export function createMiddleware(registry: StoreRegistry): Middleware[] {
    const ids = Object.keys(registry);

    return ids.reduce<Middleware[]>((acc, id) => {
        const mw = registry[id].middleware || [];
        acc = [...acc, ...mw];
        return acc;
    }, []);
}
