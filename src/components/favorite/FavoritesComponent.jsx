import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import VideoList from '../../components/video/videoList/VideoListComponent';
import VideoDetail from '../../components/video/videoDetail/VideoDetailComponent';
import { useAuth } from '../../providers/AuthProvider';
import styled from 'styled-components';

const MainWrapper = styled.div`
    margin-top: 1em;
    .MuiTypography-h6 {
        padding: 10px;
    }
`;

const FavoritesComponent = () => {
  const auth = useAuth();
  const [hasVideos, setHasVideos] = useState(false);

  useEffect(() => {
    setHasVideos(auth.user.favoriteList.length > 0 ? true : false);
  }, [auth]);

  return (
    <MainWrapper>
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
              <Typography variant="h6">
                  There&lsquo;re no favorites yet...
              </Typography>
              </Paper>
            </Grid>
          )}
      </Grid>
    </MainWrapper>
  );
};

export default FavoritesComponent;
