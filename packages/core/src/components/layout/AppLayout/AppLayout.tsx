import * as React from 'react';
import { AppLayoutProps, Column, Screen, Row } from '../../../components';
import { Area, isAreaVisible, RoutingArea, DhampirRouteHandle } from '../../../routing';
import { Direction } from '../../API';
import { useMatches, UIMatch } from 'react-router';

const AppLayout: React.FunctionComponent<AppLayoutProps> = () => {
    const matches = useMatches() as UIMatch<unknown, DhampirRouteHandle>[];

    return (
        <Screen fullScreen={true} direction={Direction.VERTICAL}>
            {isAreaVisible(RoutingArea.TOP, matches) && <Row>
                <Area area={RoutingArea.TOP} />
            </Row>}
            {isAreaVisible(RoutingArea.MENU, matches) && <Row>
                <Area area={RoutingArea.MENU} />
            </Row>}
            <Row greedy={true} asGrid={true}>
                {isAreaVisible(RoutingArea.BODY_LEFT, matches) &&
                <Column>
                    <Area area={RoutingArea.BODY_LEFT} />
                </Column>}
                <Column greedy={true}>
                    <Area area={RoutingArea.BODY_MAIN}/>
                </Column>
                {isAreaVisible(RoutingArea.BODY_RIGHT, matches) && <Column>
                    <Area area={RoutingArea.BODY_RIGHT} />
                </Column>}
            </Row>
            {isAreaVisible(RoutingArea.BOTTOM, matches) && <Row>
                <Area area={RoutingArea.BOTTOM} />
            </Row>}
        </Screen>
    );
};

export { AppLayout };
