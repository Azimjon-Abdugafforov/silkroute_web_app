<template>
  <div>
    <router-link
      class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
      :to="item.to"
    >
      <Icon :icon="item.icon" color="white" class="w-6 h-6" />

      <span class="mx-4">{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { INavItem } from "../types";
import { Icon } from "@iconify/vue";

// eslint-disable-next-line no-undef
defineProps<{
  item: INavItem;
}>();

import { ref } from "vue";
</script>
