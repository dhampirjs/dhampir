import { FunctionComponent, PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import classnames from 'classnames';

import styles from './styles.less';

export interface AppNavigationItemOption {
}

export interface AppNavigationItemProps {
  id: string;
  label: ReactNode;
  onClick: (id: string) => void;
}

export const AppNavigationItem: FunctionComponent<PropsWithChildren<AppNavigationItemProps>> = (props) => {
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

export const AppNavigation = (props: PropsWithChildren<AppNavigationProps> & JSX.IntrinsicAttributes) => {
  const { children, key } = props;

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
  return <div className={panelClasses} key={key}>
    <div className={caller} onClick={onCall}>
      <FontAwesomeIcon icon={isVisible ? faTimes : faBars} size={'2x'}/>
    </div>
    <ul className={appMenu}>
      {children}
    </ul>
  </div>;
};
