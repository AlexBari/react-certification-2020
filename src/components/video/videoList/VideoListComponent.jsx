import React, { useEffect, useState } from 'react';
import VideoItem from '../videoItem/VideoItemComponent';
import { useVideoContext } from '../../../providers/VideoPageProvider'
import { useAuth } from '../../../providers/AuthProvider';
import '../video.scss';

const VideoList = () => {
  const auth = useAuth();
  const { state } = useVideoContext();
  const [videosArr, setVideosArr] = useState([]);

  useEffect(() => {
    if (window.location.pathname === '/favorites' && auth.user) {
      setVideosArr(auth.user.favoriteList);
    } else {
      setVideosArr(state.videos);
    }
  }, [state, auth]);

  const renderedVideos =
    videosArr &&
    videosArr
      .filter((video) => video.id.kind !== 'youtube#channel')
      .map((video) => {
        return (
          <VideoItem
            key={video.id.videoId + video.etag}
            video={video}
          />
        );
      });
  return <div>{renderedVideos}</div>;
};

export default VideoList;
