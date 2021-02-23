import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../context';
import { getRootRoutes, NavigationNode, PATH_SEPARATOR } from '../routing';

export const useRootNavigation = (expand: boolean = false) => {
    const { version } = useContext(ExtensionContext);
    const [nodes, setNodes] = useState<NavigationNode[]>([]);

    const routes = getRootRoutes();

    useEffect(() => {
        const nodeList = [];
        routes.reduce<NavigationNode[]>((acc, { path, navigation }) => {
            if(!!navigation) {
                const calculatedPath = Array.isArray(path) ? path[0] : path;
                acc.push({
                    label: navigation?.label,
                    path: calculatedPath ? calculatedPath!.replace(RegExp(`\\${PATH_SEPARATOR}+`, 'gi'), PATH_SEPARATOR) : '',
                });
            }
            return acc;
        }, nodeList);

        setNodes(nodeList);
    }, [version, setNodes, routes]);

    return nodes;
};
