import * as React from 'react';
import { forwardRef } from 'react';
import { SpacerProps } from './API';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { Box } from '../Box';
import { Direction, Units } from '../../API';

const defaults: Partial<SpacerProps> = {
    units: Units.PX,
    direction: Direction.HORIZONTAL
}

const createJustifyContent: (alignment?: string) => FlattenSimpleInterpolation = (alignment= 'normal') => {
    return css`
        justify-content: ${alignment};
    `;
};

const createSize: (size?: number, units?: Units) => string = (size, units = defaults.units!) => {
    return size ? `${size}${units}` : 'auto';
};

const Spacer = styled(forwardRef<HTMLDivElement, SpacerProps & React.HTMLAttributes<HTMLDivElement>>((
    {
        size,
        units,
        direction,
        space,
        justifyContent,
        ...rest
    }, ref) => {
    return <Box {...rest} ref={ref}/>
}))`
    display: flex;
    ${({justifyContent}) => createJustifyContent(justifyContent)}
    padding: ${({ units, space }) => createSize(space, units)};
    ${({
           size,
           units = defaults.units,
           direction = defaults.direction
       }) => direction === Direction.HORIZONTAL
        ? css`
            flex-direction: column;
            width: ${createSize(size, units)};
        `
        : css`
            flex-direction: row;
            height: ${createSize(size, units)};
        `
    };
`;

export {
    Spacer
}
