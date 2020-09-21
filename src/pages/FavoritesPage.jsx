import React, { useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import SearchBar from '../components/searchBar/SearchBarComponent';
import VideoList from '../components/video/videoList/VideoListComponent';
import VideoDetail from '../components/video/videoDetail/VideoDetailComponent';
import { useAuth } from '../hooks/auth.hook';

import './pages.scss';

const FavoritesPage = (props) => {
  const auth = useAuth();
  const [videos, setFavoriteVideos] = useState(auth.user.favoriteList || []);
  const [isFavorite, setFavorite] = useState(false);
  const [selectedVideo, setVideo] = useState(null);
  const handleSubmit = (termForSearchBar) => {
    const filteredVideos =
      videos && videos.filter((video) => video.snippet.title.includes(termForSearchBar));
    setFavoriteVideos(filteredVideos);
  };
  const handleVideoSelect = (video) => {
    const flag = videos.filter((vd) => vd.id.videoId === video.id.videoId).length > 0;
    setFavorite(flag);
    setVideo(video);
  };

  const handlerFavoriteList = (video, favorite) => {
    let arrVid = [];
    if (favorite) {
      arrVid = [...videos, video];
    } else {
      arrVid = videos.filter((vd) => video.id.videoId !== vd.id.videoId);
    }
    auth.updateUser(auth.user.uid, {
      favoriteList: arrVid,
    });
    setFavoriteVideos(arrVid);
    setFavorite(favorite);
  };
  return (
    <div style={{ marginTop: '1em' }}>
      <div className="searchBarDiv">
        <SearchBar handleFormSubmit={handleSubmit} title=" in My Favorites" />
      </div>
      <br />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={2}
        wrap="nowrap"
      >
        {videos && videos.length > 0 && (
          <Grid item xs={12}>
            <Paper>
              <VideoDetail
                isFavorite={isFavorite}
                handlerFavoriteList={handlerFavoriteList}
                selectedVideo={selectedVideo}
              />
            </Paper>
          </Grid>
        )}
        {videos.length > 0 ? (
          <Grid item xs={12}>
            <Paper>
              <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" style={{ padding: '10px' }}>
                There're no favorites yet...
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FavoritesPage;
