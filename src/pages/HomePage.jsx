import React, { useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../components/searchBar/SearchBarComponent';
import VideoList from '../components/video/videoList/VideoListComponent';
import VideoDetail from '../components/video/videoDetail/VideoDetailComponent';
import { getVideos } from '../providers/video.provider';
import { useAuth } from '../providers/ProvideAuth';
import './pages.scss';

const HomePage = () => {
  const auth = useAuth();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setVideo] = useState(null);
  const [isFavorite, setFavorite] = useState(false);
  const [favVideos, setFavoriteVideos] = useState(auth.user.favoriteList || []);
  const [token, setNextPageToken] = useState('');
  const [searchPerformed, setSearchPerformed] = useState('');

  const handleSubmit = async (termForSearchBar) => {
    setVideos([]);
    const response = await getVideos(termForSearchBar);
    setSearchPerformed(termForSearchBar);
    setNextPageToken(response.data.nextPageToken);
    setVideos(response.data.items);
  };

  const handlerFavoriteList = (video, favorite) => {
    let videosArr = [];
    if (favorite) {
      videosArr = [...favVideos, video];
    } else {
      videosArr = favVideos.filter((vd) => video.id.videoId !== vd.id.videoId);
    }
    setFavoriteVideos(videosArr);
    auth.updateUser(auth.user.uid, {
      favoriteList: videosArr,
    });
    setFavorite(favorite);
  };

  const handleVideoSelect = (video) => {
    const flag = favVideos.filter((vd) => vd.id.videoId === video.id.videoId).length > 0;
    setFavorite(flag);
    setVideo(video);
  };

  const fetchMoreData = async () => {
    const response = await getVideos(searchPerformed, token);
    setNextPageToken(response.data.nextPageToken);
    setVideos([...new Set([...videos, ...response.data.items])]);
  };

  return (
    <div style={{ marginTop: '1em' }}>
      <div className="searchBarDiv">
        <SearchBar handleFormSubmit={handleSubmit} />
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
        {videos.length > 0 && (
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
          <InfiniteScroll
            dataLength={videos.length}
            next={fetchMoreData}
            hasMore
            loader={
              token !== undefined || token !== '' ? (
                <h4>Loading...</h4>
              ) : (
                <h4>- End of the Search -</h4>
              )
            }
          >
            <Grid item xs={12}>
              <Paper>
                <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
              </Paper>
            </Grid>
          </InfiniteScroll>
        ) : (
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" style={{ padding: '10px' }}>
                There&lsquo;re no results for your search yet ...
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
