<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDriverStore } from '@/stores/driverStore';
import { storeToRefs } from 'pinia';
import { IOrder } from '@/views/Order/Steps/types';
import { useOrderStore } from '@/stores/orderStore';
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import { Icon } from '@iconify/vue';
import {useToast} from "vue-toastification"

const toast = useToast();
const driverStore = useDriverStore();
const orderStore = useOrderStore();
const openImg = ref(false);
const { currentDriverOrder } = storeToRefs(driverStore);

const editing = ref(false);

const startShippingOrder = async () => {
  const data = await  orderStore.startShippingOrder(currentDriverOrder.value.id);
  if(data === "Ship started"){
    toast.success("Shipping started successfully");
  }
  await  driverStore.getDriverOrders();

};

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatTime(inputDate: string): string {
  const loadTime = new Date(inputDate);
  const currentTime = new Date();

  const timeDifference = loadTime.getTime() - currentTime.getTime();
  const days = Math.floor(timeDifference / (1000 * 3600 * 24));
  const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

  return `${days} days ${hours} hours ${minutes} minutes`;
}

function mapCenter(order: IOrder) {
  const startLat = parseFloat(order.startPoint[0]);
  const startLng = parseFloat(order.startPoint[1]);
  const endLat = parseFloat(order.endPoint[0]);
  const endLng = parseFloat(order.endPoint[1]);

  const centerLat = (startLat + endLat) / 2;
  const centerLng = (startLng + endLng) / 2;

  return { lat: centerLat, lng: centerLng };
}

function mapZoom(order: IOrder) {
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

function controlModal() {
  editing.value = !editing.value;
}

const clientData = ref({
  name: "John Doe",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  ordersCount: 12,
});

onMounted(() => {
  driverStore.getDriverOrders();
});
</script>

<template>
  <div
    class="w-11/12 mx-auto rounded-xl border shadow-lg mt-4 max-sm:mt-2 p-6 bg-white transition duration-300 ease-in-out">
    <span class="text-2xl font-bold">Order details</span>

    <div v-if="currentDriverOrder.client" class="mt-2 p-4 border-b border-gray-300">
      <h2 class="text-xl font-semibold">Client Information</h2>
      <div class="flex flex-col sm:flex-row justify-between mt-2">
        <div class="mb-2 sm:mb-0">
          <span class="font-medium">Name:</span> {{ currentDriverOrder?.client?.name }}
        </div>
        <div class="mb-2 sm:mb-0">
          <span class="font-medium">Phone:</span>
          <a :href="'tel:' + currentDriverOrder?.client?.phoneNumber" class="text-blue-500 hover:text-blue-700">
            {{ currentDriverOrder?.client?.phoneNumber }}
          </a>
        </div>
        <div class="mb-2 sm:mb-0">
          <span class="font-medium">Email:</span> {{ currentDriverOrder?.client?.email }}
        </div>
        <div>
          <span class="font-medium">Orders:</span> {{ currentDriverOrder?.client?.numberOfOrders }}
        </div>
      </div>
    </div>
    <BaseModal v-model:isOpen="openImg" :btn-name="'ok'" @cancel-editing="openImg == false" :title="'Order images'" @action-function="openImg == false">
      <template #extraContent>
        <div class="mt-6 p-4 border-b border-gray-300">
          <h2 class="text-xl font-semibold">Product Images</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <div v-for="image in currentDriverOrder?.productImages" :key="image.path"
              class="rounded-lg overflow-hidden relative w-full">
              <div class="aspect-w-1 aspect-h-1 transition-transform hover:scale-105">
                <img :src="`http://localhost:5279/${image?.path}`" alt="Product Image"
                  class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>





    <div class="flex flex-col overflow-x-auto mt-4">
      <div v-if="currentDriverOrder" class="flex flex-col min-w-max">
        <div class="flex flex-row font-semibold text-gray-700 bg-gray-200 p-4 rounded-t-lg">
          <div class="w-1/12">ID</div>
          <div class="w-2/12">Load Date</div>
          <div class="w-2/12">From</div>
          <div class="w-2/12">To</div>
          <div class="w-2/12">Status</div>
          <div class="w-2/12">Cost</div>
          <div class="w-2/12">Distance</div>
          <div class="w-2/12">Time until loading</div>
          <div class="w-2/12">See images</div>
        </div>

        <div v-if="!currentDriverOrder.fromLoadTime" class="w-12/12 mt-12 mx-auto ">
          <div class="loader">
            <div>
              <ul>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path
                      d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path
                      d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path
                      d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path
                      d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path
                      d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                    </path>
                  </svg>
                </li>
                <li>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path
                      d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                    </path>
                  </svg>
                </li>
              </ul>
            </div><span>Loading</span>
          </div>
        </div>
        <!-- Order detail information -->
        <div v-if="currentDriverOrder.createdAt" class="flex flex-col bg-white divide-y divide-gray-200">
          <div class="flex flex-row items-center p-4 transition duration-200 hover:bg-gray-100">
            <div class="w-1/12">{{ currentDriverOrder?.id }}</div>
            <div class="w-2/12">{{ formatDate(currentDriverOrder?.loadDayTime) }}</div>
            <div class="w-2/12">{{ currentDriverOrder?.fromRegion?.regionName }} <br />
              <span class="text-xs">{{ currentDriverOrder?.fromDistrict?.name }}</span>
            </div>
            <div class="w-2/12">{{ currentDriverOrder?.toRegion?.regionName }} <br />
              <span class="text-xs">{{ currentDriverOrder?.toDistrict?.name }}</span>
            </div>
            <div class="w-2/12">
              <span :class="`relative inline-block px-3 py-1 font-semibold leading-tight ${currentDriverOrder.status}`">
                <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span class="relative">{{ currentDriverOrder.status }}</span>
              </span>
            </div>
            <div class="w-2/12">{{ currentDriverOrder?.totalAmount }}$</div>
            <div class="w-2/12">{{ currentDriverOrder?.distance }} km</div>
            <div class="w-2/12">{{ formatTime(currentDriverOrder?.loadDayTime) }}</div>
            <div class="w-2/12">
              <Icon icon="mdi:images-outline" class="w-6 h-6 text-blue-500 cursor-pointer" @click="openImg = true" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <GMapMap v-if="currentDriverOrder.startPoint" class="z-30 w-full mt-2" :center="mapCenter(currentDriverOrder)"
      :zoom="mapZoom(currentDriverOrder)" map-type-id="terrain" style="height: 48vh">
      <GMapMarker :key="currentDriverOrder.id + '_start'"
        :position="{ lat: parseFloat(currentDriverOrder?.startPoint[0]), lng: parseFloat(currentDriverOrder.startPoint[1]) }"
        :clickable="false">
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <template #default>
            <div>
              <h1>{{ currentDriverOrder.fromRegion?.regionName }}</h1>
              <p>{{ currentDriverOrder.fromDistrict?.name }}</p>
            </div>
          </template>
        </GMapInfoWindow>
      </GMapMarker>

      <GMapMarker :key="currentDriverOrder.id + '_end'"
        :position="{ lat: parseFloat(currentDriverOrder.endPoint[0]), lng: parseFloat(currentDriverOrder.endPoint[1]) }"
        :clickable="false">
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <template #default>
            <div>
              <h1>{{ currentDriverOrder.toRegion?.regionName }}</h1>
              <p>{{ currentDriverOrder.toDistrict?.name }}</p>
            </div>
          </template>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>

    <!-- Button to start shipping -->
    <div v-if="currentDriverOrder.distance && currentDriverOrder.status !== 'SHIPPING'"
      class="flex justify-center items-center mt-8">
      <button @click="startShippingOrder()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Start Shipping Order
      </button>
    </div>
  </div>
</template>

<style src="./style.css" scoped>
/* Custom styles for the loader */
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader svg {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

img {
  transition: transform 0.3s ease-in-out;
}
</style>
