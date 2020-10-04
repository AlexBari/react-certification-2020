import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeComponent from '../../../components/home/homeComponent';
import { useVideoContext } from '../../../providers/VideoPageProvider';

jest.mock('../../../providers/VideoPageProvider');

configure({ adapter: new Adapter() });
describe('<HomeComponent /> provider test', () => {

    useVideoContext
        .mockReturnValueOnce({
            state: {
                videos: [],
                selectedVideo: null,
                isFavorite: false,
                favoriteList: [],
                token: '',
                searchPerformed: ''
            },
            saveHomeState: jest.fn()
        }).mockReturnValueOnce({
            state: {
                videos: [],
                selectedVideo: null,
                isFavorite: false,
                favoriteList: [],
                token: '',
                searchPerformed: ''
            },
            saveHomeState: jest.fn()
        }).mockReturnValueOnce({
            state: {
                videos: ['video1'],
                selectedVideo: null,
                isFavorite: false,
                favoriteList: [],
                token: '',
                searchPerformed: ''
            },
            saveHomeState: jest.fn()
        })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Tests the correct if it renders', () => {
        const provider = shallow(<HomeComponent />);
        expect(provider.exists()).toBe(true);
    });

    it('Tests the VideoDetail and VideoList if have novideos on the array', () => {
        const provider = shallow(<HomeComponent />);
        expect(provider.find('VideoDetail').length).toBe(0);
        expect(provider.text()).toMatch("no results");
    });

    global.scroll = jest.fn( () => console.log('scrolled'))

    it('Tests the childs were renders correctly rendered when videos > 0', () => {
        const provider = shallow(<HomeComponent />);
        expect(provider.exists()).toBe(true);
        expect(provider.find('VideoDetail').length).toBe(1);
        expect(provider.find('InfiniteScroll').length).toBe(1);
    });
});