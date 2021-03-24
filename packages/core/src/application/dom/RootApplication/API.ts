import { RouteProps } from 'react-router';
import { StorageType } from '../../../storage';

export interface RootApplicationProps extends RouteProps {
    storageType?: StorageType;
}
