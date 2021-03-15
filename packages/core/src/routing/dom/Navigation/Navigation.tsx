import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { RouteProps } from 'react-router';

import cx from 'classnames';

import styles from './styles.less';
import { Label, NavigationContext } from '../../../components';
import { NavigationNode } from '../../factory';

export interface NavigationDataItem {
    to: string;
    label: string;
}

export interface NavigationProps extends RouteProps {
    items?: NavigationDataItem[];
    inline?: boolean;
    onClick?: (data: NavigationNode, event: React.SyntheticEvent<HTMLLIElement>) => void
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
                                                                         inline = true,
                                                                         onClick,
                                                                     }) => {

    const { nodes = [] } = useContext(NavigationContext);
    const onClickHandler: (data: NavigationNode) => (event: React.SyntheticEvent<HTMLLIElement>) => void = React.useCallback((item) => {
        return (event) => onClick && onClick(item, event);
    }, [onClick]);
    const {
        navigation,
        horizontal,
        item,
    } = styles;

    const className = cx({
        [navigation]: true,
        [horizontal]: inline,
    });
    return <ul className={className}>
        {nodes.map((data) => {
            const { path, label } = data;
            let calculatedPath = Array.isArray(path) ? path[0] : path;

            return <li
                className={item}
                key={`${path}_${label}`}
                onClick={onClickHandler(data)}>
                <NavLink activeClassName={styles.active} className={styles.link} to={calculatedPath}><Label>{label}</Label></NavLink>
            </li>;
        })}
    </ul>;
};
