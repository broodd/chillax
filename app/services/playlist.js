import api from '@/services/api';

export default {
	getPlaylists (params) {
		return api().get('playlists', { params });
	},
	getPlaylist (params) {
		return api().get(`playlist/${params.id}`);
	},
};