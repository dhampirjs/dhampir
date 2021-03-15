import * as React from 'react';
import { ScreenProps } from './API';
import styled, { css } from 'styled-components';
import { Box } from '../Box';
import { forwardRef, Ref } from 'react';
import { Direction } from '../../API';

const Screen = styled(
    forwardRef<HTMLDivElement, ScreenProps & React.HTMLAttributes<HTMLDivElement>>(
        ({
             fullScreen,
             ...other
         }, ref: Ref<HTMLDivElement>) => {
            return <Box {...other} ref={ref}/>
        }
    ))`
    display: flex;
    ${({ fullScreen }) => fullScreen && css`
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    `};

    ${({ direction = Direction.HORIZONTAL }) => {
        return (direction === Direction.VERTICAL) ? css`
            flex-direction: column;
        ` : css`
            flex-direction: row;
        `
    }
    }`;

export {
    Screen
}
