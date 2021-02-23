import * as React from 'react';

import { BoxProps } from './API';
import styled, { css } from 'styled-components';

import { forwardRef, Ref } from 'react';

const Div = forwardRef<HTMLDivElement, BoxProps & React.HTMLAttributes<HTMLDivElement>>((
    {
        children,
        className,
        onClick,
        greedy,
        holdsAbsolute,
        ...other
    },
    ref: Ref<HTMLDivElement>) => {
        const relevant = {
            className,
            onClick,
            ...other,
        };
        return <div {...relevant} ref={ref}>{children}</div>;
    }
);

const Box = styled(Div)`
    box-sizing: border-box;
    ::before,
    ::after {
        box-sizing: border-box;
    }
    ${({ greedy }) => greedy && css`
        flex-flow: column;
        flex-wrap: nowrap;
        flex: 1 auto;
    `};
    ${({ holdsAbsolute }) => holdsAbsolute && css`
        position: relative;
    `};
`;

export {
    Box
}
