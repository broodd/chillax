import axios from 'axios';
import store from '@/store';

export default () => {
	const token = store.getters.getToken;

	const apiClient = axios.create({
		baseURL: 'http://192.168.0.103:3000',
		// baseURL: 'https://event-me.herokuapp.com',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: token
		}
	});

	return apiClient;
}