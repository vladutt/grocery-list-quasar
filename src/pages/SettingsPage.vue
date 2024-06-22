<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {LocalStorage} from "quasar";
import EditProfile from "components/SettingsPage/EditProfile.vue";
import ChangePassword from "components/SettingsPage/ChangePassword.vue";
import ChangeEmail from "components/SettingsPage/ChangeEmail.vue";

const router = useRouter();
const editProfileDialog = ref(false);
const changePasswordDialog = ref(false);
const changeEmailDialog = ref(false);

function logout() {
  LocalStorage.removeItem('user');
  LocalStorage.removeItem('token');

  window.location.reload();
}

</script>

<template>
  <q-btn class="bg-primary q-mb-md" dense round flat icon="arrow_back" color="white" @click="router.push('/')" />


  <h6 class="no-margin text-grey-6">Account Settings</h6>

  <q-list>
    <q-item class="no-padding">
      <q-item-section>
        <q-item-label lines="1" class="text-weight-bold text-subtitle1" @click="editProfileDialog = !editProfileDialog">Edit Profile</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="chevron_right" />
      </q-item-section>

      <edit-profile v-model="editProfileDialog"/>
    </q-item>

    <q-item class="no-padding">
      <q-item-section>
        <q-item-label lines="1" class="text-weight-bold text-subtitle1" @click="changePasswordDialog = !changePasswordDialog">Change password</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="chevron_right" />
      </q-item-section>

      <change-password v-model="changePasswordDialog"/>
    </q-item>

    <q-item class="no-padding q-mb-lg">
      <q-item-section>
        <q-item-label lines="1" class="text-weight-bold text-subtitle1" @click="changeEmailDialog = !changeEmailDialog">Change email</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="chevron_right" />
      </q-item-section>

      <change-email v-model="changeEmailDialog"/>
    </q-item>

    <q-separator spaced />
    <h6 class="no-margin text-grey-6 q-pt-lg">More</h6>

    <q-item class="no-padding">
      <q-item-section>
        <q-item-label lines="1" class="text-weight-bold text-subtitle1" @click="logout">Logout</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="logout" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped>

</style>
