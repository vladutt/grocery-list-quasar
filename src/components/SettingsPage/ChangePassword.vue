<script setup>
import {ref} from "vue";
import {useQuasar} from "quasar";
import {api} from "boot/axios";
import {setPropsToNull, sortErrorsFromRequest} from "src/helpers/helpers";

const $q = useQuasar()

const dialog = defineModel({'required': true, default: false});

const form = ref({
  password: null,
  new_password:null,
  new_password_confirmation:null,
});

const formErrors = ref({
  password: null,
  new_password:null,
  new_password_confirmation:null,
});


const passwordVisibility = ref(false);
const passwordVisibilityConfirm = ref(false);

function changePassword() {

  api.post('/user/change-password', form.value)
    .then((data) => {
      dialog.value = false;

      $q.notify({
        type: 'positive',
        message: `Password changed successfully.`,
      })

      setPropsToNull(formErrors.value);
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
        <div class="text-h6">Change password</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-center" >

        <q-input :type="passwordVisibility ? 'text' : 'password'"
                 class="q-mt-sm full-width"
                 v-model="form.password"
                 outlined
                 autofocus
                 label="Current password"
                 bg-color="white"
                 :error="formErrors.password !== null"
        >
          <template v-slot:append>
            <q-btn round dense flat :icon="passwordVisibility ? 'visibility' : 'visibility_off'" @click="passwordVisibility = !passwordVisibility"/>
          </template>
          <template v-slot:error>
            {{formErrors.password}}
          </template>
        </q-input>

        <q-input :type="passwordVisibilityConfirm ? 'text' : 'password'"
                 class="q-mt-sm full-width"
                 v-model="form.new_password"
                 outlined
                 autofocus
                 label="New password"
                 bg-color="white"
                 :error="formErrors.new_password !== null"
        >
          <template v-slot:append>
            <q-btn round dense flat :icon="passwordVisibilityConfirm ? 'visibility' : 'visibility_off'" @click="passwordVisibilityConfirm = !passwordVisibilityConfirm"/>
          </template>
          <template v-slot:error>
            {{formErrors.new_password}}
          </template>
        </q-input>

        <q-input :type="passwordVisibilityConfirm ? 'text' : 'password'"
                 class="q-mt-sm full-width"
                 v-model="form.new_password_confirmation"
                 outlined
                 autofocus
                 label="Confirm new password"
                 bg-color="white"
                 :error="formErrors.new_password_confirmation !== null"
        >
          <template v-slot:append>
            <q-btn round dense flat :icon="passwordVisibilityConfirm ? 'visibility' : 'visibility_off'" @click="passwordVisibilityConfirm = !passwordVisibilityConfirm"/>
          </template>
          <template v-slot:error>
            {{formErrors.new_password_confirmation}}
          </template>
        </q-input>

      </q-card-section>


      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="negative" label="Close" v-close-popup />
        <q-btn color="primary" @click="changePassword" rounded label="Save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
