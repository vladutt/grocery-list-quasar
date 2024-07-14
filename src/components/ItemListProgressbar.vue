<script setup>
import {computed} from "vue";

const props = defineProps({checkedItems: Number, totalItems: Number, shared: {type: String, default: ''}})

let progress = computed(() => {
  if (props.totalItems === 0) {
    return 0;
  }

  return props.checkedItems/props.totalItems
})
</script>

<template>
  <q-card-section class="no-padding q-mt-sm">
    <q-card-actions class="justify-between no-padding text-grey-7">

      <div id="list-completed" class="text-weight-bold">
        <q-icon style="color: #667085" size="xs" name="format_list_bulleted"/>
        List {{ checkedItems }}/{{ totalItems }} Completed
      </div>

      <div v-if="props.shared.length">
        Shared by: {{ props.shared }}
      </div>

      <q-linear-progress :value="progress" rounded color="accent" class="q-mt-sm" />
    </q-card-actions>
  </q-card-section>
</template>
