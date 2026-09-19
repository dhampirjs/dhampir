import * as React from 'react';
import { AppLayoutProps, Column, Screen, Row } from '../../../components';
import { Area, isAreaVisible, RoutingArea } from '../../../routing';
import { Direction } from '../../API';
import { useLocation } from 'react-router';

const AppLayout: React.FunctionComponent<AppLayoutProps> = () => {
    const location = useLocation();
    return (
        <Screen fullScreen={true} direction={Direction.VERTICAL}>
            {isAreaVisible(RoutingArea.TOP, location.pathname) && <Row>
                <Area area={RoutingArea.TOP} />
            </Row>}
            {isAreaVisible(RoutingArea.MENU, location.pathname) && <Row>
                <Area area={RoutingArea.MENU} />
            </Row>}
            <Row greedy={true} asGrid={true}>
                {isAreaVisible(RoutingArea.BODY_LEFT, location.pathname) &&
                <Column>
                    <Area area={RoutingArea.BODY_LEFT} />
                </Column>}
                <Column greedy={true}>
                    <Area area={RoutingArea.BODY_MAIN}/>
                </Column>
                {isAreaVisible(RoutingArea.BODY_RIGHT, location.pathname) && <Column>
                    <Area area={RoutingArea.BODY_RIGHT} />
                </Column>}
            </Row>
            {isAreaVisible(RoutingArea.BOTTOM, location.pathname) && <Row>
                <Area area={RoutingArea.BOTTOM} />
            </Row>}
        </Screen>
    );
};

export { AppLayout };
