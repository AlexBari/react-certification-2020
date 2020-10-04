import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProvideAuth } from '../../providers/AuthProvider';

configure({ adapter: new Adapter() });
describe('<ProvideAuth /> provider test', () => {
    let provider;
    beforeAll(() => {
        provider = shallow(<ProvideAuth />);
    });
    it('Testing the correct rendering from the module', () => {
        expect(provider.exists()).toBe(true);
        expect(provider.props()).not.toBeUndefined();
    });
    it('Checking if the context exists through the provider',() => {
        expect(provider.props()).not.toBeUndefined();
        expect(provider.props().value).not.toBeUndefined();
        expect(provider.props().value['user']).toBeNull();
        expect(provider.props().value['loginSession']).not.toBeUndefined();
    });
});