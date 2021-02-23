import * as React from 'react';
import { ColumnDecoratorProps, DecoratorPosition } from './API';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { Box } from '../Box';

const ColumnDecorator = styled(
    forwardRef<HTMLDivElement, ColumnDecoratorProps & React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    return <Box {...props} ref={ref}/>
}))`
    display: flex;
    flex: 1 1 auto;
    min-width: 240px;
    ${({ position }) => position === DecoratorPosition.LEFT && css`
        border-right: 1px solid #dfdfdf;
    `}
    ${({ position }) => position === DecoratorPosition.RIGHT && css`
        border-left: 1px solid #dfdfdf;
    `}
    ${({ position }) => position === DecoratorPosition.TOP && css`
        border-top: 1px solid #dfdfdf;
    `}
    ${({ position }) => position === DecoratorPosition.BOTTOM && css`
        border-bottom: 1px solid #dfdfdf;
    `}
    ${({ position }) => position === DecoratorPosition.ALL && css`
        border: 1px solid #dfdfdf;
    `}
    align-items: stretch;
    justify-content: space-between;
`;

export {
    ColumnDecorator
}
