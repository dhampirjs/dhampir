import * as React from 'react';
import { ScrollerProps } from './API';
import styled, { css } from 'styled-components';
import { forwardRef, Ref } from 'react';
import { Column } from '../Column';


const Scroller = styled(
    forwardRef<HTMLDivElement, ScrollerProps & React.HTMLAttributes<HTMLDivElement>>(
        ({
             ...other
         }, ref: Ref<HTMLDivElement>) => {
            return <Column {...other} ref={ref}/>
        }
    ))`
    position: absolute;
    overflow: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

`;

export {
    Scroller
}
