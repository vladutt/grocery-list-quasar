<template>
  <div class="GroceryList">

    <h6 class="text-h5 text-weight-bolder no-margin">{{ groceryList.name }}</h6>

    <list-and-tags :tag="groceryList.tag" :checked-items="groceryList.checkedItems"
                   :total-items="groceryList.totalItems"/>

    <q-card-section class="no-padding q-mt-md" style="margin-bottom: 50px;">
      <q-card-actions class="no-padding">
        <div class="full-width">
          <q-list separator>
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
                      <q-checkbox v-model="item.done" color="primary"/>
                    </q-item-section>

                    <q-item-section>
                      <p class="no-margin text-weight-bold" :class="item.done ? 'text-primary' : 'text-black '">
                        {{ item.name }}</p>
                    </q-item-section>

                    <q-item-section class="text-right" v-if="item.unit">
                      {{ item.quantity }} {{ item.unit }}
                    </q-item-section>
                  </q-item>
                </q-slide-item>
            </transition-group>

          </q-list>
        </div>
      </q-card-actions>
    </q-card-section>

    <q-space ref="itemsScroll"/>

    <q-page-sticky position="bottom" :offset="[18, 18]" class="q-mb-md">
      <q-btn @click="addItem" class="bg-primary full-width border-rounded" style="padding: 13px 0" text-color="white"
             icon="o_add_box" no-caps label="Add a new Item"/>
    </q-page-sticky>

  </div>

  <dialog-add-items @item="addItems" input="" v-model="dialog"/>

<!--  <q-dialog v-model="dialog" position="bottom" @hide="hideDialog">-->
<!--    <q-card style="width: 350px">-->

<!--      <q-card-section class="q-mb-md row items-center no-wrap no-margin" style="padding-bottom: 0">-->
<!--        <p class="no-padding no-margin title">{{ addingItem ? 'Add2' : 'Edit' }} an item </p>-->
<!--        <q-space/>-->
<!--        <q-btn size="sm" icon="close" class="icon-bubble active" @click="dialog = false" title="close"/>-->
<!--      </q-card-section>-->


<!--      <q-card-section>-->
<!--        <q-input bg-color="white" autofocus v-model="selectedItem.name" outlined class="full-width q-mb-sm"/>-->

<!--        <q-input bg-color="white" v-model="selectedItem.quantity" label="Quantity" outlined>-->
<!--          <template v-slot:before>-->
<!--            <q-btn round dense flat icon="remove" @click="selectedItem.quantity <= 1 ? '' : selectedItem.quantity&#45;&#45;"/>-->
<!--          </template>-->

<!--          <template v-slot:after>-->
<!--            <q-btn round dense flat icon="add" @click="selectedItem.quantity++"/>-->
<!--          </template>-->
<!--        </q-input>-->
<!--      </q-card-section>-->

<!--      <q-card-section class="flex items-center justify-center no-padding q-mb-sm">-->
<!--        <q-card-actions class="row items-center no-wrap no-margin no-padding">-->
<!--          <q-item-label class="q-mr-sm">Unit:</q-item-label>-->

<!--          <q-btn-->
<!--            size="sm"-->
<!--            no-caps-->
<!--            class="text-weight-bold text-body1"-->
<!--            :color="selectedItem.unit === unit ? 'primary' : 'secondary'"-->
<!--            v-for="(unit, index) in units"-->
<!--            :key="index"-->
<!--            @click="selectedItem.unit === unit"-->
<!--            :label="unit"/>-->

<!--        </q-card-actions>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
<!--  </q-dialog>-->
</template>

<script setup>
import {useRoute} from "vue-router";
import ListAndTags from "components/ListAndTags.vue";
import {onMounted, ref} from "vue";
import {LocalStorage, scroll} from 'quasar'
import DialogAddItems from "components/DialogAddItems.vue";
import { inject } from 'vue'

const bus = inject('bus') // inside setup()
const { setVerticalScrollPosition, getScrollTarget } = scroll
const route = useRoute()
const listID = route.params.id;
const itemRefs = ref([])
const itemsScroll = ref(null);

const tab = ref('popular')
const dialog = ref(false);

const addingItem = ref(false);

const units = ['g', 'kg', 'ml', 'l'];

const selectedItem = ref({
  id: 1,
  name: "Banane",
  done: false,
  quantity: 1,
  unit: null,
  deleted: false,
})

const groceryList = {
  id: 1,
  name: "Grocery List",
  tag: "kitchen items",
  totalItems: 7,
  checkedItems: 1,
  sharedList: ['/assets/avatar.svg', '/assets/avatar.svg'],
  otherPeople: 15,
};

const groceryItemList = ref([
  {
    id: 1,
    name: "Banane",
    quantity: 1,
    unit: null,
    done: true,
    deleted: false,
  },
  {
    id: 2,
    name: "Ceapa",
    quantity: 1,
    unit: null,
    done: false,
    deleted: false,
  },
  {
    id: 3,
    name: "Rosii",
    quantity: 1,
    unit: null,
    done: false,
    deleted: false,
  }
]);

function editItem(item) {
  dialog.value = true;

  selectedItem.value = item;
}

function onRight(index) {
  setTimeout(() => {
    finalize(itemRefs.value[index].reset, 200);
    groceryItemList.value[index].deleted = true;
  }, 500)
}

onMounted(() => console.log(itemRefs.value))

function onLeft(index) {
  groceryItemList.value[index].done = true;

  finalize(itemRefs.value[index].reset);
}

function addItem(item) {
  addingItem.value = true;

  dialog.value = true;
}

function hideDialog() {
  if (addingItem.value && selectedItem.value.name.length > 0) {
    groceryItemList.value.push(selectedItem.value)

    if (LocalStorage.getItem('scrollToBottom')) {
      const el = itemsScroll.value.$el;
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 1000
      console.log(target, offset, duration);
      setVerticalScrollPosition(target, offset, duration)
    }

  }

  addingItem.value = false;
  dialog.value = false;
}


function addItems(item) {

  console.log(item);

  selectedItem.value = {
    id: groceryItemList.value[groceryItemList.value.length - 1].id + 1,
    name: item.name,
    done: false,
    quantity: 1,
    unit: null,
    deleted: false,
  }


  if (selectedItem.value.name.length > 0) {
    groceryItemList.value.push(selectedItem.value)
  }
}

function finalize(reset, timeout = 1000) {
  setTimeout(() => {
    reset()
  }, timeout)
}
</script>
