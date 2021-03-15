import * as React from 'react';
import { AppLayoutProps, Column, Screen, Row } from '../../../components';
import { Area, isAreaVisible, RoutingArea } from '../../../routing';
import { Direction } from '../../API';

const AppLayout: React.FunctionComponent<AppLayoutProps> = (props) => {
    const {
        location,
    } = props;
    return (
        <Screen fullScreen={true} direction={Direction.VERTICAL}>
            {isAreaVisible(RoutingArea.TOP, location.pathname) && <Row>
                <Area area={RoutingArea.TOP} {...props}/>
            </Row>}
            {isAreaVisible(RoutingArea.MENU, location.pathname) && <Row>
                <Area area={RoutingArea.MENU} {...props}/>
            </Row>}
            <Row greedy={true} asGrid={true}>
                {isAreaVisible(RoutingArea.BODY_LEFT, location.pathname) &&
                <Column>
                    <Area area={RoutingArea.BODY_LEFT} {...props}/>
                </Column>}
                <Column greedy={true}>
                    <Area area={RoutingArea.BODY_MAIN}/>
                </Column>
                {isAreaVisible(RoutingArea.BODY_RIGHT, location.pathname) && <Column>
                    <Area area={RoutingArea.BODY_RIGHT} {...props}/>
                </Column>}
            </Row>
            {isAreaVisible(RoutingArea.BOTTOM, location.pathname) && <Row>
                <Area area={RoutingArea.BOTTOM} {...props}/>
            </Row>}
        </Screen>
    );
};

export { AppLayout };
