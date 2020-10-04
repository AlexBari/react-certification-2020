import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { VideoPageProvider } from '../../providers/VideoPageProvider';

configure({ adapter: new Adapter() });
describe('<UIProvider /> provider test', () => {
    let provider;
    beforeAll(() => {
        provider = shallow(<VideoPageProvider />);
    });
    it('Testing the correct rendering from the module', () => {
        expect(provider.exists()).toBe(true);
        expect(provider.props()).not.toBeUndefined();
    });
    it('Checking if the context exists through the provider',() => {
        expect(provider.props()).not.toBeUndefined();
        expect(provider.props().value).not.toBeUndefined();
        expect(provider.props().value['state']).not.toBeUndefined();
        expect(provider.props().value['saveHomeState']).not.toBeUndefined();
        expect(provider.props().value.state.videos).toStrictEqual([]);
    });
});