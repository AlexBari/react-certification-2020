import PrivateRoute from '../../components/privateRouter';
import React from 'react';
import { Route, Redirect } from 'react-router';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';

configure({ adapter: new Adapter() });
describe('<PrivateRoute/> test suite', () => {

    it('redirects unauthenticated users to home', () => {
        const { wrapper } = setup();
        const ComponentToRender = wrapper.prop('render');
        const redirectWrapper = shallow(<ComponentToRender location="/favorites" />);
        expect(redirectWrapper.props()).toEqual({
            to: {
                pathname: "/",
                state: {
                    from: "/favorites",
                }
            }
        });
    });

    it('Displays passed component to authenticated users', () => {
        const { wrapper, props } = setup({ authed: true });
        const ComponentToRender = wrapper.prop('render');
        const componentWrapper = shallow(<ComponentToRender location="/favorites" />);
        expect(componentWrapper.is(props.component)).toBe(true);
        expect(componentWrapper.props()).toEqual({
            location: '/favorites'
        });
    });
});

function setup(customProps) {
    const props = {
        component: () => <h1>Test Component - Favorites</h1>,
        authed: false,
        ...customProps
    };

    const wrapper = shallow(<PrivateRoute {...props} />);

    return {
        wrapper,
        props
    }
}
