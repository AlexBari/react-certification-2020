import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UIProvider } from '../../providers/UIProvider';

configure({ adapter: new Adapter() });
describe('<UIProvider /> provider test', () => {
    let provider;
    beforeAll(() => {
        provider = shallow(<UIProvider />);
    });
    it('Testing the correct rendering from the module', () => {
        expect(provider.exists()).toBe(true);
        expect(provider.props()).not.toBeUndefined();
    });
    it('Checking if the context exists through the provider',() => {
        expect(provider.props()).not.toBeUndefined();
        expect(provider.props().value).not.toBeUndefined();
        expect(provider.props().value['isLogOpened']).toBe(false);
        expect(provider.props().value['isRegOpened']).toBe(false);
        expect(provider.props().value['setLogState']).not.toBeUndefined();
        expect(provider.props().value['setRegState']).not.toBeUndefined();
    });
});