import * as React from 'react';
import { useMatches, UIMatch } from 'react-router';
import { DhampirRouteHandle } from '../../factory';

interface AreaProps<T> {
    area: T;
}

const Area: React.FunctionComponent<AreaProps<string>> = ({ area }) => {
    const matches = useMatches() as UIMatch<unknown, DhampirRouteHandle>[];

    const elements = matches
        .map(match => match.handle?.rendering?.find(entry => entry.area === area)?.element)
        .filter(element => element !== undefined);

    if (elements.length === 0) return null;

    return <>{elements.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}</>;
};

export { Area };
