<script setup>
import {ref} from "vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router";
import {checkAvatar} from "src/helpers/helpers";
import {LocalStorage, useQuasar} from "quasar";


const dialog = defineModel({'required': true, default: false});
const route = useRoute()
const $q = useQuasar()

const sharedList = LocalStorage.getItem('selectedList').sharedList
let listId = route.params.id;

let ownerId = LocalStorage.getItem('selectedList').user_id === LocalStorage.getItem('user').id

const inputValue = ref('');

function send() {
  api.post('shared-list/share', {listId: listId, email: inputValue.value})
    .then((response) => {
      $q.notify('List shared with ' + inputValue.value)
    })
    .catch((response) => {
      alert(23)
    })

}

function remove(userID) {
  api.post('shared-list/remove', {listId: listId, user_id: userID})
    .then((response) => {
      $q.notify(response.data.data.message)

    })
    .catch((response) => {
      $q.notify({
        message: response.response.data.data.message,
        color: 'negative',
        position: 'bottom'
      })
    })
}
</script>

<template>
  <q-dialog
    v-model="dialog"
    class="q-mt-md"
  >
    <q-card style="width: 700px; max-width: 80vw;" class="q-pa-sm">

      <q-bar class="bg-white">
        Share
        <q-space/>
        <q-btn round class="icon-bubble active"  v-close-popup icon="close"/>
      </q-bar>

      <q-card-section>
        <q-input v-model="inputValue" label="Email" outlined>
          <template v-slot:append>
            <q-btn @click="send" round dense flat color="primary" icon="send" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section>
        <span class="text-weight-bold">Invited</span>

        <q-list>

          <q-item class="no-padding q-mb-md" v-for="(shared, index) in sharedList" :key="index">
            <q-item-section avatar >
              <q-avatar width="36px" rounded>
                <img :src="checkAvatar(shared)" alt=""/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1" class="text-weight-bold text-subtitle1">{{ shared.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn class="no-padding" v-if="ownerId" @click="remove(shared.id)" icon="remove"/>
            </q-item-section>
          </q-item>

        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
