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

	// apiClient.interceptors.response.use(response => {
	// 	return response
	// },
	// 	error => {
	// 		if (error.response)
	// 			console.error('--- Server error ---', error.response.data);
	// 		return error
	// 	}
	// );

	// axios.interceptors.response.use((response) => {
	// 	return response;
	// }, function (error) {
	// 	// Do something with response error
	// 	if (error.response.status === 401) {
	// 		console.log('unauthorized, logging out ...');
	// 		auth.logout();
	// 		router.replace('/auth/login');
	// 	}
	// 	return Promise.reject(error.response);
	// });

	return apiClient;
}