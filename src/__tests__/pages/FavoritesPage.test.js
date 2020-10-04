import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FavoritesPage from '../../pages/FavoritesPage';

configure({adapter: new Adapter()});
describe('<FavoritesPage /> test', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = shallow(<FavoritesPage />);
    });
    
    it('Testing the correct rendering from the module', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('VideoPageProvider').length).toBe(1);
        expect(wrapper.find('FavoritesComponent').length).toBe(1);
    })
});