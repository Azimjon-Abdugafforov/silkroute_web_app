<template>
  <div class="bg-slate-200">
    <Sidebar/>

    <BaseLoader :isVisible="loading" />
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps} from 'vue'
import BaseLoader from '@/components/BaseLoader.vue'
import Sidebar from '@/components/Sidebar.vue'




</script>

<style scoped></style>