<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router'
import {api} from "boot/axios";
import {LocalStorage, useQuasar} from "quasar";

const router = useRouter();
const loading = ref(false);
const passwordVisibility = ref(false);
const $q = useQuasar()

const register = ref({
  email: '',
  name: '',
  password: '',
  password_confirmation: '',
  terms: false
});

const errors = ref({
  email: '',
  name: '',
  password: '',
  password_confirmation: '',
  terms: false
});

function registerAccount() {
  loading.value = true;

  api.post('/register', register.value)
    .then((data) => {
      $q.notify({
        color: 'positive',
        position: 'bottom',
        message: data.data.message,
        icon: 'check'
      });

      LocalStorage.set('user', {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        avatar: data.data.avatar,
      });
      LocalStorage.set('token', data.data.token);

      api.defaults.headers['Authorization'] = 'Bearer ' + data.data.token;

      return router.push('/')
    })
    .catch((error) => {
      let response = error.response.data.errors;
      for (let key in response) {
        errors.value[key] = response[key][0];
      }
    })

  loading.value = false;
}
</script>

<template>
  <h4 class="text-h4 text-weight-bold text-center"> Create Account </h4>

  <div  class="text-center">
    <q-img src="assets/logo.png" width="200px"></q-img>
  </div>

  <div class=" text-black q-pa-md">


  <q-input
    outlined
    v-model="register.name"
    color="primary"
    label="Name"
    :error="errors.name.length > 0"
    :rules="[ val => val && val.length > 0 || 'Name must be completed...']"
  >
    <template v-slot:error>
      {{ errors.name }}
    </template>
  </q-input>

    <q-input
    type="email"
    outlined
    v-model="register.email"
    color="primary"
    label="Email"
    :error="errors.email.length > 0"
    :rules="[ val => val && val.length > 0 || 'Email must be completed...']"
    >
      <template v-slot:error>
        {{ errors.email }}
      </template>
    </q-input>

    <q-input
      :type="passwordVisibility ? 'text' : 'password'"
      outlined
      v-model="register.password"
      color="primary"
      label="Password"
      :error="errors.password.length > 0"
      :rules="[ val => val && val.length > 0 || 'Password must be completed...']"
    >
      <template v-slot:error>
        {{ errors.password }}
      </template>

      <template v-slot:append>
        <q-btn round dense flat :icon="passwordVisibility ? 'visibility' : 'visibility_off'" @click="passwordVisibility = !passwordVisibility"/>
      </template>
    </q-input>

  <q-input
    :type="passwordVisibility ? 'text' : 'password'"
    outlined
    v-model="register.password_confirmation"
    color="primary"
    label="Confirm password"
    :rules="[ val => val && val.length > 0 || 'Confirm password must be completed...']"
  >
    <template v-slot:error>
      {{ errors.password_confirmation }}
    </template>

    <template v-slot:append>
      <q-btn round dense flat :icon="passwordVisibility ? 'visibility' : 'visibility_off'" @click="passwordVisibility = !passwordVisibility"/>
    </template>
  </q-input>

    <q-checkbox v-model="register.terms"
                label="I'm agree to accept "
    > <a href="https://grocermate.ro/terms">
      Terms and Conditions</a> and accept <a href="https://grocermate.ro/privacy">Privacy Policy</a>
    </q-checkbox>

    <p class="text-negative" v-if="errors.terms.length > 0">
      {{ errors.terms }}
    </p>

  <q-btn @click="registerAccount()" :loading="loading" label="Sign up" color="primary" rounded class="full-width" />

  <div class="text-right q-mt-sm">
    You have a account? <a @click="router.push('/login')" class="text-primary" style="text-decoration: none" >Sign In</a>
  </div>


<!--  <div class="text-center text-weight-bolder q-my-sm">OR</div>-->
<!--  <div class="text-center">-->
<!--    <q-img width="46px" src="assets/social/google.svg"/>-->
<!--    <q-img width="46px" class="q-mx-sm" src="assets/social/facebook.svg"/>-->
<!--    <q-img width="46px" src="assets/social/twitter.svg"/>-->
<!--  </div>-->
</div>
</template>

<style scoped>

</style>
