import { assoc, reduce } from 'ramda';
import { getParameterName } from './getParameterName';
import { createParameterOptions } from './createParameterOptions';
import { ArgumentOptions, OptionsDictionary } from '../../actions/api';

export const createConfig = reduce<ArgumentOptions, OptionsDictionary>(
    (acc, item) => assoc(getParameterName<string>(item), createParameterOptions([item]), acc),
    {},
);

