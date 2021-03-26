import React, { useContext } from 'react';
import { RouteProps } from 'react-router';
import { Label, NavigationContext } from '../../../components';
import { NavigationNode } from '../../factory';
import styled, { css } from 'styled-components';
import { Link } from '../Link';

export interface NavigationDataItem {
    to: string;
    label: string;
}

export interface NavigationProps extends RouteProps {
    items?: NavigationDataItem[];
    inline?: boolean;
    onClick?: (data: NavigationNode, event: React.SyntheticEvent<HTMLLIElement>) => void
}

export const NavigationItem = styled.li`
    list-style: none;

    ${Link} {
        padding: 0.5em 0.75em;
        text-decoration: none;
    }
`;

const NavigationBusiness: React.FunctionComponent<NavigationProps & React.HTMLAttributes<HTMLUListElement>> = (
    {
        inline = true,
        onClick,
        className,
    }
) => {

    const { nodes = [] } = useContext(NavigationContext);
    const onClickHandler: (data: NavigationNode) => (event: React.SyntheticEvent<HTMLLIElement>) => void = React.useCallback((item) => {
        return (event) => onClick?.(item, event);
    }, [onClick]);

    return <ul className={className}>
        {nodes.map((data) => {
            const { path, label } = data;
            const calculatedPath = Array.isArray(path) ? path[0] : path;

            return <NavigationItem
                key={`${path}_${label}`}
                onClick={onClickHandler(data)}>
                <Link activeClassName={'active'} to={calculatedPath}><Label>{label}</Label></Link>
            </NavigationItem>
        })}
    </ul>;
};

export const Navigation = styled(NavigationBusiness)`
    padding: 0;
    margin: 0;
    font-size: 0.75em;

    ${({ inline }) => inline && css`
        display: flex;
        flex: 1 1 auto;
        flex-flow: row;
    `}
    ${NavigationItem} {
        display: flex;
    }
`;

