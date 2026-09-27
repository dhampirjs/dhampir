import * as React from 'react';
import { AppLayoutProps, Column, Screen, Row } from '../../../components';
import { Area, useIsAreaVisible, RoutingArea } from '../../../routing';
import { Direction } from '../../API';

const AppLayout: React.FunctionComponent<AppLayoutProps> = () => {
    return (
        <Screen fullScreen={true} direction={Direction.VERTICAL}>
            {useIsAreaVisible(RoutingArea.TOP) && <Row>
                <Area area={RoutingArea.TOP} />
            </Row>}
            {useIsAreaVisible(RoutingArea.MENU) && <Row>
                <Area area={RoutingArea.MENU} />
            </Row>}
            <Row greedy={true} asGrid={true}>
                {useIsAreaVisible(RoutingArea.BODY_LEFT) &&
                <Column>
                    <Area area={RoutingArea.BODY_LEFT} />
                </Column>}
                <Column greedy={true}>
                    <Area area={RoutingArea.BODY_MAIN}/>
                </Column>
                {useIsAreaVisible(RoutingArea.BODY_RIGHT) && <Column>
                    <Area area={RoutingArea.BODY_RIGHT} />
                </Column>}
            </Row>
            {useIsAreaVisible(RoutingArea.BOTTOM) && <Row>
                <Area area={RoutingArea.BOTTOM} />
            </Row>}
        </Screen>
    );
};

export { AppLayout };
