import api from '@/services/api';

export default {
	getTracks (params) {
		return api().get('tracks', { params });
	},
};