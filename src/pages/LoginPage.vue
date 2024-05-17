<script setup>
import {ref} from "vue";
import router from "src/router";
import {useRouter} from 'vue-router'
import {api} from "boot/axios";
import {useQuasar} from "quasar";

const $q = useQuasar()
const route = useRouter()
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
      $q.notify({
        color: 'positive',
        position: 'bottom',
        message: data.data.message,
        icon: 'check'
      });
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
<div class=" text-black">
  <h5 class="text-weight-bolder text-primary">Login</h5>

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
    <q-btn no-caps size="sm" class="text-weight-bold" text-color="primary"  label="Forgot Password ?"/>
  </div>

  <q-btn @click="loginAccount" label="Login" color="primary" rounded class="full-width q-mt-xl" />

  <div class="text-right q-mt-sm">
    Don't have a account? <a @click="route.push('/register')" class="text-primary" style="text-decoration: none" >Sign up</a>
  </div>


  <div class="text-center text-weight-bolder q-my-xl">OR</div>
  <div class="text-center q-mt-xl">
    <q-img width="46px" src="assets/social/google.svg"/>
    <q-img width="46px" class="q-mx-sm" src="assets/social/facebook.svg"/>
    <q-img width="46px" src="assets/social/twitter.svg"/>
  </div>
</div>
</template>

<style scoped>

</style>
