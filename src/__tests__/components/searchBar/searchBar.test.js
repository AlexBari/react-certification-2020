import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBarComponent from '../../../components/searchBar/SearchBarComponent';

configure({ adapter: new Adapter() });
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('<SearchBarComponent /> wrapper test', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    const handleFormSubmit = jest.fn();
    const onChange = jest.fn(() => { console.log('changed') });
    const props = {
        classes: {
        },
        handleFormSubmit
    }
    useStateSpy.mockImplementation((init) => [init, setState]);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Tests the correct if it renders', () => {
        const wrapper = shallow(<SearchBarComponent />);
        expect(wrapper.exists()).toBe(true);
    });

    it('Tests search send', () => {
        const wrapper = mount(<SearchBarComponent {...props} />);
        expect(wrapper.exists()).toBe(true);
        wrapper.find('form').simulate('submit', { preventDefault() { } });
        expect(handleFormSubmit).toHaveBeenCalledTimes(1);
    });

});