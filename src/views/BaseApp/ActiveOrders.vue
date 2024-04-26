<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main class="w-full card bg-white rounded-md pl-4 pr-4 pb-3 mb-3">
    <div
      class="w-4/12 mb-4 border rounded-b-2xl bg-blue-600 mx-auto text-center h-10 flex items-center justify-center text-lg font-bold text-white">
      Orders List
    </div>

    <EasyDataTable :headers="headers" :items="formattedOrders" :loading="tbLoader">
      <template #item-operation="item">
        <div class="flex">
          <button @click="editOrder(item)">
            <base-icon icon="mdi:pencil" color="green" class="w-6 h-6" />
          </button>
          <button @click="deletedOrder(item)">
            <base-icon icon="mdi:delete" color="red" class="w-6 h-6" />
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
                <p class="text-lg font-semibold">{{ orderStore.currentOrder.fromRegion?.regionName }}</p>
                <span class="text-xs text-gray-500">{{ orderStore.currentOrder?.fromDistrict?.name }}</span>
              </div>
              <div class="md:w-1/3 flex flex-col justify-center md:items-start md:px-4">
                <span class="text-sm text-gray-600">To</span>
                <p class="text-lg font-semibold">{{ orderStore.currentOrder.toRegion?.regionName }}</p>
                <span class="text-xs text-gray-500">{{ orderStore.currentOrder?.toDistrict?.name }}</span>
              </div>
            </div>
            <div class="md:w-4/12 flex justify-between items-center md:px-4">
              <span class="text-xs font-semibold text-gray-700">{{ orderStore.currentOrder.loadDayTime
              }}</span>
              <span class="text-md font-semibold text-green-500">{{ distance }} Km</span>
              <span class="text-md font-semibold text-blue-500">{{ orderStore.currentOrder.status }}</span>
            </div>
          </li>
        </ul>



        <!-- {{ orderStore.currentOrder }} -->

        <GMapMap class="z-30 w-full mt-4" :center="mapCenter(orderStore.currentOrder)"
          :zoom="mapZoom(orderStore.currentOrder)" map-type-id="terrain" style="height: 48vh"
          v-if="orderStore.currentOrder && orderStore.currentOrder.startPoint && orderStore.currentOrder.endPoint">
          <GMapMarker :key="orderStore.currentOrder.id + '_start'"
            :position="{ lat: parseFloat(orderStore.currentOrder.startPoint[0]), lng: parseFloat(orderStore.currentOrder.startPoint[1]) }"
            :clickable="false">
            <GMapInfoWindow :options="{ maxWidth: 200 }">
              <template #default>
                <div>
                  <h1>{{ orderStore.currentOrder.fromRegion?.regionName }}</h1>
                  <p>{{ orderStore.currentOrder.fromDistrict.name }}</p>
                </div>
              </template>
            </GMapInfoWindow>
          </GMapMarker>
          <GMapMarker :key="orderStore.currentOrder.id + '_end'"
            :position="{ lat: parseFloat(orderStore.currentOrder.endPoint[0]), lng: parseFloat(orderStore.currentOrder.endPoint[1]) }"
            :clickable="false">
            <GMapInfoWindow :options="{ maxWidth: 200 }">
              <template #default>
                <div>
                  <h1>{{ orderStore.currentOrder.toRegion?.regionName }}</h1>
                  <p>{{ orderStore.currentOrder.toDistrict.name }}</p>
                </div>
              </template>
            </GMapInfoWindow>
          </GMapMarker>
        </GMapMap>


      </template>

    </BaseModal>
  </main>
</template>

<script setup lang="ts">
import { useOrderStore } from "@/stores/orderStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import type { Header, FilterOption } from "vue3-easy-data-table";
import { IOrder } from "../Order/Steps/types";
import BaseModal from '@/components/BaseComponents/BaseModal.vue';


const orderStore = useOrderStore();
const { allOrders } = storeToRefs(orderStore);
const editingOrder = ref(false);
const showNameFilter = ref(false);
const nameCriteria = ref("");
const formattedOrders = computed(() => formatISODateToReadable(allOrders.value));
const distance = ref("");
const tbLoader = ref(false);

const headers: Header[] = [
  { text: "Client name", value: "client.name", sortable: true },
  { text: "Crated time", value: "createdAt", sortable: true },
  { text: "Phone number", value: "client.phoneNumber" },
  { text: "From", value: "fromRegion.regionName" },
  { text: "To", value: "toRegion.regionName" },
  { text: "Delivery date", value: "loadDayTime" },
  { text: "Payment type", value: "paymentType" },
  { text: "Status", value: "status" },
  { text: "Actions", value: "operation" }
];

const getOrders = async () => {
  try {
    tbLoader.value = true;
    loading.value = true;
    await orderStore.getAllOrders();
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    loading.value = false;
    tbLoader.value = false;
  }
};
const loading = ref(false)

const editOrder = (item: IOrder) => {
  distance.value = calculateDistance(item);
  editingOrder.value = true;
  orderStore.currentOrder = item;

};
function calculateRecommendedCost(order: IOrder): number {
  let cost = 0;

  // Assuming some factors contribute to the cost
  const distanceFactor = 0.1; // Example factor for distance
  const servicesFactor = 0.05; // Example factor for additional services
  let seasonFactor = 1; // Default season factor

  // Adjust cost based on season
  const loadDayTime = new Date(order.loadDayTime);
  const month = loadDayTime.getMonth();
  if (month >= 0 && month <= 2) {
    // Winter season
    seasonFactor = 1.2; // Increase cost by 20% in winter
  } else if (month >= 6 && month <= 8) {
    // Summer season
    seasonFactor = 0.8; // Decrease cost by 20% in summer
  }

  // Calculate distance-related cost
  // Assuming you have a function to calculate the distance between start and end points
  const distance = calculateDistance(order);

  const distanceCost = distance * distanceFactor;

  // Calculate cost based on additional services
  const servicesCost = order.services.length * servicesFactor;

  // Assuming some other factors contribute to the cost

  // Sum up all factors to get the total cost
  cost = (distanceCost + servicesCost) * seasonFactor;

  // Assuming you may have other factors to consider

  return cost;
}
function calculateDistance(order: IOrder) {


  const lat1 = parseFloat(order.startPoint[0]);
  const lon1 = parseFloat(order.startPoint[1]);
  const lat2 = parseFloat(order.endPoint[0]);
  const lon2 = parseFloat(order.endPoint[1]);

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
  return distance.toFixed(2);
}




const deletedOrder = (item: any) => {
  console.log("Deleting order:", item);
};
const submit = () => {
  console.log("submitting");
};

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

onMounted(getOrders);
function formatISODateToReadable(arr: IOrder[]): IOrder[] {
  return arr.map(order => ({
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
}

</script>

<style scoped></style>
