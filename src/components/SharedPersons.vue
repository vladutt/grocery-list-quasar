<script setup>
import ShareDialog from "components/ShareDialog.vue";
import {onMounted, ref, watch} from "vue";
import {checkAvatar} from "src/helpers/helpers";

const props = defineProps({
  sharedList: Array,
  width: String,
  height: String,
  add: Boolean
})

let sharedListMutable = ref([...props.sharedList]);
const otherPeople = ref(0);
const dialogShare = ref(false)

function createOthers () {
  if (sharedListMutable.value.length > 6) {
    otherPeople.value = sharedListMutable.value.length - 5;
    sharedListMutable.value.splice(5, sharedListMutable.value.length);
  }
}

onMounted(() => {
  createOthers();
})

watch(props, async (newProps, oldProps) => {
  sharedListMutable.value = newProps.sharedList;

  createOthers();
})

</script>

<template>
  <div class="shared">
    <q-img :style="'width: ' + width+ ';'+ 'height: '+ height"
           :class="index === 0 ? 'no-margin item' : 'item'"
           v-for="(shared, index) in sharedListMutable"
           :key="index"
           :src="checkAvatar(shared)"
           alt=""
    />

    <div
         class="item icon-bubble text-center flex items-center"
         v-if="!add && otherPeople > 0"
    >
     <span :style="otherPeople.toString().length === 2 ? 'margin-left: -5px' : ''">+{{ otherPeople }}</span>
    </div>

    <div v-if="add" style="border: 1px #667085 dashed; border-radius: 20px;">
      <q-btn @click="dialogShare = !dialogShare" icon="add" style="width: 36px; height: 32px; box-shadow: none !important;" class="icon-bubble text-grey-6 no-padding bg-white"/>
    </div>

    <share-dialog v-model="dialogShare" :shared-list="props.sharedList"/>

  </div>
</template>

<style scoped>

</style>
