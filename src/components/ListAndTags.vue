<script setup>
import {computed} from "vue";

const props = defineProps({checkedItems: Number, totalItems: Number, tag: String})

let progress = computed(() => {
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

      <div id="tag" class="text-weight-bold">
        <q-icon style="color: #667085" size="xs" name="o_sell"/> {{ tag }}
      </div>
      <q-linear-progress :value="progress" rounded color="accent" class="q-mt-sm" />
    </q-card-actions>
  </q-card-section>
</template>
