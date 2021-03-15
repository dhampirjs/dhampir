import { BoxProps } from '../../layout';
import { PresentationComponentProps } from '../../../appearance/API';

export enum BorderSide {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    ALL_OVER,
}

export interface DecoratorProps extends BoxProps, PresentationComponentProps {
    borderPosition?: BorderSide[],
    fill?: boolean;
    fillColor?: string;
    borderWidth?: number,
    borderColor?: string;
    units?: string,
}
