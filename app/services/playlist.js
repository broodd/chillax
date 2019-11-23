import api from '@/services/api';

export default {
	getPlaylists (params) {
		return api().get('playlists', { params });
	},
	getPlaylist (params) {
		return api().get(`playlist/${params.id}`);
	},
	getPlaylistsByAuthor (params) {
		return api().get(`playlists/author/${params.id}`, { params });
	},

	likePlaylist (params) {
		return api().put(`playlist/like/${params.id}`);
	}
};