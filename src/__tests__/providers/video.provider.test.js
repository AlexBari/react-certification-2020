// video.provider.test.js
import mockAxios from 'axios';
import { getVideos } from '../../providers/video.provider';
import results from '../../__mocks__/searchResult';

jest.mock('axios');

describe('Video provider test suite (youtube)', () => {
    it('Should return video  list', async () => {
        const resp = results.getResultObject();
        await expect(getVideos('Daft Punk', '')).resolves.toEqual(resp);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toBeCalledWith(
            '/search', {
            params: {
                maxResults: 50,
                pageToken: '',
                q: 'Daft Punk',
                type: 'Video'
            }
        }
        );
    });
});
