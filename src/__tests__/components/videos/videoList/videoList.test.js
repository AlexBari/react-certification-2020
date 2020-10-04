import React from 'react';
import { shallow, mount, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoList from '../../../../components/video/videoList/VideoListComponent';
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
    const videos = [
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
    ];
    useStateSpy.mockImplementation((init) => [videos, setState]);

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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Tests the correct if it renders', () => {
        const wrapper = shallow(<VideoList />);
        expect(wrapper.exists()).toBe(true);
    });

    it('Tests when the video exist and is selected', () => {
        const wrapper = mount(<VideoList />);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('VideoItem').length).toBe(2);
        expect(wrapper.text()).toMatch(/Daft Punk/);
    });

});