import React, { FunctionComponent, HTMLAttributes } from 'react';

import styles from './styles.less';
export interface LabelProps {}

export const Label: FunctionComponent<LabelProps & HTMLAttributes<HTMLSpanElement>> = ({ children }) => {
    const {
        label,
    } = styles;
    return <span className={label}>{children}</span>
};
