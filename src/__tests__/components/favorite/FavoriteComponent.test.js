import React, { useState as useStateMock } from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useAuth } from '../../../providers/AuthProvider';
import FavoritesComponent from '../../../components/favorite/FavoritesComponent';

configure({ adapter: new Adapter() });
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('<FavoritesComponent /> provider test', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Tests the correct if it renders', () => {
        const provider = shallow(<FavoritesComponent />);
        expect(provider.exists()).toBe(true);
    });
    it('Tests the VideoDetail and VideoList if have videos on the array', () => {
        useStateMock.mockImplementation(init => [true, setState]);
        const provider = shallow(<FavoritesComponent />);
        expect(provider.find('VideoDetail').length).toBe(1);
    });

    it('Tests the VideoDetail and VideoList if have novideos on the array', () => {
        useStateMock.mockImplementation(init => [false, setState]);
        const provider = shallow(<FavoritesComponent />);
        expect(provider.find('VideoDetail').length).toBe(0);
        expect(provider.text()).toMatch("no favorites");
    });
});