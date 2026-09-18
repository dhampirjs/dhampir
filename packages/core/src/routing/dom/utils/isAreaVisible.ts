import { resolveAreaRendering } from '../../hooks';

export const isAreaVisible = <T extends string>(area: T, currentPath: string): boolean => {
    const renderingList = resolveAreaRendering<T>(area, currentPath);

    return renderingList.length !== 0;
}
