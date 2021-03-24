import { prop } from 'ramda';
import { NAME } from '../../constants';

export const getParameterName = prop<string>(NAME);
