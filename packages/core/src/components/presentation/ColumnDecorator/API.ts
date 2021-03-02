import { BoxProps } from '../../layout/Box';

export enum DecoratorPosition {
    LEFT,
    RIGHT,
    TOP,
    BOTTOM,
    ALL,
}

export interface ColumnDecoratorProps extends BoxProps {
    position?: DecoratorPosition
}
