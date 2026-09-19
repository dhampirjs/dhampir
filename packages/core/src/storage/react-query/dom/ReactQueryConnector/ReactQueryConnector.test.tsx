/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ReactQueryConnector } from './ReactQueryConnector';

describe('[ReactQueryConnector] component', () => {
    test('renders children under React 19 despite react-query only declaring peer support up to React 18', () => {
        render(
            <ReactQueryConnector>
                <div>Connected</div>
            </ReactQueryConnector>
        );

        expect(screen.getByText('Connected')).toBeTruthy();
    });
});
