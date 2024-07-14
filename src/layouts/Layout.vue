<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="q-pa-md bg-white">
    <div class="flex justify-between">
        <div class="flex items-center" @click="router.push('/settings')">
          <img :src="user.avatar" alt="" width="32" height="32" style="border-radius: 20px" />

          <div class="q-ml-sm text-black">
            <p class="no-margin text-bold">{{ user.name }}</p>
            <p class="no-margin text-grey-7 text-caption">{{ user.email }}</p>
          </div>
        </div>

        <div class="flex items-center vertical-middle justify-center">
          <div class="icon-bubble active q-mr-sm">
            <q-icon size="1.3rem" style="color: #7F56D9" name="o_emoji_events"/>
          </div>

          <div class="icon-bubble">
           <q-icon size="1.3rem" style="color: #757575" name="o_notifications"/>
          </div>

        </div>

    </div>
    </q-header>

    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {LocalStorage, useQuasar} from "quasar";
import {useRouter} from "vue-router";

defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout'
})

let user = LocalStorage.getItem('user');
const router = useRouter()

const q = useQuasar();
q.dark.set(false)
</script>
