<script setup>
import {ref} from "vue";

const dialog = defineModel({'required': true, default: false});
const emit = defineEmits(['item']);


const tab = ref('popular')
const name = ref('')

const items = ['Branza', 'Carne', 'Lapte', 'Oua'];

const item = {
  id: 0,
  name: "",
  done: false,
  quantity: 1,
  unit: null,
  deleted: false,
};



function addItem(selectedItemName = '') {

  if (selectedItemName.length) {
    item.name = selectedItemName;
  }

  emit('item', item);
}
</script>

<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-left"
  >
    <q-card class="text-white">
      <q-bar class="bg-white q-mt-sm">
        <q-btn class="bg-primary" dense flat icon="arrow_back" v-close-popup></q-btn>
        <q-space></q-space>
        <q-input outlined autofocus class="full-width" bg-color="white" v-model="item.name" dense/>
      </q-bar>

      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          class="text-primary"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="popular" label="Popular" />
          <q-tab name="recent" label="Recent" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="popular" class="no-padding">
            <div class="text-black">

              <q-card-section class="no-padding">
                  <q-item v-for="(item, index) in items" :key="index" class="no-padding">
                    <q-item-section class="row no-wrap">

                      <div class="text-weight-bold">
                        <q-btn icon="add" size="sm" color="primary" round  @click="addItem(item)"/>
                        {{ item }}
                      </div>

                    </q-item-section>
                  </q-item>
              </q-card-section>

            </div>
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
