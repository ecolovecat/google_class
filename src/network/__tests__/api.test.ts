import MockAdapter from 'axios-mock-adapter';
import API from '~/network';

describe('API', () => {
    it('should attach token in headers', async () => {
        const mock = new MockAdapter(API);
        mock.onGet('/test').reply(200, { data: 'test' });
        localStorage.setItem('token', 'test-token');
        const response = await API.get('/test');
        expect(response.config.headers['Authorization']).toBe('Bearer test-token');
    });
});
