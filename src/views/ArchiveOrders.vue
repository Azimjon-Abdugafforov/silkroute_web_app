<template>
  <div> 
    <main class="w-full card bg-white rounded-md pl-4 pr-4 pb-3 mb-3">
    <div
      class="w-4/12 mb-4 border rounded-b-2xl bg-blue-600 mx-auto text-center h-10 flex items-center justify-center text-lg font-bold text-white">
      Archive Orders
    </div>

    <EasyDataTable :headers="headers" :items="props.orders" :loading="props.loader">
      <template #item-operation="item">
        <div class="flex">
          <button @click="editOrder(item)">
            <base-icon icon="mdi:pencil" color="green" class="w-6 h-6" />
          </button>
        </div>
      </template>
      <template #name="name">
        <div class="filter-column">
          <button @click.stop="showNameFilter = !showNameFilter">
            {{ name.text }}
          </button>
          <div class="filter-menu" v-if="showNameFilter">
            <input v-model="nameCriteria" />
          </div>
        </div>
      </template>
    </EasyDataTable>
    <BaseModal :title="'Order details'" v-model:isOpen="editingOrder" :btn-name="'Save'"
      @cancel-editing="editingOrder == false">
      <template #extraContent>
        <ul>
          <li
            class="w-full py-2 px-3 my-4 rounded-md cursor-pointer flex flex-col md:flex-row justify-between bg-slate-200 shadow-lg">
            
            <div class=" flex flex-col md:flex-row md:items-center md:w-8/12">
              <div class="md:w-1/3 flex flex-col justify-center md:items-start md:px-4">
                <span class="text-sm text-gray-600">From</span>
                <p class="text-lg font-semibold">{{ currentOrder.fromRegion?.regionName }}</p>
                <span class="text-xs text-gray-500">{{ currentOrder?.fromDistrict?.name }}</span>
              </div>
              <div class="md:w-1/3 flex flex-col justify-center md:items-start md:px-4">
                <span class="text-sm text-gray-600">To</span>
                <p class="text-lg font-semibold">{{ currentOrder.toRegion?.regionName }}</p>
                <span class="text-xs text-gray-500">{{ currentOrder?.toDistrict?.name }}</span>
              </div>
            </div>
            <div class="md:w-4/12 flex justify-between items-center md:px-4">
              <span class="text-xs font-semibold text-gray-700">{{ currentOrder.loadDayTime
              }}</span>
              <span class="text-md font-semibold text-green-500">{{ currentOrder.distance }} Km</span>
              <span class="text-md font-semibold text-blue-500">{{ currentOrder.status }}</span>
            </div>
          </li>
        </ul>



]
        <GMapMap  class="z-30 w-full mt-4" :center="mapCenter(currentOrder)"
          :zoom="mapZoom(currentOrder)" map-type-id="terrain" style="height: 48vh"
          v-if="currentOrder && currentOrder.startPoint && currentOrder.endPoint">
          <GMapMarker :key="currentOrder.id + '_start'"
            :position="{ lat: parseFloat(currentOrder?.startPoint[0]), lng: parseFloat(currentOrder.startPoint[1]) }"
            :clickable="false">
            <GMapInfoWindow :options="{ maxWidth: 200 }">
              <template #default>
                <div>
                  <h1>{{ currentOrder.fromRegion?.regionName }}</h1>
                  <p>{{ currentOrder.fromDistrict.name }}</p>
                </div>
              </template>
            </GMapInfoWindow>
          </GMapMarker>
          <GMapMarker :key="currentOrder.id + '_end'"
            :position="{ lat: parseFloat(currentOrder.endPoint[0]), lng: parseFloat(currentOrder.endPoint[1]) }"
            :clickable="false">
            <GMapInfoWindow :options="{ maxWidth: 200 }">
              <template #default>
                <div>
                  <h1>{{ currentOrder.toRegion?.regionName }}</h1>
                  <p>{{ currentOrder.toDistrict.name }}</p>
                </div>
              </template>
            </GMapInfoWindow>
          </GMapMarker>
        </GMapMap>
      </template>
    </BaseModal>
  </main>

  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, onMounted} from 'vue'
import { useOrderStore } from '@/stores/orderStore';
import { IOrder } from './Order/Steps/types';
import { Header } from 'vue3-easy-data-table';
import { storeToRefs } from 'pinia';

const orderStore = useOrderStore()
const editOrder = (item: IOrder) => {
  orderStore.currentOrder = item;
};
const editingOrder = ref(false);
const showNameFilter = ref(false);
const nameCriteria = ref("");
const {currentOrder} = storeToRefs(orderStore);




const headers: Header[] = [
  { text: "Client name", value: "client.name", sortable: true },
  { text: "Crated time", value: "createdAt", sortable: true },
  { text: "Phone number", value: "client.phoneNumber" },
  { text: "From", value: "fromRegion.regionName" },
  { text: "To", value: "toRegion.regionName" },
  { text: "Delivery date", value: "loadDayTime" },
  { text: "Payment type", value: "paymentType" },
  { text: "Status", value: "status" },
  {text: "Distance (km)", value: "distance"},
  {text: "Price ($)", value: "totalAmount"},
  {text: "Rating (stars)", value: "rating"},
];

const props = defineProps<{
  orders: IOrder[],
  loader: boolean
}>()



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
const setRating = (order: IOrder, newRating: number) => {
  order.rating = newRating;  // Update the order's rating
};
onMounted(() => {
  function formatISODateToReadable(currentOrder: IOrder[]): IOrder[] {
  if(currentOrder.length === 0) return currentOrder;
  return currentOrder.map(order => ({
    ...order,
    createdAt: new Date(order.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit"
    }),
    loadDayTime: new Date(order.loadDayTime).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit"
    })
  }));
}}
)



</script>

<style scoped>

</style>