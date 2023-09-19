<template>
  <div>
    <p class="pl-4 text-sm font-semibold mb-4 mt-2 text-gray-400">
      {{ item.header }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { INavHeader } from "../types";

// eslint-disable-next-line no-undef
defineProps<{
  item: INavHeader;
}>();
</script>
