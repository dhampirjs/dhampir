import { createContext, FunctionComponent, PropsWithChildren } from 'react';
import { RouteProps } from 'react-router';

import { useNavigation, useRootNavigation } from '../../../hooks';
import { NavigationNode } from '../../../routing';

export interface NavigationContent {
    nodes: NavigationNode[];
}

export type NavDataProvideProps = RouteProps & {
    expand?: boolean,
    isRoot?: boolean,
}

export const NavigationContext = createContext<NavigationContent>({ nodes: [] })

export const NavDataProvider: FunctionComponent<PropsWithChildren<NavDataProvideProps>> = (
    {
        path,
        children,
        expand = false,
        isRoot = false,
    }
) => {
    const nodes = isRoot ? useRootNavigation(expand) : useNavigation(path, expand);

    return <>
        <NavigationContext.Provider value={{ nodes }}>
            {children}
        </NavigationContext.Provider>
    </>;
};
