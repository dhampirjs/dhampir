import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../extensions';
import { NavigationNode, useRoutesForPath } from '../routing';
import {cleanRoutePath} from "../utils/routing/cleanRoutePath";
import {normalizePath} from "../routing/utils/getDescendantRoutes";

export type NavigationLevel = number;

export const useNavigation = (path = '', expand = false): NavigationNode[] => {
    const { version } = useContext(ExtensionContext);
    const [nodes, setNodes] = useState<NavigationNode[]>([]);

    const routes = useRoutesForPath(path, expand);

    useEffect(() => {
        setNodes(routes.map(({ path: routePath, navigation}) => {
            const childPath = Array.isArray(routePath) ? routePath[0] : routePath;

            return {
                label: navigation?.label,
                path: normalizePath(cleanRoutePath([path, childPath].filter(Boolean).join('/'))),
                params: navigation?.params,
            } as NavigationNode;
        }));
    }, [version, setNodes, routes]);

    return nodes;
}
