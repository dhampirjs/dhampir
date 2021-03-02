import * as React from 'react';
import {
    AppLayoutProps,
    Column,
    ColumnDecorator,
    DecoratorPosition,
    LayoutList,
    LayoutListDirection,
    Row
} from '../../../components';
import { RoutingArea, Area, isAreaVisible } from '../../../routing';

const AppLayout: React.FunctionComponent<AppLayoutProps> = ({ ...rest }) => {

    const {
        location,
    } = rest;
    return (
        <LayoutList fullScreen={true} direction={LayoutListDirection.VERTICAL}>
            {isAreaVisible(RoutingArea.HEADING, location.pathname) && <Row>
                <ColumnDecorator position={DecoratorPosition.BOTTOM}>
                    <Area area={RoutingArea.HEADING} {...rest}/>
                </ColumnDecorator>
            </Row>}
            {isAreaVisible(RoutingArea.SUBHEADING, location.pathname) && <Row>
                <ColumnDecorator position={DecoratorPosition.BOTTOM}><Area area={RoutingArea.SUBHEADING} {...rest}/></ColumnDecorator>
            </Row>}
            <Row greedy={true} asGrid={true}>
                {isAreaVisible(RoutingArea.LEFT, location.pathname) &&
                <Column>
                    <ColumnDecorator position={DecoratorPosition.LEFT}><Area area={RoutingArea.LEFT} {...rest}/></ColumnDecorator>
                </Column>}
                <Column greedy={true}>
                    <ColumnDecorator><Area area={RoutingArea.MAIN}/></ColumnDecorator>
                </Column>
                {isAreaVisible(RoutingArea.RIGHT, location.pathname) && <Column>
                    <ColumnDecorator position={DecoratorPosition.RIGHT}><Area area={RoutingArea.RIGHT} {...rest}/></ColumnDecorator>
                </Column>}
            </Row>
            {isAreaVisible(RoutingArea.FOOTER, location.pathname) && <Row>
                <ColumnDecorator position={DecoratorPosition.TOP}><Area area={RoutingArea.FOOTER} {...rest}/></ColumnDecorator>
            </Row>}
        </LayoutList>
    );
};

export { AppLayout };
