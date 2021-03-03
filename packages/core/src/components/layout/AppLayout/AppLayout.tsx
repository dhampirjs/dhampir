import * as React from 'react';
import { AppLayoutProps, BorderSide, Column, ColumnDecorator, LayoutList, LayoutListDirection, Row } from '../../../components';
import { Area, isAreaVisible, RoutingArea } from '../../../routing';

const AppLayout: React.FunctionComponent<AppLayoutProps> = ({ ...rest }) => {

    const {
        location,
    } = rest;
    return (
        <LayoutList fullScreen={true} direction={LayoutListDirection.VERTICAL}>
            {isAreaVisible(RoutingArea.HEADING, location.pathname) && <Row>
                <ColumnDecorator borderPosition={[BorderSide.BOTTOM]}>
                    <Area area={RoutingArea.HEADING} {...rest}/>
                </ColumnDecorator>
            </Row>}
            {isAreaVisible(RoutingArea.SUBHEADING, location.pathname) && <Row>
                <ColumnDecorator borderPosition={[BorderSide.BOTTOM]}>
                    <Area area={RoutingArea.SUBHEADING} {...rest}/>
                </ColumnDecorator>
            </Row>}
            <Row greedy={true} asGrid={true}>
                {isAreaVisible(RoutingArea.LEFT, location.pathname) &&
                <Column>
                    <ColumnDecorator borderPosition={[BorderSide.RIGHT]}>
                        <Area area={RoutingArea.LEFT} {...rest}/>
                    </ColumnDecorator>
                </Column>}
                <Column greedy={true}>
                    <ColumnDecorator>
                        <Area area={RoutingArea.MAIN}/>
                    </ColumnDecorator>
                </Column>
                {isAreaVisible(RoutingArea.RIGHT, location.pathname) && <Column>
                    <ColumnDecorator borderPosition={[BorderSide.LEFT]}>
                        <Area area={RoutingArea.LEFT} {...rest}/>
                    </ColumnDecorator>
                </Column>}
            </Row>
            {isAreaVisible(RoutingArea.FOOTER, location.pathname) && <Row>
                <ColumnDecorator borderPosition={[BorderSide.TOP]}>
                    <Area area={RoutingArea.FOOTER} {...rest}/>
                </ColumnDecorator>
            </Row>}
        </LayoutList>
    );
};

export { AppLayout };
