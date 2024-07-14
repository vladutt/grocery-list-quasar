<script setup>
import {ref} from "vue";
import {LocalStorage, useQuasar} from "quasar";
import {api} from "boot/axios";
import {setPropsToNull, sortErrorsFromRequest} from "src/helpers/helpers";

const $q = useQuasar()
const dialog = defineModel({'required': true, default: false});

const form = ref({
  email: null,
});

const formErrors = ref({
  email: null,
});

function changeEmail() {

  api.post('/user/change-email', form.value)
    .then((data) => {
      dialog.value = false;

      setPropsToNull(formErrors.value);

      let user = LocalStorage.getItem('user');
      user.email = form.value.email;

      LocalStorage.setItem('user', user);

      $q.notify({
        type: 'positive',
        message: `Email saved successfully. We will refresh the app an few seconds.`,
        timeout: 3000
      })

      setTimeout(() => {
        document.location.reload(true);
      }, 2000)
    })
    .catch((error) => {
      let errors = error.response.data.errors;
      sortErrorsFromRequest(formErrors.value, errors);
    })

}
</script>

<template>
  <q-dialog v-model="dialog" full-width>
    <q-card>
      <q-card-section>
        <div class="text-h6">Change email</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-center" >

        <q-input type="email"
                 class="q-mt-sm full-width"
                 v-model="form.email"
                 outlined autofocus
                 label="New email"
                 :error="formErrors.email !== null"
                 bg-color="white">
          <template v-slot:error>
            {{ formErrors.email}}
          </template>
        </q-input>

      </q-card-section>


      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="negative" label="Close" v-close-popup />
        <q-btn color="primary" rounded @click="changeEmail" label="Save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
