import * as React from 'react';
import { forwardRef } from 'react';
import { SpacerProps } from './API';
import styled, { css } from 'styled-components';

import { Box } from '../Box';
import { Direction, Units } from '../../API';

const defaults: Partial<SpacerProps> = {
    units: Units.PX,
    direction: Direction.HORIZONTAL
}

const createSize: (size?: number, units?: Units) => string = (size, units = defaults.units) => {
    return size ? `${size}${units}` : 'auto';
};

const Spacer = styled(forwardRef<HTMLDivElement, SpacerProps & React.HTMLAttributes<HTMLDivElement>>((
    {
        size,
        units,
        direction,
        space,
        ...rest
    }, ref) => {
    return <Box {...rest} ref={ref}/>
}))`
    display: flex;
    padding: ${({ units, space }) => createSize(space, units)};
    align-items: stretch;
    justify-content: space-between;
    flex: 1 1 auto;
    ${({
           size,
           units = defaults.units,
           direction = defaults.direction
       }) => direction === Direction.HORIZONTAL
        ? css`
            flex-direction: row;
            width: ${createSize(size, units)};
        `
        : css`
            flex-direction: column;
            height: ${createSize(size, units)};
        `
    };
`;

export {
    Spacer
}
