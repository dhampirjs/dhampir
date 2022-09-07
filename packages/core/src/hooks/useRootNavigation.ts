import { useContext, useEffect, useState } from 'react';
import { ExtensionContext } from '../extensions';
import { getRootRoutes, NavigationNode, PATH_SEPARATOR } from '../routing';
import {cleanRoutePath} from "../utils/routing/cleanRoutePath";

export const useRootNavigation = (expand = false): NavigationNode[] => {
    const { version } = useContext(ExtensionContext);
    const [nodes, setNodes] = useState<NavigationNode[]>([]);

    const routes = getRootRoutes();

    useEffect(() => {
        const nodeList = [];
        routes.reduce<NavigationNode[]>((acc, { path, navigation }) => {
            if(navigation) {
                acc.push({
                    label: navigation?.label,
                    params: navigation?.params,
                    path: cleanRoutePath(path!),
                } as NavigationNode);
            }
            return acc;
        }, nodeList);

        setNodes(nodeList);
    }, [version, setNodes, routes]);

    return nodes;
};
