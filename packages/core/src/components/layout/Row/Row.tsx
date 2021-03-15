import * as React from 'react';
import { RowProps } from './API';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { Box } from '../Box';

const Row = styled(
    forwardRef<HTMLDivElement, RowProps & React.HTMLAttributes<HTMLDivElement>>(({ greedy, asGrid, ...other }, ref) => {
        return <Box greedy={greedy} {...other} ref={ref}/>;
    })
)`
    display: flex;
    flex-flow: row;
    ${({asGrid}) => asGrid ? css`
        align-items: stretch;
        flex-wrap: nowrap;
    ` : css`
        align-items: flex-start;
    `}
`;
export {
    Row
}
