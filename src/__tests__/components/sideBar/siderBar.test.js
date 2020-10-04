import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideBar from '../../../components/sideBar/SideBarComponent';

configure({ adapter: new Adapter() });
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('<SideBar /> wrapper test', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    const onClose = jest.fn();
    const onItemClick = jest.fn();
    const props = {
        variant: 'temporary',
        open: true,
        onClose,
        onItemClick
    }
    useStateSpy.mockImplementation((init) => [init, setState]);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Tests the correct if it renders', () => {
        const wrapper = shallow(<SideBar {...props} />);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.text()).toMatch("Home");
        expect(wrapper.text()).toMatch("My Favorites");
    });

    it('Tests Links clicks', () => {
        const wrapper = shallow(<SideBar {...props} />);
        expect(wrapper.exists()).toBe(true);
        wrapper.find('#itemHome').simulate('click');
        expect(onItemClick).toBeCalled();
        wrapper.find('#itemFavorite').simulate('click');
        expect(onItemClick).toBeCalled();
    });
});