import { FunctionComponent } from 'react';
import { RootApplicationProps } from './API';
import { useExtensionContext } from '../../../hooks';
import { RootArea } from '../../../routing';
import { ExtensionContext } from '../../../extensions';
import { ThemeConnector, StorageConnector, SkinConnector } from '../../../appearance/dom';
import { StorageType } from '../../../storage';

export const RootApplication: FunctionComponent<RootApplicationProps> = ({ storageType = StorageType.REDUX }) => {
    const {
        Provider: ExtensionProvider
    } = ExtensionContext;

    const extensionContext = useExtensionContext();

    return <ExtensionProvider value={extensionContext}>
        <StorageConnector storageType={storageType}>
            <SkinConnector>
                <ThemeConnector>
                    <RootArea/>
                </ThemeConnector>
            </SkinConnector>
        </StorageConnector>
    </ExtensionProvider>
};
