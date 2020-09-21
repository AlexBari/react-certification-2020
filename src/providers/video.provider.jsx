import axios from 'axios';

const KEY = 'AIzaSyCxHxUucMtm3UF8FPCVWgjor2QtbWp1AvI';

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: KEY,
  },
});

export function getVideos(searchPerfomed, nextPageToken = '') {
  return youtube.get('/search', {
    params: {
      q: searchPerfomed,
      maxResults: 50,
      pageToken: nextPageToken,
      type: 'Video',
    },
  });
}
