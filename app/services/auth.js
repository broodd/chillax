import api from '@/services/api';

export default {
	login (params) {
		return api().post('login', params);
	},
	addNewCard (params) {
		return api().post('card', params);
	},
	updateCard (params) {
		return api().put(`card/update/${params.id}`, params);
	}
};