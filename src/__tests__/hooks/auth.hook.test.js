import React from 'react'
import { useProvideAuth } from '../../hooks/auth.hook';

jest.mock('../../hooks/auth.hook')

describe('Auth Hook Test suit', () => {
    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());

    afterEach(() => {
        jest.clearAllMocks();
    });

    useProvideAuth.mockReturnValue({
        user: {
            displayName: 'I am  user',
            email: 'test@user.com',
            darkMode: false,
            favoriteList: [],
            photoURL: '',
        },
        loginSession: jest.fn(() =>
            Promise.resolve({
                displayName: 'I am the test user',
                email: 'test@user.com',
                darkMode: false,
                favoriteList: [],
                photoURL: ''
            })
        ),
        registerUser: jest.fn(() => Promise.resolve({
            displayName: 'Alex Barajas',
            email: 'test2@mail.com',
            darkMode: false,
            favoriteList: [],
            photoURL: ''
        })),
        logoutSession: jest.fn(() => Promise.resolve({
        }))
    });

    it('Sign in with email and password - Correct', async () => {
        const user = await useProvideAuth().loginSession('alex.barajas@mail.com', 'hola1234');
        expect(user).not.toBeUndefined();
        expect(typeof user.displayName).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(typeof user.favoriteList).toBe('object');
        expect(typeof user.darkMode).toBe('boolean');
        expect.assertions(5);

    });

    it('Sign in with email and password - Incorrect', async () => {
        try {
            useProvideAuth()
                .loginSession
                .mockRejectedValue({
                    code: 'auth/wrong-password',
                    message: 'There is a problem with the credentials provided'
                });
            await useProvideAuth().loginSession('alex.barajas@mail.com', 'hola23');
        } catch (error) {
            expect(error.code).toBe('auth/wrong-password');
        }
    });

    it('Sign Up with email and password - Correct', async () => {
        const user = await useProvideAuth().registerUser('test2@mail.com', 'hola1234', 'Alex Barajas');
        expect(user).not.toBeUndefined();
        expect(user.displayName).toEqual('Alex Barajas');
        expect(user.email).toBe('test2@mail.com');
        expect(typeof user.favoriteList).toBe('object');
        expect(user.darkMode).toBe(false);
    });

    it('Sign up with email and password - Incorrect', async () => {
        try {
            useProvideAuth()
                .registerUser
                .mockRejectedValue({
                    code: 'Problem with registration',
                    message: 'There is a problem with the credentials provided'
                });
            await useProvideAuth().registerUser('test2@mail.com', 'hola1234', 'Alex Barajas');
        } catch (error) {
            expect(error.code).toBe('Problem with registration');
        }
    });
});