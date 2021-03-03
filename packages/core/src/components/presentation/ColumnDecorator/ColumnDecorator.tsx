import * as React from 'react';
import { ColumnDecoratorProps, BorderSide } from './API';
import { forwardRef } from 'react';
import styled from 'styled-components';

import { Box } from '../../layout';
import { ColorScope, ColorScopeContainer } from '../../../appearance';
import { reduce } from 'ramda';

export type CalculateBorderFnProps = Partial<ColumnDecoratorProps>;

const calculateBorder: (props: CalculateBorderFnProps) => string = (
    {
        borderPosition = [],
        width = 1,
        units = 'px'
    }) => {

    if(borderPosition.includes(BorderSide.ALL_OVER)) {
        return `${width}${units}`;
    }

    const createCssValue = reduce<BorderSide, string[]>((acc, elem) => {
        acc[elem] = `${width}${units}`;
        return acc;
    }, ['0', '0', '0', '0']);

    const valueSet = createCssValue(borderPosition);
    return `${valueSet.join(' ')}`;
};

const ColumnDecorator = styled(
    forwardRef<HTMLDivElement, ColumnDecoratorProps & React.HTMLAttributes<HTMLDivElement>>((
        {
            borderPosition,
            width,
            units,
            ...rest // these are passed deeper
        }, ref) => {
        return <Box {...rest} ref={ref}/>
    }))`
    display: flex;
    flex: 1 1 auto;
    min-width: 240px;
    border-color: ${({ theme }) => theme?.[ColorScope.CONTAINER]?.[ColorScopeContainer.BORDER] || 'none'};
    border-style: solid;
    border-width: ${({ borderPosition }) => calculateBorder({ borderPosition: borderPosition! })};
    align-items: stretch;
    justify-content: space-between;
`;

export {
    ColumnDecorator
}
