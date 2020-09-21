import React from 'react';
import ReactPlayer from 'react-player';
import { Typography, Grid, FormGroup, FormControlLabel } from '@material-ui/core'
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../video.scss';

const VideoDetail = ({ selectedVideo, handlerFavoriteList, isFavorite }) => {
    const onFavoriteHandler = (e) => {
        e.preventDefault();
        const value = !isFavorite;
        handlerFavoriteList(selectedVideo, value);
    }
    if (!selectedVideo) {
        return "";
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
            <Grid item xs={12} className='player-centered'>
                <ReactPlayer
                    key={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
                    url={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                    title='WizeTube player'
                    controls={true}
                    playing={true}
                    width="100%"
                    height="100%"
                />
            </Grid>
            <Grid item className='description'>
                <Typography varian="h6">{selectedVideo.snippet.title}</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <IconButton tooltip="Hide" style={{ float: 'right', color: isFavorite? 'red':'inherit' }} iconstyle={{ marginTop: -25}} onClick={onFavoriteHandler}>
                                {isFavorite
                                    ? <FavoriteIcon />
                                    : <FavoriteBorderIcon />
                                }
                            </IconButton>
                        }
                    />
                </FormGroup>
            </Grid>
        </Grid>

    )
}

export default VideoDetail;