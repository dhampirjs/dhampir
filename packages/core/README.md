# Dhampir Core

Javascript library that includes features needed for building Web applications. Such as:

* Enhanced Routing
* Extensibility
* Appearance
* Components Library
* Storage
* Feature Toggling

## Enhanced Routing Feature

Introduces several new concepts such as *Root Route*, *Descendant Route*, *Routing Area*, *Area Rendering*.

**Root Route** is a *Routing Rule* that describes the top level route, literally route that is a first part of the path.

**Descendant Route** is a Routing Rule that is a child of the *Root Route* or another *Descendant Route*. Path of the child route
will be included in resulting route url. For example if *Root Route* path is `/store`, and it has Descendant Route
path `/checkout` then resulting path is `/store/checkout`.

**Routing Area** is a container in the layout of the page where *Area Renderings* are rendered. What does this mean? Routing Areas
are defined within certain Route. When path of the url matches the Route then all Area Renderings associated with this route will
be rendered in Rendering Area with id that the rule contain.

For example:

1. When registering Root Route.

```typescript
registerRootRouting({
    id: 'manage',
    path: "/manage",
    component: Layout,
    renderings: [
        {
            area: RoutingArea.TOP,
            component: Header,
        },
        {
            area: RoutingArea.TOP_LEFT,
            component: Logo
        },
        {
            area: RoutingArea.TOP_CENTER,
            // We are using `exact={true}` to render it only when route matches exactly
            exact: true,
            component: MainMenu
        },
    ]
});

```
>In example above if route matches `/manage`, then `Layout` component will render `Header` in Rendering Area with
name `Routing.TOP`, `Logo` component in Rendering Area with name `Routing.TOP_LEFT`, `MainMenu` component in Rendering Area with
name `Routing.TOP_CENTER`.

2. When registering Root Route, within Descendant Route.

```typescript
registerRootRouting({
    id: 'manage',
    path: "/manage",
    component: Layout,
    routes: [
        {
            path: '/products',
            rendering: [
                {
                    exact: true,
                    area: RoutingArea.BODY_LEFT,
                    component: LeftBar,
                },
                {
                    area: RoutingArea.MENU_LEFT,
                    component: Nav,
                },
                {
                    area: RoutingArea.BODY_MAIN,
                    component: Page,
                },
            ],
            navigation: {
                label: 'Manage Products',
            },
        },
    ]
});
```
>In example above if route matches `/manage/products`, then `LeftBar` component will be rendered in Rendering Area with name `Routing.BODY_LEFT`, `Nav` component - in Rendering Area with name `Routing.MENU_LEFT`, `Page` component - in Rendering Area with
name `Routing.BODY_MAIN`.
3. When extending Descendant Route.

```typescript jsx
extendRoute(['/manage', '/products'], {
    path: '/list',
    rendering: [
        {
            area: RoutingArea.BODY_LEFT,
            render: () => <div>Product List</div>
        },
        {
            area: RoutingArea.BODY_MAIN,
            render: () => <div>Product Details</div>
        },
    ],
    navigation: {
        label: 'Product List'
    }
});
```
>In example above if route matches `/manage/products/list`, then `render` function will be executed in order to render content in Rendering Area with name `Routing.BODY_LEFT`, the same will happen in Rendering Area with name `RoutingArea.BODY_MAIN`.

`Layout` component contains Rendering Areas represented with `Area` component. Implementation may be different.

```typescript jsx
import * as React from 'react';
import { AppLayoutProps, Column, Screen, Row } from '../../../components';
import { Area, isAreaVisible, RoutingArea } from '../../../routing';
import { Direction } from '../../API';
import { useLocation } from 'react-router';

const Layout: React.FunctionComponent<AppLayoutProps> = () => {
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

export { Layout };
```

> Note: Rendering Area name just a string, string enum `RoutingArea` is used for convenience.

**Area Rendering** is a part of the *Routing Rule* that contains identifier or name of the *Area* and function or component that *
Routing Feature* will render to that Area.

## Extensibility

In progress.

## Appearance

This feature allows user to do the following:

* register custom *Color Themes*;
* inject theme colors to individual component;
* develop custom components that use *Color Theme*;
* use additional API to work with *Themes*, use them, edit them, select between them;

## Components Library

Contains components that are a generic layout building blocks. They may be used for building more complex components. Support
using *Color Themes*.

## Storage

Allows user to configure which data storage to use. *Dhampir Core* supports Redux and React Query OOTB.

## Feature Toggling

In progress.

## Getting Started
