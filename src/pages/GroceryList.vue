<template>
  <div class="GroceryList">

    <h6 class="text-h5 text-weight-bolder no-margin">{{ groceryList.name }}</h6>

    <list-and-tags :checked-items="groceryListCompleted"
                   :total-items="groceryItemList.filter(item => !item.deleted).length"/>

    <q-card-section class="no-padding q-mt-md" style="margin-bottom: 50px;">
      <q-card-actions class="no-padding">
        <div class="full-width full-height">
          <q-list separator v-if="groceryItemList.length">
            <transition-group
              appear
              enter-active-class="animated backInLeft"
              leave-active-class="animated backOutLeft slow"
            >
                <q-slide-item
                  v-show="!item.deleted"
                  @left="onLeft(index)"
                  @right="onRight(index)"
                  v-for="(item, index) in groceryItemList"
                  :key="index"
                  :id="index"
                  ref="itemRefs"
                  class="border-rounded q-mb-md no-border"
                  @click="editItem(item)"
                  right-color="negative"
                  left-color="positive"
                >

                  <template v-slot:left>
                    <q-icon name="done"/>
                    Done
                  </template>
                  <template v-slot:right>
                    <q-icon name="delete"/>
                    Delete
                  </template>

                  <q-item v-ripple
                    class="full-width border-rounded"
                    :class="item.done ? 'item-done' : ''"
                    style="background: #FCFCFD; border: 1px solid #EAECF0"
                  >
                    <q-item-section avatar class="no-padding" style="min-width: 0">
                      <q-checkbox @click="onLeft(index)" v-model="item.done" :true-value="1" :false-value="0" color="primary"/>
                    </q-item-section>

                    <q-item-section>
                      <p class="no-margin text-weight-bold" :class="item.done ? 'text-primary' : 'text-black '">
                        {{ item.name }}</p>
                    </q-item-section>

                    <q-item-section class="text-right" v-if="item.unit || item.quantity">
                      {{ item.quantity }} {{ item.unit }}
                    </q-item-section>
                  </q-item>
                </q-slide-item>
            </transition-group>

          </q-list>

          <div v-else class="text-center q-pt-xl">
            <q-img src="assets/check-list.svg" width="37px"/>

            <h4 class="text-h5 text-weight-bold no-margin">Add item to your list</h4>
            <p class="text-body2 text-grey-7">Your smart shopping list will shown here. start by creating a new list</p>
          </div>

          <q-btn @click="addItem"
                 v-if="groceryItemList.length === 0"
                 class="bg-primary full-width border-rounded"
                 style="padding: 13px 0"
                 text-color="white"
                 icon="o_add_box"
                 no-caps
                 label="Add a new Item"/>
        </div>
      </q-card-actions>
    </q-card-section>

    <q-space ref="itemsScroll"/>

    <q-page-sticky position="bottom" :offset="[18, 18]" class="q-mb-md">
      <q-btn v-if="groceryItemList.length" @click="addItem" class="bg-primary full-width border-rounded" style="padding: 13px 0" text-color="white"
             icon="o_add_box" no-caps label="Add a new Item"/>
    </q-page-sticky>

  </div>

  <dialog-add-items @item="addItems" input="" v-model="dialog"/>

  <q-dialog v-model="dialogEdit" position="bottom" @hide="hideDialog">
    <q-card style="width: 350px">

      <q-card-section class="q-mb-md row items-center no-wrap no-margin" style="padding-bottom: 0">
        <p class="no-padding no-margin title">{{ addingItem ? 'Add' : 'Edit' }} an item </p>
        <q-space/>
        <q-btn size="sm" icon="close" class="icon-bubble active" @click="dialogEdit = false" title="close"/>
      </q-card-section>


      <q-card-section>
        <q-input autofocus v-model="selectedItem.name" outlined class="full-width q-mb-sm"/>

        <q-input bg-color="white" v-model="selectedItem.quantity" label="Quantity" outlined>
          <template v-slot:before>
            <q-btn round dense flat icon="remove" @click="selectedItem.quantity <= 1 ? '' : selectedItem.quantity--"/>
          </template>

          <template v-slot:after>
            <q-btn round dense flat icon="add" @click="selectedItem.quantity++"/>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="flex items-center justify-center no-padding q-mb-sm">
        <q-card-actions class="row items-center no-wrap no-margin no-padding">
          <q-item-label class="q-mr-sm">Unit:</q-item-label>

          <q-btn
            size="sm"
            no-caps
            class="text-weight-bold text-body1"
            :color="selectedItem.unit === unit ? 'primary' : 'secondary'"
            v-for="(unit, index) in units"
            :key="index"
            @click="selectedItem.unit = unit"
            :label="unit"/>

        </q-card-actions>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn color="primary" rounded label="Add item" @click="hideDialog" />
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup>
import {useRoute} from "vue-router";
import ListAndTags from "components/ListAndTags.vue";
import {computed, onMounted, ref} from "vue";
import {LocalStorage, scroll, useQuasar} from 'quasar'
import DialogAddItems from "components/DialogAddItems.vue";
import {finalize, findObjectKeyInArray} from "src/helpers/helpers";
import {api} from "boot/axios";

const route = useRoute()
let params = route.params;
const listID = params.id;
const $q = useQuasar()

const { getScrollTarget, setVerticalScrollPosition } = scroll
const itemRefs = ref([])
const itemsScroll = ref(null);
const dialog = ref(false);
const dialogEdit = ref(false);
const addingItem = ref(false);
const units = ['g', 'kg', 'ml', 'l'];

const selectedItem = ref({
  id: 0,
  name: '',
  done: false,
  quantity: 1,
  unit: null,
  deleted: false,
})

const groceryList = {
  id: listID,
  name: params.name,
  tag: params.tag,
};

const groceryItemList = ref([]);

function editItem(item) {
  dialogEdit.value = true;

  selectedItem.value = item;
}

function onRight(index) {
  let currentItem = groceryItemList.value[index]

  api.delete('/items/'+currentItem.id, {params: {list_id: listID}})
    .then((response) => {
        finalize(itemRefs.value[index].reset, 100);
        currentItem.deleted = true;
    })
    .catch((response) => {
      alert('nooo')
    })


}

function onLeft(index) {
  let currentItem = groceryItemList.value[index]
  currentItem.done = 1;

  api.post('/items/'+currentItem.id, {
    list_id: listID
  })
    .then((response) => {

    })
    .catch((error) => {
      currentItem.done = 0;
    })

  finalize(itemRefs.value[index].reset, 300);
}

function addItem() {
  addingItem.value = true;

  if (LocalStorage.getItem('useAddList') === true) {
    dialog.value = true;
    return;
  }

  selectedItem.value.id = 0;
  dialogEdit.value = true;
}

function hideDialog() {

  let existsItem = findObjectKeyInArray(groceryItemList.value, selectedItem.value, 'id');

  if (existsItem) {

    api.put('/items/'+existsItem.id, {
      list_id: listID,
      name: existsItem.name,
      quantity: existsItem.quantity,
      unit: existsItem.unit,
    })
      .then((response) => {

      })
      .catch((error) => {

      })

  }


  if (selectedItem.value.id === 0) {

    addItems(selectedItem.value)

    if (LocalStorage.getItem('scrollToBottom')) {
      const el = itemsScroll.value.$el;
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 500
      setVerticalScrollPosition(target, offset, duration)
    }
  }

  selectedItem.value = {
    id: 0,
    name: '',
    done: 0,
    quantity: 1,
    unit: null,
    deleted: false,
  };

  dialogEdit.value = false;
}

async function addItems(item) {
  let exists = findObjectKeyInArray(groceryItemList.value, item, 'name')

  if (exists !== undefined) {
    exists.quantity = item.quantity

    if (exists.quantity === 0) {
      groceryItemList.value[groceryItemList.value.length - 1].deleted = 1;
    }

    return;
  }

  if (item.name.trim().length > 0) {

    await api.post('items', {
      list_id: listID,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
    })
      .then((response) => {
        let itemObject = {
          id: response.data.data.id,
          name: item.name,
          done: 0,
          quantity: item.quantity,
          unit: item.unit,
          deleted: false,
        }

        groceryItemList.value.push(itemObject)
    })
      .catch((error) => {
        $q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Something went wrong... Sorry, please try again later.',
          icon: 'check'
        })
      })

  }
}

const groceryListCompleted = computed(() => {
  return groceryItemList.value.filter(item => item.done && !item.deleted).length
})

onMounted(() => {
  api.get('/items', {params: {list_id: listID}})
    .then((response) => {
      groceryItemList.value = response.data.data.items;
    })
})
</script>
