<template>
  <q-inner-loading
    :showing="shoppingLists === null"
    label="Please wait..."
    label-class="text-purple"
    label-style="font-size: 1.1em"
  />

  <div class="text-center full-height q-px-lg" style="margin-top: 20vh" v-if="shoppingLists !== null && shoppingLists.length === 0">
    <div class="flex items-center justify-center w-full">
      <img src="assets/director.svg" alt=""/>
    </div>

    <h5 class="text-weight-bolder no-margin">Start by creating a new list.</h5>
    <p>Your smart shopping list will appear here once you begin.</p>
  </div>

  <div v-else class="q-mt-sm">

    <section id="grocery-lists">
      <q-pull-to-refresh @refresh="refresh">
      <div class="grocery-list-item"
           v-touch-hold.mouse="editDialog(index)"
           v-for="(shoppingList, index) in shoppingLists"
           :key="index"
           @click="selectList(shoppingList)"
      >

        <h4 class="text-h6 text-weight-bold no-margin">
          {{ shoppingList.name }}
        </h4>
        <shared-persons v-if="typeof shoppingList.sharedList !== 'undefined'" :sharedList="shoppingList.sharedList" :other-people="shoppingList.otherPeople ?? 0"/>

        <item-list-progressbar
          :checked-items="shoppingList.checkedItems"
          :total-items="shoppingList.totalItems"
          :shared="shoppingList.owner ?? ''"
        ></item-list-progressbar>

      </div>
      </q-pull-to-refresh>
    </section>

  </div>

  <div class="absolute-bottom-right q-mb-xl q-mr-md" style="position: fixed">
    <q-btn elevated size="20px" class="q-pa-md plus-btn shadow-box shadow-4" icon="add" @click="dialog = !dialog"></q-btn>
  </div>


  <q-dialog v-model="dialog">
    <q-card style="width: 350px">

      <q-card-section class="row items-center no-wrap">
        <q-btn size="sm" v-if="newList.id > 0" icon="delete" color="negative" class="icon-bubble" @click="secondDialog = true" title="Delete"/>
        <q-space v-if="newList.id > 0"/>
        <h6 class="no-margin text-weight-bold">{{newList.id > 0 ? 'Edit' : 'Create'}} a list</h6>
        <q-space/>
        <q-btn size="sm" icon="close" class="icon-bubble active" @click="dialog = false" title="close"/>
      </q-card-section>

      <q-card-section>
        <div>
          <q-input bg-color="white" autofocus v-model="newList.name" input-style="border-radius: 20px" outlined label="List name*" class="full-width q-mb-sm"/>
        </div>

        <q-btn color="primary" class="full-width border-rounded q-mt-md" style="padding: 13px" @click="saveList()" icon="add">Save</q-btn>

      </q-card-section>
    </q-card>
  </q-dialog>


  <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn color="negative" flat label="DELETE" @click="deleteItem" />
        <q-space/>
        <q-btn color="primary" label="CANCEL" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from 'vue-router'
import SharedPersons from "components/SharedPersons.vue";
import {api} from "boot/axios";
import {LocalStorage, useQuasar} from "quasar";
import ItemListProgressbar from "components/ItemListProgressbar.vue";
defineOptions({
  name: 'IndexPage'
});

const dialog = ref(false);
const secondDialog = ref(false);
const $q = useQuasar()
const router = useRouter()
const newList = ref({id: 0, "name": null, "tag": null});

const shoppingLists = ref(null);

function selectList(shoppingList) {
  LocalStorage.set('selectedList', shoppingList);

  router.push('/grocery-list/'+shoppingList.id+'/'+shoppingList.name)
}

function hideDialog() {
  dialog.value = false;

  newList.value.name = null;
  newList.value.tag = null;
  newList.value.id = 0;
}

function saveList() {
  if (typeof newList.value.id !== 'undefined' && newList.value.id > 0) {
    api.put('/lists/'+newList.value.id, {name: newList.value.name, tag: newList.value.tag})
      .then((response) => {
        $q.notify({
          color: 'positive',
          position: 'bottom',
          message: 'List ' + newList.value.name + ' was edited!',
          icon: 'check'
        })


        hideDialog();
      })

  } else {
    api.post('/lists', {name: newList.value.name, tag: newList.value.tag})
      .then((response) => {
        $q.notify({
          color: 'positive',
          position: 'bottom',
          message: 'List ' + newList.value.name + ' was added!',
          icon: 'check'
        })

        shoppingLists.value.push(response.data.data)
        hideDialog();
      })
  }
}

function editDialog(index) {

  return function (props) {
    let currentList = shoppingLists.value[index];

    newList.value.name = currentList.name;
    newList.value.tag = currentList.tag;
    newList.value.id = currentList.id;

    dialog.value = currentList.user_id === LocalStorage.getItem('user').id;
  }

}

function deleteItem() {

  api.delete('lists/' + newList.value.id)
    .then((response) => {
      $q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'List ' + newList.value.name + ' was deleted!',
        icon: 'remove'
      })

      let indexToDelete = shoppingLists.value.findIndex(item => item.id === newList.value.id);
      shoppingLists.value.splice(indexToDelete, 1);

      hideDialog();
      secondDialog.value = false;
  })



}

async function refresh(done) {
  await getShoppingLists();

  done()
}

function getShoppingLists() {
  return api.get('/lists')
    .then((response) => {
      shoppingLists.value = response.data.data.items;
    })
}

onMounted(() => {
  getShoppingLists()
})
</script>
