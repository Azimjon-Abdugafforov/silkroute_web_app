<template>
  <div class="bg-slate-200">
    <Sidebar/>
    <BaseLoader :isVisible="loading" />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import BaseLoader from '@/components/BaseLoader.vue'
import Sidebar from '@/components/Sidebar.vue'

const loading = ref(false)


</script>

<style scoped></style>