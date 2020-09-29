import Auth from '../../__mocks__/user';
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ProvideAuth, useAuth } from '../../hooks/auth.hook';

describe('Auth Hook Test suit', () => {
    it('Sign in with email and password', () => {
        const contextCallback = jest.fn();
        const { props } = render(
            <ProvideAuth />
        );
        console.log(props);
    });
});