import { RootApplicationComponent, RootApplicationProps } from './API';
import {useExtensionContext} from '../../../hooks';
import {RootArea} from '../../../routing';
import {ExtensionContext} from '../../../extensions';
import {ThemeConnector, StorageConnector, SkinConnector} from '../../../appearance/dom';

export const RootApplication: RootApplicationComponent<RootApplicationProps> = ({ storageType = 'query'}) => {
    const {
        Provider: ExtensionProvider
    } = ExtensionContext;

    const extensionContext = useExtensionContext();

    return <StorageConnector storageType={storageType}>
        <ExtensionProvider value={extensionContext}>
            <SkinConnector>
                <ThemeConnector>
                    <RootArea/>
                </ThemeConnector>
            </SkinConnector>
        </ExtensionProvider>
    </StorageConnector>
};
