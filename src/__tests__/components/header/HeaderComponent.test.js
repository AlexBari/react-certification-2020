import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderComponent from '../../../components/header/HeaderComponent';

configure({ adapter: new Adapter() });

describe('<HeaderComponent /> provider test', () => {
    let handleCloseSession = jest.fn(() => {});
    let handleLogOpen = jest.fn(() => {});
    let handleRegOpen = jest.fn(() => {});
    
    it('Tests the correct rendering from the module and its childrens', () => {
        const provider = shallow(<HeaderComponent />);
        expect(provider.exists()).toBe(true);
    });

    it('Tests login/register buttons when use is not logged in', () => {
        const props = { isLoggedIn: false, handleLogOpen, handleRegOpen }
        const provider = mount(<HeaderComponent {...props}/>);
        expect(provider.exists()).toBe(true);
        expect(provider.prop('isLoggedIn')).toBe(false);
        expect(provider.find('#loginBtn').exists()).toBe(true);
        provider.find('#loginBtn').at(1).simulate('click');
        expect(handleLogOpen.mock.calls.length).toEqual(1);
        expect(provider.find('#registerBtn').exists()).toBe(true);
        provider.find('#registerBtn').at(1).simulate('click');
        expect(handleRegOpen.mock.calls.length).toEqual(1);
    });

    it('Tests login/register buttons when use is logged in', () => {
        const props = { isLoggedIn: true, handleCloseSession }
        const provider = mount(<HeaderComponent {...props}/>);
        expect(provider.exists()).toBe(true);
        expect(provider.prop('isLoggedIn')).toBe(true);
        expect(provider.find('#logoutBtn').exists()).toBe(true);
        provider.find('#logoutBtn').at(1).simulate('click');
        expect(handleLogOpen.mock.calls.length).toEqual(1);
    });
});