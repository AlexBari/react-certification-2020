import React from 'react';
import '../video.scss';

const VideoItem = ({ video, handleVideoSelect }) => {
    return (
        <div onClick={() => handleVideoSelect(video)} className='video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='header'>
                {video.snippet.tittle}
            </div>
        </div>
    );
}

export default VideoItem;