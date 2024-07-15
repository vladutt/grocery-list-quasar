import axios from 'axios'
import {LocalStorage} from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.grocermate.ro', headers: {
    'Authorization': `Bearer ${LocalStorage.getItem('token')}`,
    'Accept': 'application/json',
  } })

export { api }
