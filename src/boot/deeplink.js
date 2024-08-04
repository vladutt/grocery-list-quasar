import { boot } from 'quasar/wrappers';
import {LocalStorage, Notify} from 'quasar';
import {api} from "boot/axios";

export default boot(({ router, redirect }) => {
  function handleOpenURL(event) {

    const params = event.params;

    if (params.googleToken !== 'undefined') {

      LocalStorage.set('token', params.token);
      api.defaults.headers['Authorization'] = 'Bearer ' + params.token;

      api.get('/user')
        .then((response) => {
          LocalStorage.set('user', {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            avatar: response.data.avatar
          });

          LocalStorage.removeItem('googleToken')
          redirect('/');

        })
    }
  }

  document.addEventListener('deviceready', function () {
    if (window.cordova && window.universalLinks) {
        window.universalLinks.subscribe('homeEvent', handleOpenURL);
      }
  }, false);
});
