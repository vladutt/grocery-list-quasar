<script setup>
const props = defineProps({sharedList: Array, otherPeople: Number, width: String, height: String, add: Boolean})
</script>

<template>
  <div class="shared">
    <q-img :style="'width: ' + width+ ';'+ 'height: '+ height"
           :class="index === 0 ? 'no-margin item' : 'item'"
           v-for="(shared, index) in sharedList"
           :key="index"
           :src="shared"
           alt=""
    />

    <div
         class="item icon-bubble text-center flex items-center"
         v-if="!add"
    >
     <span :style="otherPeople.toString().length === 2 ? 'margin-left: -5px' : ''">+{{ otherPeople }}</span>
    </div>

    <div v-else style="border: 1px #667085 dashed; border-radius: 20px;">
      <q-btn icon="add" style="width: 36px; height: 32px; box-shadow: none !important;" class="icon-bubble text-grey-6 no-padding bg-white"/>
    </div>

  </div>
</template>

<style scoped>

</style>
