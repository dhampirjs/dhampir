import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../extensions';
import { NavigationNode, PATH_SEPARATOR, useRoutesForPath } from '../routing';
import {cleanRoutePath} from "../utils/routing/cleanRoutePath";

export type NavigationLevel = number;

export const useNavigation = (path = '', expand = false): NavigationNode[] => {
    const { version } = useContext(ExtensionContext);
    const [nodes, setNodes] = useState<NavigationNode[]>([]);

    const routes = useRoutesForPath(path, expand);

    useEffect(() => {
        setNodes(routes.map(({ path: routePath, navigation}) => {
            return {
                label: navigation?.label,
                path: cleanRoutePath(path),
                params: navigation?.params,
            } as NavigationNode;
        }));
    }, [version, setNodes, routes]);

    return nodes;
}
