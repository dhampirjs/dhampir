import { compose, head, project as create } from 'ramda';
import { ALIAS, BRIEF, TYPE } from '../../constants';
import { Options } from 'yargs';
import { ArgumentOptions } from '../../actions/api';

export const createParameterOptions = compose(
    head,
    create<ArgumentOptions, Options>([
        ALIAS,
        BRIEF,
        TYPE,
    ])
);
