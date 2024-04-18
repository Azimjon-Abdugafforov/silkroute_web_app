<template>
  <div v-if="myOrders" class="w-10/12 mx-auto">
    <ul v-for="item in myOrders" :key="item.id">
      <li class="border py-2 px-3 my-4  rounded-md bg-white cursor-pointer flex justify-between ">
        <span class="text-xl flex items-center font-semibold mx-2 my-4">{{ formatDate(item.loadDayTime) }}</span>
        <div class="border w-8/12 text-center flex justify-around items-center" >
          <div class="border ">
            <span class=" text-xl">From</span>
            <p class="text-md">{{ item.fromRegion?.regionName }}</p>
            <span class="text-xs">{{ item.fromDistrict.name }}</span>
          </div>
          <div class="border">
            <span class=" text-xl ">To</span>
            <p class="text-md">{{ item.toRegion?.regionName }}</p>
            <span class="text-xs">{{ item.toDistrict.name }}</span>
          </div>
        </div>
        
        <span class="text-md mx-10 flex items-end font-bold">{{ item.status }}</span>
      </li>

      <GMapMap
        class="z-30 w-full mt-4"
        :center="mapCenter(item)"
        :zoom="10"
        map-type-id="terrain"
        style="height: 48vh"
      >
        <GMapMarker
          :key="item.id + '_start'"
          :position="{ lat: parseFloat(item.startPoint[0]), lng: parseFloat(item.startPoint[1]) }"
          :clickable="false"
        >
          <GMapInfoWindow :options="{ maxWidth: 200 }">
            <template #default>
              <div>
                <h1>{{ item.fromRegion?.regionName }}</h1>
                <p>{{ item.fromDistrict.name }}</p>
              </div>
            </template>
          </GMapInfoWindow>
        </GMapMarker>
        <GMapMarker
          :key="item.id + '_end'"
          :position="{ lat: parseFloat(item.endPoint[0]), lng: parseFloat(item.endPoint[1]) }"
          :clickable="false"
        >
          <GMapInfoWindow :options="{ maxWidth: 200 }">
            <template #default>
              <div>
                <h1>{{ item.toRegion?.regionName }}</h1>
                <p>{{ item.toDistrict.name }}</p>
              </div>
            </template>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
      
    </ul>
  </div>
  <BaseLoader :is-visible="loading"/>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import BaseLoader from '@/components/BaseLoader.vue'
import { IOrder } from '../Order/Steps/types';

const loading = ref(false)
const orderStore = useOrderStore()
const { myOrders } = storeToRefs(orderStore)

const getUserOrders = async () => {
  try {
    loading.value = true
    const user = localStorage.getItem("name")
    console.log(user)
    if (user !== null) {
      await orderStore.getOrderByUsername(user)
    } else {
      console.log("User is not set!!")
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

 function orderDistance(order) {
  if (!order || !order.startPoint) {
    console.log("Invalid order object or startPoint is missing.");
    return 0; 
  }
  console.log(order.startPoint);
  

  const startLat =  parseFloat(order.startPoint[0]);
  const startLng =  parseFloat(order.startPoint[1]);
  const endLat = parseFloat(order.endPoint[0]);
  const endLng = parseFloat(order.endPoint[1]);

  console.log(startLat, startLng, endLat, endLng);

  const distance = calculateDistance(startLat, startLng, endLat, endLng);
  return distance;
}

console.log(myOrders.value[0])
console.log(orderDistance(myOrders.value[0]));




function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
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
onMounted(() => {
  getUserOrders();
})
</script>
