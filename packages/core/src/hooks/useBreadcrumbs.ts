import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ExtensionContext } from '../extensions';
import { BreadcrumbNode, getBreadcrumbRoutes } from '../routing';

export const useBreadcrumbs = (): BreadcrumbNode[] => {
    const { version } = useContext(ExtensionContext);
    const location = useLocation();
    const [nodes, setNodes] = useState<BreadcrumbNode[]>([]);

    useEffect(() => {
        const matches = getBreadcrumbRoutes(location.pathname)
            .filter(({ route }) => route.navigation?.label || route.navigation?.resolveLabel);

        setNodes(matches.map(({ route, path }) => ({
            path,
            label: route.navigation?.label,
            params: route.navigation?.params,
            isLoading: !!route.navigation?.resolveLabel && !route.navigation?.label,
        } as BreadcrumbNode)));

        matches.forEach(({ route, path, params }) => {
            const resolveLabel = route.navigation?.resolveLabel;

            if (!resolveLabel) {
                return;
            }

            Promise.resolve(resolveLabel(params))
                .then(label => {
                    setNodes(current => current.map(node =>
                        node.path === path ? { ...node, label, isLoading: false } : node
                    ));
                })
                .catch(() => {
                    setNodes(current => {
                        const fallbackLabel = route.navigation?.label;

                        if (fallbackLabel) {
                            return current.map(node =>
                                node.path === path ? { ...node, label: fallbackLabel, isLoading: false } : node
                            );
                        }

                        return current.filter(node => node.path !== path);
                    });
                });
        });
    }, [version, location.pathname]);

    return nodes;
};
