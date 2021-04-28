import { forwardRef, HTMLAttributes } from 'react';

import styled from 'styled-components';
import { Box } from '../Box';
export interface LabelProps {}

export const Label = styled(
    forwardRef<HTMLDivElement, LabelProps & HTMLAttributes<HTMLDivElement>>(({ ...other }, ref) => {
        return <Box {...other} ref={ref}/>;
    })
)`
    display: flex;
`;
