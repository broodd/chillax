import api from '@/services/api';

export default {
	getTemplates (params) {
		return api().get('templates', { params });
	}
};