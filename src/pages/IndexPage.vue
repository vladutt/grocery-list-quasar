<template>
  <div class="text-center full-height q-px-lg" style="margin-top: 20vh" v-if="shoppingLists.length === 0">
    <div class="flex items-center justify-center w-full">
      <img src="src/assets/director.svg" alt=""/>
    </div>

    <h5 class="text-weight-bolder no-margin">Start by creating list</h5>
    <p>Your smart shopping list will shown here. start by creating a new list</p>
  </div>

  <div v-else class="q-mt-md">

    <q-tabs
      v-model="tab"
      active-color="accent"
      class="tabs-border-rounded"
      inline-label
      :breakpoint="0"
      align="justify"
    >
      <q-tab name="mails" label="Resents"/>
      <q-tab name="alarms" class="border-right" label="Draft" />
      <q-tab name="movies" label="Shared" />
    </q-tabs>


    <section id="grocery-lists">
      <div class="grocery-list-item"
           v-for="(shoppingList, index) in shoppingLists"
           :key="index"
           @click="router.push('/grocery-list/'+shoppingList.id)"
      >

        <h4 class="text-h6 text-weight-bold no-margin">{{ shoppingList.name }}</h4>
        <shared-persons :sharedList="shoppingList.sharedList" :other-people="shoppingList.otherPeople"/>

        <list-and-tags
          :checked-items="shoppingList.checkedItems"
          :total-items="shoppingList.totalItems"
          :tag="shoppingList.tag"
        ></list-and-tags>

      </div>
    </section>

  </div>

  <div class="absolute-bottom-right q-mb-xl q-mr-md" style="position: fixed">
    <q-btn elevated size="20px" class="q-pa-md plus-btn shadow-box shadow-4" icon="add" @click="dialog = !dialog"></q-btn>
  </div>


  <q-dialog v-model="dialog">
    <q-card style="width: 350px">

      <q-card-section class="row items-center no-wrap">
        <h6 class="no-margin text-weight-bold">Create a list</h6>
        <q-space/>
        <q-btn size="sm" icon="close" class="icon-bubble active" title="close"/>
      </q-card-section>

      <q-card-section>
        <div>
          <q-input bg-color="white" autofocus v-model="newList.name" input-style="border-radius: 20px" outlined label="List name*" class="full-width q-mb-sm"/>
          <q-input bg-color="white" v-model="newList.tag" input-style="border-radius: 20px" outlined label="List tag" class="full-width q-mt-sm"/>
        </div>

        <q-btn color="primary" class="full-width border-rounded q-mt-md" style="padding: 13px" icon="add">Save</q-btn>

      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router'
import ListAndTags from "components/ListAndTags.vue";
import SharedPersons from "components/SharedPersons.vue";

defineOptions({
  name: 'IndexPage'
});

const dialog = ref(false);
const router = useRouter()
const newList = ref({"name": null, "tag": null});

const shoppingLists = [
  {
    id: 1,
    name: "Grocery List",
    tag: "kitchen items",
    totalItems: 7,
    checkedItems: 1,
    sharedList: [],
    otherPeople: 15,
  },
  {
    id: 2,
    name: "Găteală sămbătă",
    tag: "Paste e Basta",
    totalItems: 5,
    checkedItems: 3,
    sharedList: ['/assets/avatar.svg', '/assets/avatar.svg'],
    otherPeople: 8,
  },
  {
    id: 3,
    name: "Grocery List",
    tag: "kitchen items",
    totalItems: 7,
    checkedItems: 1,
    sharedList: ['/assets/avatar.svg', '/assets/avatar.svg'],
    otherPeople: 15,
  },
  {
    id: 4,
    name: "Găteală sămbătă",
    tag: "Paste e Basta",
    totalItems: 5,
    checkedItems: 3,
    sharedList: ['/assets/avatar.svg', '/assets/avatar.svg'],
    otherPeople: 8,
  },
  {
    id: 5,
    name: "Grocery List",
    tag: "kitchen items",
    totalItems: 7,
    checkedItems: 1,
    sharedList: ['/assets/avatar.svg', '/assets/avatar.svg'],
    otherPeople: 15,
  },
  {
    id: 6,
    name: "Găteală sămbătă",
    tag: "Paste e Basta",
    totalItems: 5,
    checkedItems: 3,
    sharedList: ['/assets/avatar.svg', '/assets/avatar.svg'],
    otherPeople: 8,
  },
  {
    id: 7,
    name: "Grocery List",
    tag: "kitchen items",
    totalItems: 7,
    checkedItems: 1,
    sharedList: ['/assets/avatar.svg', '/assets/avatar.svg'],
    otherPeople: 15,
  },
  {
    id: 8,
    name: "Găteală sămbătă",
    tag: "Paste e Basta",
    totalItems: 5,
    checkedItems: 3,
    sharedList: ['/assets/avatar.svg', '/assets/avatar.svg'],
    otherPeople: 8,
  },
];

const tab = ref('mails');
</script>
