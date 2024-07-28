<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router'
import {api} from "boot/axios";
import {LocalStorage, useQuasar} from "quasar";
import {decodeCredential, googleAuthCodeLogin, GoogleLogin} from "vue3-google-login";

const $q = useQuasar()
const router = useRouter()
const loading = ref(false);
const login = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: '',
});

function loginAccount() {
  loading.value = true;

  api.post('/login', login.value)
    .then((data) => {
      LocalStorage.set('token', data.data.token);
      LocalStorage.set('user', {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        avatar: data.data.avatar
      });

      api.defaults.headers['Authorization'] = 'Bearer ' + data.data.token;

      $q.notify({
        color: 'positive',
        position: 'bottom',
        message: data.data.message,
        icon: 'check'
      });

      return router.push('/');
    })
    .catch((error) => {
      let response = error.response.data.errors;
      for (let key in response) {
        errors.value[key] = response[key][0];
      }
    })

  loading.value = false;
}

const callback = (response) => {
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData)
}
const loginGoogle = () => {
  alert(2);
  googleAuthCodeLogin().then((response) => {
    console.log("Handle the response", response)
  })
}
</script>

<template>
<div class="q-pa-md">
  <h4 class="text-h4 text-weight-bold text-center"> Welcome to Grocer Mate! </h4>

  <div  class="text-center">
    <q-img src="assets/logo.png" width="200px"></q-img>
  </div>

  <div class="text-black q-mt-md">
    <q-input
      outlined
      v-model="login.email"
      color="primary"
      label="Email"
      :error="errors.email.length > 0"
    >
      <template v-slot:error>
        {{ errors.email }}
      </template>
    </q-input>

    <q-input
      type="password"
      outlined
      v-model="login.password"
      color="primary"
      label="Password"
    />

    <div class="text-center q-mt-lg">
      <q-btn to="forgot-password" no-caps size="sm" class="text-weight-bold" text-color="primary"  label="Forgot Password ?"/>
    </div>

    <q-btn @click="loginAccount" label="Login" color="primary" rounded class="full-width q-mt-sm" />

    <div class="text-right q-mt-sm">
      Don't have a account? <a @click="router.push('/register')" class="text-primary" style="text-decoration: none" >Sign up</a>
    </div>


<!--    <div class="text-center text-weight-bolder q-mt-md">OR</div>-->
<!--    <div class="text-center q-mt-sm">-->
<!--      <q-img width="46px" @click="loginGoogle" src="assets/social/google.svg"/>-->
<!--      <q-img width="46px" class="q-mx-sm" src="assets/social/facebook.svg"/>-->
<!--      <q-img width="46px" src="assets/social/twitter.svg"/>-->
<!--    </div>-->
  </div>
</div>
</template>

<style scoped>

</style>
