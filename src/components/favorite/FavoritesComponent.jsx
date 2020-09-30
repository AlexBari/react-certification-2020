import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import VideoList from '../../components/video/videoList/VideoListComponent';
import VideoDetail from '../../components/video/videoDetail/VideoDetailComponent';
import { useAuth } from '../../providers/AuthProvider';
import '../../pages/pages.scss';

const FavoritesComponent = () => {
  const auth = useAuth();
  const [hasVideos, setHasVideos] = useState(false);

  useEffect(() => {
    setHasVideos(auth.user.favoriteList.length > 0 ? true : false);
  }, [auth]);

  return (
    <div style={{ marginTop: '1em' }}>
      <br />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={2}
        wrap="nowrap"
      >
        {hasVideos && (
          <Grid item xs={12}>
            <Paper>
              <VideoDetail />
            </Paper>
          </Grid>
        )}
        {hasVideos ? (
          <Grid item xs={12}>
            <Paper>
              <VideoList />
            </Paper>
          </Grid>
        ) : (
            <Grid item xs={12}>
              <Paper>
                <Typography variant="h6" style={{ padding: '10px' }}>
                  There&lsquo;re no favorites yet...
              </Typography>
              </Paper>
            </Grid>
          )}
      </Grid>
    </div>
  );
};

export default FavoritesComponent;
