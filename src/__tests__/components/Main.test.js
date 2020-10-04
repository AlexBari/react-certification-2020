import React from 'react';
import { shallow, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../../components/Main';
import renderer from 'react-test-renderer';
import { useAuth } from '../../providers/AuthProvider';

jest.mock('../../providers/AuthProvider');

configure({ adapter: new Adapter() });
describe('<Main /> provider test', () => {
    useAuth.mockReturnValue({
        user: {
            displayName: 'I am  user',
            email: 'test@user.com',
            darkMode: false,
            favoriteList: [],
            photoURL: '',
        }
    });
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('Testing the correct rendering from its childrens', () => {
        const provider = shallow(<Main variant='temporary' />);
        expect(provider.exists()).toBe(true);
        expect(provider.props()).not.toBeUndefined();
        expect(provider.find('HeaderComponent').length).toBe(1);
        expect(provider.find('HeaderComponent').props().isLoggedIn).toBe(false);
        expect(provider.find('SideBar').length).toBe(1);
        expect(provider.find('SideBar').props().open).toBe(false);
        expect(provider.find('SideBar').props().variant).toBe('temporary');
        expect(provider.find('LoginDialog').props().isOpened).toBe(false);
        expect(provider.find('RegisterDialog').props().isOpened).toBe(false);
        expect(provider.find('PrivateRoute').length).toBe(1);
    });
});