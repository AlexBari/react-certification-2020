import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useVideoContext } from '../../../providers/VideoPageProvider';
import { useAuth } from '../../../providers/AuthProvider';
import RegisterDialog from '../../../components/registerDialog/RegisterDialog';

jest.mock('../../../providers/VideoPageProvider');
jest.mock('../../../providers/AuthProvider');
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

configure({ adapter: new Adapter() });
describe('<SearchBarComponent /> wrapper test', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
    const callbackState = jest.spyOn(React, 'useCallback')
    callbackState.mockImplementation(f => f());
    const handleClose = jest.fn();
    const props = { isOpened: true, handleClose };
    let wrapper;

    useAuth
        .mockReturnValue({
            user: {
                displayName: 'I am  user',
                email: 'test@user.com',
                darkMode: false,
                favoriteList: [],
                photoURL: '',
            },
            registerUser: jest.fn(() => Promise.resolve({
                displayName: 'Alex Barajas',
                email: 'test2@mail.com',
                darkMode: false,
                favoriteList: [],
                photoURL: ''
            })),
            signUpWithGoogle: jest.fn(() => Promise.resolve({
                displayName: 'Im a user from google',
                email: 'test@gmail.com',
                darkMode: false,
                favoriteList: [],
                photoURL: '',
            })),
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
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "chKrBkiQrEj9twbk2TTw3X-9GpQ",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "FGBhQbmPwH8"
                        },
                        "snippet": {
                            "publishedAt": "2009-02-24T03:02:20Z",
                            "channelId": "UCAJuYnKFVGBoVsBO4_svrrQ",
                            "title": "Daft Punk - One More Time (Official Video)",
                            "description": "Official video for Daft Punk's \"One More Time\" from the album Discovery. Explore the incredible Daft Punk catalogue on iTunes here: ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/FGBhQbmPwH8/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/FGBhQbmPwH8/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Warner Music France",
                            "liveBroadcastContent": "none",
                            "publishTime": "2009-02-24T03:02:20Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "gn4ev_rDO9Gro0ueKUnCTp06cNo",
                        "id": {
                            "kind": "youtube#channel",
                            "channelId": "UCKHFvArwRwQU2VbRjMpaVGw"
                        },
                        "snippet": {
                            "publishedAt": "2010-01-23T21:53:08Z",
                            "channelId": "UCKHFvArwRwQU2VbRjMpaVGw",
                            "title": "DaftPunkVEVO",
                            "description": "Daft Punk on Vevo - Official Music Videos, Live Performances, Interviews and more...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://yt3.ggpht.com/-gUy779EVYRo/AAAAAAAAAAI/AAAAAAAAAAA/anndA8_-rFA/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
                                },
                                "medium": {
                                    "url": "https://yt3.ggpht.com/-gUy779EVYRo/AAAAAAAAAAI/AAAAAAAAAAA/anndA8_-rFA/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
                                },
                                "high": {
                                    "url": "https://yt3.ggpht.com/-gUy779EVYRo/AAAAAAAAAAI/AAAAAAAAAAA/anndA8_-rFA/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
                                }
                            },
                            "channelTitle": "DaftPunkVEVO",
                            "liveBroadcastContent": "upcoming",
                            "publishTime": "2010-01-23T21:53:08Z"
                        }
                    }
                ],
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

    beforeEach(() => {
        wrapper = shallow(<RegisterDialog />)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Tests the correct if it renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Tests form send', () => {
        wrapper = shallow(<RegisterDialog {...props} />);
        expect(wrapper.exists()).toBe(true);
        const dialog = wrapper.find('#dialogReg').dive();
        dialog.find('#regForm').simulate('submit', { preventDefault() { } });
        expect(useAuth().registerUser).toBeCalled();
        wrapper.update();
    });

    it('Tests form send with error', () => {
        wrapper = shallow(<RegisterDialog {...props} />);
        expect(wrapper.exists()).toBe(true);
        const dialog = wrapper.find('#dialogReg').dive();
        useAuth().registerUser.mockRejectedValue({
            code: 'auth/wrong-password',
            message: 'There is a problem with the credentials provided'
        });
        dialog.find('#regForm').simulate('submit', { preventDefault() { } });
        expect(useAuth().registerUser).toBeCalled();
        expect(useStateSpy).toBeCalled();
    });

    it('Tests on cancel Button', () => {
        wrapper = shallow(<RegisterDialog {...props} />);
        expect(wrapper.exists()).toBe(true);
        wrapper.find('#dialogReg').dive().find('#cnlReg').simulate('click');
        expect(handleClose).toBeCalled();
    });

    it('Tests on sign with google Button', () => {
        wrapper = shallow(<RegisterDialog {...props} />);
        expect(wrapper.exists()).toBe(true);
        wrapper.find('#dialogReg').dive().find('#sbtGoogle').simulate('click');
        expect(useAuth().signUpWithGoogle).toBeCalled();
    });
});