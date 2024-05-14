<script setup>

</script>

<template>
  <q-card class="text-white">
    <q-bar class="bg-white q-mt-sm">
      <q-btn class="bg-primary" dense flat icon="arrow_back" v-close-popup></q-btn>
      <q-space></q-space>
      <q-input outlined autofocus class="full-width" bg-color="white" v-model="search" dense/>
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
        <q-tab name="popular" label="Popular"/>
        <q-tab name="recent" label="Recent"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="popular" class="no-padding">
          <q-card-section class="no-padding">

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
</template>

<style scoped>

</style>
