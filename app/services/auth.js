import api from '@/services/api';

export default {
	login (params) {
		return api().post('login', params);
	},
	signUp (params) {
		return api().post('signup', params);
	},
	updateCard (params) {
		return api().put(`card/update/${params.id}`, params);
	}
};