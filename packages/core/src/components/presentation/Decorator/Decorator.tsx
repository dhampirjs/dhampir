import * as React from 'react';
import { forwardRef } from 'react';
import { BorderSide, DecoratorProps } from './API';
import styled from 'styled-components';

import { Box } from '../../layout';
import { ColorScope, ColorScopeContainer } from '../../../appearance';
import { reduce } from 'ramda';

const calculateFill: (props: DecoratorProps) => string = (
    {
        fill = false,
        fillColor = undefined,
        theme = undefined,
    }
) => {
    return fill && (fillColor || theme?.colors?.[ColorScope.CONTAINER]?.[ColorScopeContainer.FILL_REGULAR]) || 'unset';
};

const calculateBorderColor: (props: DecoratorProps) => string = ({
    theme,
    borderColor,
}) => {
    return borderColor || theme?.colors?.[ColorScope.CONTAINER]?.[ColorScopeContainer.BORDER] || 'unset'
};
const calculateBorder: (props: DecoratorProps) => string = (
    {
        borderPosition = [],
        borderWidth = 0,
        borderColor,
        units = 'px',
    }) => {
    if (borderColor && !borderWidth) {
        borderWidth = 1;
    }

    if (borderPosition.includes(BorderSide.ALL_OVER)) {
        return `${borderWidth}${units}`;
    }

    const createCssValue = reduce<BorderSide, string[]>((acc, elem) => {
        acc[elem] = `${borderWidth}${units}`;
        return acc;
    }, ['0', '0', '0', '0']);

    const valueSet = createCssValue(borderPosition);
    return `${valueSet.join(' ')}`;
};

const Decorator = styled(
    forwardRef<HTMLDivElement, DecoratorProps & React.HTMLAttributes<HTMLDivElement>>((
        {
            borderPosition,
            borderColor,
            borderWidth,
            units,
            fillColor,
            fill,
            ...rest // these are passed deeper
        }, ref) => {
        return <Box {...rest} ref={ref}/>
    }))`
    position: relative;
    display: flex;
    flex: 1 1 auto;
    background-color: ${calculateFill};
    border-style: solid;
    border-width: ${calculateBorder};
    border-color: ${calculateBorderColor};
    align-items: stretch;
    justify-content: space-between;
`;

export {
    Decorator
}
