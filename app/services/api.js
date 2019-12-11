import axios from 'axios';
import store from '@/store';

export default () => {
	const token = store.getters.getToken;

	const apiClient = axios.create({
		baseURL: 'https://chillax-server.herokuapp.com',
		headers: { 
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: token || undefined
		}
	});

	// apiClient.interceptors.response.use(response => {
	// 	return response
	// },
	// 	error => {
	// 		if (error.response)
	// 			console.error('--- Server error ---', error.response);
	// 		// if (error.response.status === 401) {
	// 		// 	store.dispatch('setToken', '')
	// 		// 		.then(() => {
	// 		// 			console.log('--- empty token', );
	// 		// 		})
	// 		// }
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