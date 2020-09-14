import React, { useState } from 'react';
import { Paper, Grid } from '@material-ui/core';
import SearchBar from '../components/searchBar/SearchBarComponent';
import VideoList from '../components/video/videoList/VideoListComponent';
import VideoDetail from '../components/video/videoDetail/VideoDetailComponent';
import youtube from '../providers/video.provider';

const HomePage = (props) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setVideo] = useState(null);

  const handleSubmit = async (termForSearchBar) => {
    const response = await youtube.get('/search', {
      params: {
        q: termForSearchBar
      }
    });
    setVideos(response.data.items);
  };
  const handleVideoSelect = (video) => {
    setVideo(video)
  };
  return (
    <div className="ui container" style={{ marginTop: '1em' }}>
      <SearchBar handleFormSubmit={handleSubmit} />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Paper>
            <VideoDetail video={selectedVideo} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
