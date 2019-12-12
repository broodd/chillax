import store from '@/store';
const bgHttp = require('nativescript-background-http');

export default {
  uploadFile: (params) => {
		return new Promise((resolve, reject) => {
      const session = bgHttp.session('image-upload');
      const token = store.getters.getToken;

      const request = {
				url: 'https://chillax-server.herokuapp.com/audio-file',
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: token || undefined
        },
        description: 'uploading file...',
        androidAutoDeleteAfterUpload: false,
        androidNotificationTitle: 'Chillax uploading audio'
			};
			
      const task = session.multipartUpload(params, request);
      
      task.on('error', (e) => {
        reject(e);
      });
      task.on('complete', (e) => {
        resolve(e);
      });
    })
  }
}