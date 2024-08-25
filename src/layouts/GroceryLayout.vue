<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="q-pa-md bg-white">
    <div class="flex justify-between">
        <div class="flex items-center">
          <q-btn size="md" icon="arrow_back" @click="router.push('/')" class="icon-bubble active" title="Back"/>
        </div>

        <shared-persons :add="true" width="39px" height="39px" :shared-list="sharedList"></shared-persons>

        <div class="flex items-center vertical-middle justify-center">
          <q-btn-dropdown size="md" class="icon-bubble active" dropdown-icon="more_vert">
            <q-list class="text-weight-bold">
              <q-item clickable v-close-popup class="flex justify-between">
                <q-item-section style="min-width: 0" class="q-pr-sm" avatar>
                  <q-icon  name="share" />
                </q-item-section>
                <q-item-section @click="shareList">
                  <q-item-label>Share List</q-item-label>
                </q-item-section>
              </q-item>

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
                <q-item-section style="min-width: 0" class="q-pr-sm" avatar>
                  <q-icon  name="o_delete" />
                </q-item-section>
                <q-item-section @click="deleteDialog = !deleteDialog">
                  <q-item-label class="text-negative">Delete</q-item-label>
                </q-item-section>
              </q-item>
<!--              <q-item clickable v-close-popup>-->
<!--                <q-item-section>-->
<!--                  <q-toggle-->
<!--                    @click="changeState('useAddList')"-->
<!--                    v-model="options.useAddList"-->
<!--                    label="Use add List"-->
<!--                    left-label-->
<!--                  />-->
<!--                </q-item-section>-->
<!--              </q-item>-->

            </q-list>
          </q-btn-dropdown>
        </div>


      <q-dialog v-model="deleteDialog" transition-show="scale" transition-hide="scale">
        <q-card class="bg-primary text-white" style="width: 300px">

          <q-card-section>
            You wanna delete this list?
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn color="negative" flat label="DELETE" @click="deleteList" />
            <q-space/>
            <q-btn color="primary" label="CANCEL" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
import {useRoute, useRouter} from "vue-router";
import {inject, onMounted, ref} from "vue";
import {staticOptions} from "src/static/settings.js";
import {api} from "boot/axios";


defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout'
})
const bus = inject('bus')

const route = useRoute()
let listId = route.params.id;
const sharedList = ref([]);
const currentList = ref([]);
const deleteDialog = ref(false);

const router = useRouter()

function changeState(key) {
  LocalStorage.set(key, options.value[key])
}

const options = ref(staticOptions);

const $q = useQuasar();


onMounted(() => {
  currentList.value = LocalStorage.getItem('selectedList');

  sharedList.value = currentList.value.sharedList;
})

function deleteList() {

    api.delete('lists/' + currentList.value.id, {
      params: {
        remove: currentList.value.user_id === LocalStorage.getItem('user').id
      }
    })
      .then((response) => {
        $q.notify({
          color: 'positive',
          position: 'bottom',
          message: 'List ' + currentList.value.name + ' was deleted!',
          icon: 'remove'
        })

        LocalStorage.setItem('selectedList', null);
        router.push('/');
      })
}
function shareList() {
  bus.emit('share-list', true)
}
</script>
