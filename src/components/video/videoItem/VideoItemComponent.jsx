import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import '../video.scss';

const VideoItem = ({ video, handleVideoSelect }) => {
  return (
    <Grid
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
