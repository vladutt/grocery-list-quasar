import {LocalStorage} from "quasar";
import {staticOptions} from "src/static/settings";
import axios from "axios";
import {api} from "boot/axios";


Object.entries(staticOptions).forEach(([key, value]) => {
  LocalStorage.set(key, value);
});

api.get('/notifications')
  .then((response) => {
    LocalStorage.setItem('notifications', response.data.data.notifications)
    LocalStorage.setItem('hasUnreadNotifications', response.data.data.hasUnreadNotifications)
  })

api.get('/lists')
  .then((response) => {
    LocalStorage.setItem('shoppingLists', response.data.data.items)
  })
