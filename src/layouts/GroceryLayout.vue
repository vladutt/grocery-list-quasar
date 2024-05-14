<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="q-pa-md bg-white">
    <div class="flex justify-between">
        <div class="flex items-center">
          <q-btn size="md" icon="arrow_back" @click="router.push('/')" class="icon-bubble active" title="Back"/>
        </div>

        <shared-persons :add="true" width="39px" height="39px" :other-people="5" :shared-list="['/assets/avatar.svg', '/assets/avatar.svg']"></shared-persons>

        <div class="flex items-center vertical-middle justify-center">
          <q-btn-dropdown size="md" class="icon-bubble active" dropdown-icon="more_vert">
            <q-list class="text-weight-bold">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-toggle
                    @click="changeState('scrollToBottom')"
                    v-model="options.scrollToBottom"
                    label="Scroll to bottom"
                    left-label
                  />
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-toggle
                    @click="changeState('useAddList')"
                    v-model="options.useAddList"
                    label="Use add List"
                    left-label
                  />
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
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
import SharedPersons from "components/SharedPersons.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {staticOptions} from "src/static/settings.js";


defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout'
})
const router = useRouter()

function changeState(key) {
  LocalStorage.set(key, options.value[key])
}

const options = ref(staticOptions);

const q = useQuasar();
q.dark.set(false)
</script>
