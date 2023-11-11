import { useRoutesForArea } from '../../hooks';

export const isAreaVisible = <T extends string>(area: T, currentPath: string): boolean => {
    const renderingList = useRoutesForArea<T>(area, currentPath);

    return renderingList.length !== 0;
}
