<template>
  <div>
    <ArchiveOrders v-if="orderStore.driverArchives.result" :loader="loading" :orders="orderStore?.driverArchives?.result"></ArchiveOrders>
    <BaseLoader :isVisible="loading" />
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore';
import { onMounted, ref } from 'vue';
import ArchiveOrders from '../ArchiveOrders.vue';
import BaseLoader from '@/components/BaseLoader.vue';

const loading = ref(false);
const orderStore = useOrderStore();


onMounted( async() => {
  try {
   loading.value = true;
   await orderStore.getDriverArchives();
    
  } catch (error) {
    console.log('Error fetching driver archives:', error);
  }
  finally {
    loading.value = false;
  }
 
});

</script>

<style scoped>

</style>