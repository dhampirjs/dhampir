import { DetailedHTMLProps, HTMLAttributes } from "react";

export type BoxProps = {
    greedy?: boolean;
    holdsAbsolute?: boolean;
    alignItems?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
