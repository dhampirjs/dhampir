import { StorageType } from '../../../storage';

export type RootApplicationProps = {
    storageType?: StorageType;
}

export type RootApplicationComponent<P extends RootApplicationProps> = (props: P) => JSX.Element
