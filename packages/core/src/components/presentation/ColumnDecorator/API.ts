import { BoxProps } from '../../layout';
import { PresentationComponentProps } from '../../../appearance/API';

export enum BorderSide {

    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    ALL_OVER,
}

export interface ColumnDecoratorProps extends BoxProps, PresentationComponentProps {
    borderPosition?: BorderSide[],
    width?: number,
    units?: string,
}
