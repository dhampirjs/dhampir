import * as React from 'react';
import { ReducerProps } from './API';
import { forwardRef } from 'react';
import styled from 'styled-components';

import { Box } from '../Box';

const Reducer = styled(forwardRef<HTMLDivElement, ReducerProps & React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    return <Box {...props} ref={ref}/>
}))`
    display: flex;
    padding: 1em;
`;

export {
    Reducer
}
