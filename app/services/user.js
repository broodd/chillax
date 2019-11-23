import api from '@/services/api';

export default {
	getAuthor(params) {
		return api().get(`userinfo/${params.id}`);
	},
};