import React, { FunctionComponent, ReactNode, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import styles from './styles.less';

export interface AppNavigationItemOption {
}

export interface AppNavigationItemProps {
    id: string;
    label: ReactNode;
    onClick: (id: string) => void;
}

export const AppNavigationItem: FunctionComponent<AppNavigationItemProps> = (props) => {
    const {
        id,
        label,
        onClick
    } = props;

    const onClickInner = useCallback(() => {
        onClick?.(id);

    }, [id]);

    return <li className={styles.item} onClick={onClickInner}>{label}</li>;
};

export interface AppNavigationProps {
    items?: AppNavigationItemOption[];
    onSelect?: (id: string) => void;
}

export const AppNavigation: FunctionComponent<AppNavigationProps> = (props) => {
    const { children } = props;

    const [showPanel, setShowPanel] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const onCall = useCallback(() => {
        setShowPanel(!showPanel);
        setIsVisible(!isVisible);
    }, [showPanel, isVisible]);

    const {
        appNav,
        appMenu,
        caller,
    } = styles;

    const panelClasses = classnames({
        [styles.open]: showPanel,
        [appNav]: true,
    })
    return <div className={panelClasses}>
        <div className={caller} onClick={onCall}>
            <FontAwesomeIcon icon={isVisible ? faTimes : faBars} size={'2x'}/>
        </div>
        <CSSTransition
            key={"dkfjgsdkfjh"}
            unmountOnExit
            timeout={{ enter: 500, exit: 200 }}
            in={showPanel}
            classNames={{
                enter: styles.appNavEnter,
                enterActive: styles.appNavEnterActive,
                exitActive: styles.appNavExitActive,
                exitDone: styles.appNavExit,
            }}>
            <ul className={appMenu}>
                {children}
            </ul>
        </CSSTransition>
    </div>;
};
