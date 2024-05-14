import {LocalStorage} from "quasar";
import {staticOptions} from "src/static/settings";


Object.entries(staticOptions).forEach(([key, value]) => {
  LocalStorage.set(key, value);
});
