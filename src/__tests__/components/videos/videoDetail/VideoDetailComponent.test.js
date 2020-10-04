import React from 'react';
import { shallow, mount, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoDetail from '../../../../components/video/videoDetail/VideoDetailComponent';
import { useVideoContext } from '../../../../providers/VideoPageProvider';
import { useAuth } from '../../../../providers/AuthProvider';

jest.mock('../../../../providers/VideoPageProvider');
jest.mock('../../../../providers/AuthProvider');
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

configure({ adapter: new Adapter() });
describe('<VideoDetail /> wrapper test', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    useAuth
        .mockReturnValue({
            user: {
                displayName: 'I am  user',
                email: 'test@user.com',
                darkMode: false,
                favoriteList: [],
                photoURL: '',
            },
            updateUser: jest.fn()
        });

    useVideoContext
        .mockReturnValue({
            state: {
                videos: [
                    {
                        "kind": "youtube#searchResult",
                        "etag": "I1sC2n28ejbqP1ybQOcliwoYAGM",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "a5uQMwRMHcs"
                        },
                        "snippet": {
                            "publishedAt": "2013-12-06T08:00:01Z",
                            "channelId": "UCKHFvArwRwQU2VbRjMpaVGw",
                            "title": "Daft Punk ft. Julian Casablancas - Instant Crush (Official Video)",
                            "description": "Daft Punk's official music video for 'Instant Crush' ft. Julian Casablancas. Click to listen to Daft Punk on Spotify: http://smarturl.it/DaftPunkSpotify?IQ... As featured ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/a5uQMwRMHcs/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/a5uQMwRMHcs/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/a5uQMwRMHcs/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "DaftPunkVEVO",
                            "liveBroadcastContent": "none",
                            "publishTime": "2013-12-06T08:00:01Z"
                        }
                    },],
                selectedVideo:
                {
                    "kind": "youtube#searchResult",
                    "etag": "I1sC2n28ejbqP1ybQOcliwoYAGM",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "a5uQMwRMHcs"
                    },
                    "snippet": {
                        "publishedAt": "2013-12-06T08:00:01Z",
                        "channelId": "UCKHFvArwRwQU2VbRjMpaVGw",
                        "title": "Daft Punk ft. Julian Casablancas - Instant Crush (Official Video)",
                        "description": "Daft Punk's official music video for 'Instant Crush' ft. Julian Casablancas. Click to listen to Daft Punk on Spotify: http://smarturl.it/DaftPunkSpotify?IQ... As featured ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/a5uQMwRMHcs/default.jpg",
                                "width": 120,
                                "height": 90
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/a5uQMwRMHcs/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/a5uQMwRMHcs/hqdefault.jpg",
                                "width": 480,
                                "height": 360
                            }
                        },
                        "channelTitle": "DaftPunkVEVO",
                        "liveBroadcastContent": "none",
                        "publishTime": "2013-12-06T08:00:01Z"
                    }
                },
                isFavorite: false,
                favoriteList: [],
                token: '',
                searchPerformed: ''
            },
            saveHomeState: jest.fn()
        });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Tests the correct if it renders', () => {
        const wrapper = shallow(<VideoDetail />);
        expect(wrapper.exists()).toBe(true);
    });

    it('Tests when the video exist and is selected', () => {
        const wrapper = mount(<VideoDetail />);
        expect(wrapper.exists()).toBe(true);
        wrapper.find('button').simulate('click');
        expect(useVideoContext().saveHomeState).toBeCalled();
        expect(useAuth().updateUser).toBeCalled();
        expect(wrapper.text()).toMatch(/Daft Punk/);
    });

});