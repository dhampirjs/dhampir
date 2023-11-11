import React, {PropsWithChildren} from 'react';

import { BoxProps } from './API';
import styled, {css} from 'styled-components';

import { forwardRef, Ref } from 'react';

const Div = forwardRef<HTMLDivElement, PropsWithChildren<BoxProps>>((
    {
        children,
        greedy,
        holdsAbsolute,
        alignItems,
        ...other
    },
    ref: Ref<HTMLDivElement>) => {
        const relevant = {
            ...other,
        };
        return <div {...relevant} ref={ref}>{children}</div>;
    }
);

const createAlignItems = (alignment = 'normal') => {
    return css`
        align-items: ${alignment};
    `;
};

const Box = styled(Div)`
    box-sizing: border-box;
    ::before,
    ::after {
        box-sizing: border-box;
    }
    ${({ greedy }) => greedy && css`
        flex-wrap: nowrap;
        flex: 1 auto;
    `};
    ${({alignItems}) => createAlignItems(alignItems)}
    ${({ holdsAbsolute }) => holdsAbsolute && css`
        position: relative;
    `};
`;

export {
    Box
}
