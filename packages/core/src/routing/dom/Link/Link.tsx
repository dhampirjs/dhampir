import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import * as React from 'react';
import { ColorScope, ColorScopeActions, ColorScopeTypography } from '../../../appearance';


const createColor = (active = false) => (
    {
        theme
    }
) => {
    const scope = theme?.colors?.[ColorScope.TYPOGRAPHY];
    const color = active ? ColorScopeTypography.LINK_HOVER : ColorScopeTypography.LINK;
    return `${scope[color] || 'default'}`;
}
const createActiveBgColor = (
    {
        theme
    }
) => {
    const scope = theme?.colors?.[ColorScope.ACTIONS];
    const color = ColorScopeActions.COMMON;
    return `${scope[color] || 'default'}`;
}

export const Link = styled(NavLink)`
    display: flex;
    align-items: center;
    color: ${createColor()};

    &.${({ activeClassName }) => activeClassName} {
        background-color: ${createActiveBgColor};
        color: ${createColor(true)};
    }
`;
