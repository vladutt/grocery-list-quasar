<script setup>
import {ref} from "vue";
import {LocalStorage, useQuasar} from "quasar";
import {api} from "boot/axios";
import {setPropsToNull, sortErrorsFromRequest} from "src/helpers/helpers";

const $q = useQuasar()
const dialog = defineModel({'required': true, default: false});

const user = ref(LocalStorage.getItem('user'));

const form = ref({
  avatar: null,
  name: user.value.name
});

const formErrors = ref({
  avatar: null,
  name: null
});

function saveProfile() {
  let formData = new FormData();
  formData.append('avatar', form.value.avatar);
  formData.append('name', form.value.name);

  api.post('/user/edit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((data) => {
      dialog.value = false;

      $q.notify({
        type: 'positive',
        message: `Profile saved successfully.`,
      })

      setPropsToNull(formErrors.value);
    })
    .catch((error) => {
      let errors = error.response.data.errors;
      sortErrorsFromRequest(formErrors.value, errors);
    })

}

function onRejected() {
  $q.notify({
    type: 'negative',
    message: `File size should not exceed 2MB.`
  })
}
</script>

<template>
  <q-dialog v-model="dialog" full-width>
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit profile</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-center" >
        <q-avatar class="q-mb-sm">
          <img src="/assets/avatar.svg" alt="avatar"/>
        </q-avatar>

        <q-file outlined
                max-file-size="3097152"
                @rejected="onRejected"
                v-model="form.avatar"
                label="Change avatar"
                :error="formErrors.avatar !== null"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-slot:error>
            {{ formErrors.avatar }}
          </template>
        </q-file>

        <q-input class="q-mt-sm full-width"
                 v-model="form.name"
                 outlined
                 autofocus
                 label="Name"
                 bg-color="white"
                 :error="formErrors.name !== null"
        >
          <template v-slot:error>
            {{ formErrors.name }}
          </template>
        </q-input>

      </q-card-section>


      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="negative" label="Close" v-close-popup />
        <q-btn color="primary" rounded @click="saveProfile" label="Save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
