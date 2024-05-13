<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="q-pa-md bg-white">
    <div class="flex justify-between">
        <div class="flex items-center">
          <img src="/assets/avatar.svg" alt=""/>

          <div class="q-ml-sm text-black">
            <p class="no-margin text-bold">Alexandra Sirbu</p>
            <p class="no-margin text-grey-7 text-caption">alexandra.sirbu@gmail.com</p>
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
import {useQuasar} from "quasar";

defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout'
})

const q = useQuasar();
q.dark.set(false)
</script>
