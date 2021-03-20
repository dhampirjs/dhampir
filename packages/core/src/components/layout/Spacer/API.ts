import { BoxProps } from '../Box';
import { Direction, Units } from '../../API';

export interface SpacerProps extends BoxProps {
    direction?: Direction;
    size?: number;
    space?: number;
    units?: Units;
    justifyContent?: string;
}
