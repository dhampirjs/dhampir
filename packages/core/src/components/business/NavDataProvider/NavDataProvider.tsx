import { createContext, FunctionComponent, PropsWithChildren } from 'react';
// @ts-ignore - react-router v8 is ESM-only; TS's node16 resolution can't verify this
// CJS import even though Node's module-sync export condition resolves it fine at runtime
// (verified: `node -e "require('react-router')"` resolves every symbol used here).
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
