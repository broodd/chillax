import api from '@/services/api';

export default {
	getTracks (params) {
		return api().get('tracks', { params });
	},
	getTracksByPlaylist (params) {
		return api().get(`tracks/playlist/${params.id}`, { params });
	},
	getTracksByAuthor (params) {
		return api().get(`tracks/author/${params.id}`, { params });
	},

	likePlaylist(params) {
		return api().put(`track/like/${params.id}`);
	}
};