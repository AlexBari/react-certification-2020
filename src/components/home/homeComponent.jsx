import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../../components/searchBar/SearchBarComponent';
import VideoList from '../../components/video/videoList/VideoListComponent';
import VideoDetail from '../../components/video/videoDetail/VideoDetailComponent';
import { getVideos } from '../../providers/video.service';
import { useVideoContext } from '../../providers/VideoPageProvider';
import '../../pages/pages.scss';

const HomeComponent = () => {
    const { state, saveHomeState } = useVideoContext();
    const [hasVideos, setHasVideos] = useState(false);
    const fetchMoreData = async () => {
        const response = await getVideos(state.searchPerformed, state.token);
        saveHomeState({
            token: response.data.nextPageToken,
            videos: [...new Set([...state.videos, ...response.data.items])]
        });
    };

    useEffect(() => {
        setHasVideos(state.videos.length > 0 ? true : false);
    }, [state, hasVideos]);

    const handleFormSubmit = async (term) => {
        const response = await getVideos(term);
        saveHomeState({
            searchPerformed: term,
            token: response.data.nextPageToken,
            videos: response.data.items
        });
    }

    return (
        <div style={{ marginTop: '1em' }}>
            <div className="searchBarDiv">
                <SearchBar handleFormSubmit={handleFormSubmit} />
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
                {hasVideos && (
                    <Grid item xs={12}>
                        <Paper>
                            <VideoDetail />
                        </Paper>
                    </Grid>
                )}
                {hasVideos ? (
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

export default HomeComponent;
