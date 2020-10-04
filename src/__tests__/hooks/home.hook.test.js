import React from 'react'
import { useHomeProvider } from '../../hooks/home.hook';

jest.mock('../../hooks/home.hook');

describe('Home Hook Test suit', () => {
    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    jest.spyOn(React, 'useCallback').mockImplementation(f => f());

    afterEach(() => {
        jest.clearAllMocks();
    });

    useHomeProvider.mockReturnValue({
        state: {
            videos: ['video1'],
            selectedVideo: null,
            isFavorite: false,
            favoriteList: [],
            token: '',
            searchPerformed: 'random'
        },
        saveHomeState: jest.fn(() => {})
    });

    it('Using SaveHomeState and returting state', () => {
        const home = useHomeProvider().state;
        expect(home.videos[0]).toBe('video1');
        expect(home.isFavorite).toBe(false);
        useHomeProvider().saveHomeState({ token: 'Test'});
        expect(useHomeProvider().saveHomeState).toBeCalledTimes(1);
    })
});