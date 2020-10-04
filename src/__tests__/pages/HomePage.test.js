import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from '../../pages/HomePage';

configure({ adapter: new Adapter() });
describe('<HomePage /> test', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = shallow(<HomePage />);
    });

    it('Testing the correct rendering from the module', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('VideoPageProvider').length).toBe(1);
        expect(wrapper.find('HomeComponent').length).toBe(1);
    })
});