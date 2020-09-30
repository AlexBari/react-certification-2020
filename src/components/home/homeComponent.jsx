import React, { useCallback } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../../components/searchBar/SearchBarComponent';
import VideoList from '../../components/video/videoList/VideoListComponent';
import VideoDetail from '../../components/video/videoDetail/VideoDetailComponent';
import { getVideos } from '../../components/video/video.service';
import { useVideoContext } from '../../providers/VideoPageProvider';
import styled from 'styled-components';

const MainWrapper = styled.div`
    margin-top: 1em;
    .MuiTypography-h6 {
        padding: 10px;
    }
`;

const SearchBarWrapper = styled.div`
    display: inline-flex;
    background-color: #b6051a;
    padding: 5px 0;
    color: white;
    width: 100%;
    justify-content: center;
    border-radius: 5px;
    margin-bottom: 30px;
`;

const HomeComponent = () => {
    const { state, saveHomeState } = useVideoContext();
    const fetchMoreData = async () => {
        const response = await getVideos(state.searchPerformed, state.token);
        saveHomeState({
            token: response.data.nextPageToken,
            videos: [...new Set([...state.videos, ...response.data.items])]
        });
    };

    const handleFormSubmit = useCallback(async (term) => {
        if (state.term === term) {
            const response = await getVideos(term);
            saveHomeState({
                searchPerformed: term,
                token: response.data.nextPageToken,
                videos: response.data.items
            });
        }
    }, [saveHomeState, state.term]);

    return (
        <MainWrapper>
            <SearchBarWrapper>
                <SearchBar handleFormSubmit={handleFormSubmit} />
            </SearchBarWrapper>
            <br />
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                spacing={2}
                wrap="nowrap"
            >
                {state.videos.length > 0 && (
                    <Grid item xs={12}>
                        <Paper>
                            <VideoDetail />
                        </Paper>
                    </Grid>
                )}
                {state.videos.length > 0 ? (
                    <InfiniteScroll
                        dataLength={state.videos.length}
                        next={fetchMoreData}
                        hasMore
                        loader={
                            state.token !== undefined || state.token !== '' ? (
                                <h4>Loading...</h4>
                            ) : (
                                    <h4>- End of the Search -</h4>
                                )
                        }
                    >
                        <Grid item xs={12}>
                            <Paper>
                                <VideoList />
                            </Paper>
                        </Grid>
                    </InfiniteScroll>
                ) : (
                        <Grid item xs={12}>
                            <Paper>
                                <Typography variant="h6">
                                    There&lsquo;re no results for your search yet ...
              </Typography>
                            </Paper>
                        </Grid>
                    )}
            </Grid>
        </MainWrapper>
    );
};

export default HomeComponent;
