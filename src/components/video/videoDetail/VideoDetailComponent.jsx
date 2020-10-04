import React from 'react';
import ReactPlayer from 'react-player';
import {
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../video.scss';
import { useVideoContext } from '../../../providers/VideoPageProvider';
import { useAuth } from '../../../providers/AuthProvider';

const VideoDetail = () => {
  const { state, saveHomeState } = useVideoContext();
  const auth = useAuth();

  const onFavoriteHandler = (e) => {
    e.preventDefault();
    const value = !state.isFavorite;
    const video = state.selectedVideo;
    let videosArr = [];
    if (value) {
      videosArr = [...state.favoriteList, video];
    } else {
      videosArr = state.favoriteList.filter((vd) => video.id.videoId !== vd.id.videoId);
    }
    if (auth.user) {
      auth.updateUser(auth.user.uid, {
        favoriteList: videosArr,
      });
    }
    saveHomeState({
      favoriteList: videosArr,
      isFavorite: value,
    });
  };

  if (!state.selectedVideo) {
    return '';
  }
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      wrap="nowrap"
      className="video-detail"
    >
      <Grid item xs={12} className="player-centered">
        <ReactPlayer
          key={`https://www.youtube.com/watch?v=${state.selectedVideo.id.videoId}`}
          url={`https://www.youtube.com/embed/${state.selectedVideo.id.videoId}`}
          title="WizeTube player"
          controls
          playing
          width="100%"
          height="100%"
        />
      </Grid>
      <Grid item className="description">
        <Typography variant="h6">{state.selectedVideo.snippet.title}</Typography>
        {auth.user && (
          <FormGroup>
            <FormControlLabel
              control={
                <IconButton
                  id="favoriteButton"
                  tooltip="Hide"
                  style={{ float: 'right', color: state.isFavorite ? 'red' : 'inherit' }}
                  iconstyle={{ marginTop: -25 }}
                  onClick={onFavoriteHandler}
                >
                  {state.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              }
            />
          </FormGroup>
        )}
      </Grid>
    </Grid>
  );
};

export default VideoDetail;
