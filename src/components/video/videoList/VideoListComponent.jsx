import React from 'react';
import VideoItem from '../videoItem/VideoItemComponent';
import '../video.scss';

const VideoList = ({ videos, handleVideoSelect }) => {
    const renderedVideos = 
    videos && 
    videos.filter((video) => video.id.kind !== "youtube#channel")
    .map((video) => {
        return (
            <VideoItem
                key={video.id.videoId+video.etag}
                video={video}
                handleVideoSelect={handleVideoSelect}
            />
        )
    });
    return <div>{renderedVideos}</div>
}

export default VideoList;