import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../extensions/context';
import { NavigationNode, PATH_SEPARATOR, useRoutesForPath } from '../routing';

export type NavigationLevel = number;

export const useNavigation = (path: string | string[] = '', expand: boolean = false) => {
    const { version } = useContext(ExtensionContext);
    const [nodes, setNodes] = useState<NavigationNode[]>([]);

    const routes = useRoutesForPath(path, expand);

    useEffect(() => {
        setNodes(routes.map((route) => {
            return {
                label: route.navigation?.label,
                path: [path, route.path!].join(PATH_SEPARATOR).replace(RegExp(`\\${PATH_SEPARATOR}+`, 'gi'), PATH_SEPARATOR),
            }
        }));
    }, [version, setNodes, routes]);

    return nodes;
};
