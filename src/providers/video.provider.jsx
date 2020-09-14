import axios from 'axios';
const KEY = "AIzaSyCxHxUucMtm3UF8FPCVWgjor2QtbWp1AvI";

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 50,
        key: KEY
    }
})