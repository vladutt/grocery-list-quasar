<script setup>
import {onMounted, ref} from "vue";

const dialog = defineModel({'required': true, default: false});
const emit = defineEmits(['item']);


const tab = ref('popular')
const search = ref('')

const items = ref([
  {
    name: 'Rosii',
    quantity: 0,
  },
  {
    name: 'Castraveti',
    quantity: 0,
  },
  {
    name: 'Conopida',
    quantity: 0,
  },
  {
    name: 'Sarmale',
    quantity: 0,
  },
  {
    name: 'Rosii',
    quantity: 0,
  },
  {
    name: 'Castraveti',
    quantity: 0,
  },
  {
    name: 'Conopida',
    quantity: 0,
  },
  {
    name: 'Sarmale',
    quantity: 0,
  },
  {
    name: 'Rosii',
    quantity: 0,
  },
  {
    name: 'Castraveti',
    quantity: 0,
  },
  {
    name: 'Conopida',
    quantity: 0,
  },
  {
    name: 'Sarmale',
    quantity: 0,
  },
  {
    name: 'Rosii',
    quantity: 0,
  },
  {
    name: 'Castraveti',
    quantity: 0,
  },
  {
    name: 'Conopida',
    quantity: 0,
  },
  {
    name: 'Sarmale',
    quantity: 0,
  },
  {
    name: 'Rosii',
    quantity: 0,
  },
  {
    name: 'Castraveti',
    quantity: 0,
  },
  {
    name: 'Conopida',
    quantity: 0,
  },
  {
    name: 'Sarmale',
    quantity: 0,
  },
  {
    name: 'Rosii',
    quantity: 0,
  },
  {
    name: 'Castraveti',
    quantity: 0,
  },
  {
    name: 'Conopida',
    quantity: 0,
  },
  {
    name: 'Sarmale',
    quantity: 0,
  },
  {
    name: 'Rosii',
    quantity: 0,
  },
  {
    name: 'Castraveti',
    quantity: 0,
  },
  {
    name: 'Conopida',
    quantity: 0,
  },
  {
    name: 'Sarmale',
    quantity: 0,
  },
]);

function addItem(index) {
  items.value[index].quantity++;
  emit('item', items.value[index]);
}

function removeItem(index) {
  items.value[index].quantity--;
  emit('item', items.value[index]);
}
</script>

<template>
  <q-dialog
    v-model="dialog"
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-left"
    class="bg-white q-mt-md"
  >

    <q-card class="text-white" >
      <q-bar class="bg-white" style="position: fixed; z-index: 99; padding: 27px 10px;">
        <q-btn class="bg-primary" dense flat icon="arrow_back" v-close-popup></q-btn>
        <q-space></q-space>
        <q-input outlined autofocus class="full-width" bg-color="white" v-model="search" dense/>

        <q-tabs
          v-model="tab"
          dense
          class="text-primary"
          active-color="primary"
          indicator-color="primary"
          align="justify"

        >
          <q-tab name="popular" label="Popular"/>
          <q-tab name="recent" label="Recent"/>
        </q-tabs>
      </q-bar>

      <q-card-section>


        <q-tab-panels v-model="tab" animated class="q-mt-xl">
          <q-tab-panel name="popular" class="no-padding">
            <q-card-section class="no-padding scroll">

            <div class="text-black">

<!--                <q-scroll-area class="full-height full-width">-->

                <q-item v-for="(item, index) in items" :key="index" class="no-padding">
                  <q-item-section class="row no-wrap">

                    <div class="text-weight-bold row items-center">
                      <q-btn icon="add" class="q-mr-sm" size="sm" color="primary" round @click="addItem(index)"/>
                      {{ item.name }}
                      <q-space/>
                      <div v-if="item.quantity">
                        {{ item.quantity > 0 ? item.quantity : '' }}
                        <q-btn icon="remove" text-color="red" class="q-ml-sm" size="sm"  round @click="removeItem(index)"/>
                      </div>
                    </div>

                  </q-item-section>
                </q-item>

<!--                </q-scroll-area>-->

            </div>
            </q-card-section>

          </q-tab-panel>

          <q-tab-panel name="recent">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style>
.q-item {
  min-height: 37px;
}
</style>
