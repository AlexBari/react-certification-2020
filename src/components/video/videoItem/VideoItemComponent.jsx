import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useAuth } from '../../../providers/AuthProvider';
import '../video.scss';
import { useVideoContext } from '../../../providers/VideoPageProvider';

const VideoItem = ({ video }) => {
  const auth = useAuth();
  const { state, saveHomeState } = useVideoContext();
  let favList = auth.user ? auth.user.favoriteList: state.favoriteList;

  const handleVideoSelect = (video) => {
    const flag = favList.filter((vd) => vd.id.videoId === video.id.videoId).length > 0;
    saveHomeState({
      isFavorite: flag,
      selectedVideo: video,
    });
  }

  return (
    <Grid
      id="videoItem"
      container
      wrap="nowrap"
      onClick={() => handleVideoSelect(video)}
      className="video-item item"
    >
      <Grid item xs>
        <img
          className="image"
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.description}
        />
      </Grid>
      <Grid item xs className="header">
        <Typography variant="h6">{video.snippet.title}</Typography>
        <Typography>{video.snippet.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default VideoItem;
