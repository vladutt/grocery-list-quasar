<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const forgotPassword = ref({
  email: '',
})

const errors = ref({
  email: '',
});
const router = useRouter()

function resetPassword() {

}
</script>

<template>
  <div class="q-pa-md">
    <h4 class="text-h4 text-weight-bold text-center"> Forgot Password </h4>

    <div  class="text-center">
      <q-img src="assets/logo.png" width="200px"></q-img>
    </div>

    <div class="text-black q-mt-md">
      <q-input
        outlined
        v-model="forgotPassword.email"
        color="primary"
        label="Email"
        :error="errors.email.length > 0"
      >
        <template v-slot:error>
          {{ errors.email }}
        </template>
      </q-input>

      <q-btn @click="resetPassword" label="Forgot Password" color="primary" rounded class="full-width q-mt-sm" />

      <div class="text-right q-mt-sm">
        Back to <a @click="router.push('/login')" class="text-primary" style="text-decoration: none" >Login</a>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
