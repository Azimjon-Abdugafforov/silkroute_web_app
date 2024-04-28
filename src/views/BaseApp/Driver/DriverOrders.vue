<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDriverStore } from '@/stores/driverStore';
import { storeToRefs } from 'pinia';
import { IOrder } from '@/views/Order/Steps/types';


const driverStore = useDriverStore();
const {driverOrder, currentDriverOrder} = storeToRefs(driverStore)
const editing = ref(false);



function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


const controlModal = () => {
  editing.value = !editing.value;
}

const submit = () => {
  editing.value = false;
}


function mapCenter(order) {
  const startLat = parseFloat(order.startPoint[0]);
  const startLng = parseFloat(order.startPoint[1]);
  const endLat = parseFloat(order.endPoint[0]);
  const endLng = parseFloat(order.endPoint[1]);

  const centerLat = (startLat + endLat) / 2;
  const centerLng = (startLng + endLng) / 2;

  return { lat: centerLat, lng: centerLng };
}
function mapZoom(order) {
  console.log(order);

  const startLat = parseFloat(order.startPoint[0]);
  const startLng = parseFloat(order.startPoint[1]);
  const endLat = parseFloat(order.endPoint[0]);
  const endLng = parseFloat(order.endPoint[1]);
  const distance = Math.sqrt(Math.pow(endLat - startLat, 4) + Math.pow(endLng - startLng, 4));

  if (distance <= 1) {
    return 10;
  } else if (distance <= 10) {
    return 7;
  } else {
    return 8;
  }
}


onMounted(() => {
  driverStore.getDriverOrders();
  
});

</script>

<template>
  {{ currentDriverOrder }}

</template>



<style scoped>


</style>