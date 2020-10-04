import React from 'react'
import { useUI } from '../../hooks/ui.hook';

jest.mock('../../hooks/ui.hook');

describe('UI Hook Test suit', () => {
    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    jest.spyOn(React, 'useCallback').mockImplementation(f => f());

    afterEach(() => {
        jest.clearAllMocks();
    });

    useUI.mockReturnValue({
        isLogOpened: false,
        isRegOpened: true,
        setLogState: jest.fn(() => {}),
        setRegState: jest.fn(() => {})
    });

    it('Using setRegState and SetLogStaate', () => {
        expect(useUI().isLogOpened).toBe(false);
        expect(useUI().isRegOpened).not.toBe(false);
        useUI().setLogState(false);
        expect(useUI().setLogState).toBeCalledTimes(1);
        expect(useUI().setRegState).toBeCalledTimes(0);
    })
});