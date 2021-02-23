import { RouteProps } from 'react-router';
import { StorageType } from '../../connectors';

export interface RootApplicationProps extends RouteProps {
    storageType?: StorageType;
}
