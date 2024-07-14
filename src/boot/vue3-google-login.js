import vue3GoogleLogin from 'vue3-google-login'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(vue3GoogleLogin, {
    clientId: '225205039913-hcios25t2his85r8c9aeunuksrin6gu1.apps.googleusercontent.com'
  })
})
