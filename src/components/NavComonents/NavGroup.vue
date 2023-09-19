<template>
  <div class="border-b border-gray-300 pb-4 mb-4">
    <button
      class="w-full flex items-center px-6 py-2 mt-4 border-l-4 border-transparent"
      @click="openChildren"
    >
      <Icon :icon="item.icon" color="white" class="w-6 h-6 mr-2" />
      <span class="text-md ml-2 font-semibold">{{ item.title }}</span>
      <Icon
        :icon="open ? 'mdi:arrow-up-drop-circle' : 'mdi:arrow-down-drop-circle'"
        class="ml-20 w-6 h-4 mr-3 transform transition-transform"
        :style="`rotate(${open ? '180deg' : '0'})`"
      />
    </button>

    <button class="pl-8 space-y-2" v-if="open" :key="item.title">
      <router-link
        v-for="child in item.childNav"
        :key="child.id"
        :to="child?.to"
        class="flex items-center px-3 py-2 duration-200 border-l-4 border-transparent hover:border-blue-600"
      >
        <Icon :icon="child.icon" color="white" class="w-4 h-4 mr-2" />
        <span class="text-sm">{{ child.title }}</span>
      </router-link>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { INavGroup } from "../types";
import { Icon } from "@iconify/vue";
const open = ref(false);

const openChildren = () => {
  open.value = !open.value;
};
defineProps<{
  item: INavGroup;
}>();
</script>
