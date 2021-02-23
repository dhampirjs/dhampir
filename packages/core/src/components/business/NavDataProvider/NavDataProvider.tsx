import React, { createContext } from 'react';
import { RouteChildrenProps } from 'react-router';

import { useNavigation } from '../../../hooks';
import { NavigationNode } from '../../../routing';
import { useRootNavigation } from '../../../hooks/useRootNavigation';

export interface NavigationContent {
    nodes: NavigationNode[];
}

export interface NavDataProvideProps extends RouteChildrenProps {
    expand?: boolean,
    isRoot?: boolean,
}

export const NavigationContext = createContext<NavigationContent>({ nodes: [] })
export const NavDataProvider: React.FunctionComponent<NavDataProvideProps> = ({
                                                                                  match,
                                                                                  children,
                                                                                  expand = false,
                                                                                  isRoot = false,
                                                                              }) => {

    const nodes = isRoot ? useRootNavigation(expand) : useNavigation(match?.path!, expand);

    return <NavigationContext.Provider value={{ nodes }}>
        {children}
    </NavigationContext.Provider>;
};
