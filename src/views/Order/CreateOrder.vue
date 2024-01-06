<template>
  <div>

    <OrderNavs @orderSubmitted="submitOrder">
      <div class="w-full bg-gray-200 rounded-sm h-2.5 mb-4 dark:bg-slate-300">
        <div :style="{ width: calculateWidth + '%' }" class="bg-blue-500 h-2.5 rounded-sm dark:bg-sky-500"></div>
      </div>
      <div v-if="step1">
        <div class="w-12/12 mx-auto">
          <div class="w-6/12 mx-auto">
            <div>
              <span class="w-full flex justify-center text-[30px] max-sm:text-2xl max-xl:text-2xl max-md:text-md">
                Where are you moving?
              </span>
            </div>
            <span class="-translate-y-1 text-xs flex justify-center">
              <span class='text-red-500 text-base -translate-y-1 mr-1'>*</span> indicates the required fields
            </span>
            <div
              class="w-12/12 md:w-12/12 xl:w-12/12 flex items-center gap-4 justify-around mx-auto uppercase font-semibold text-slate-700">
              <div
                class="border-t-8 my-2 border-sky-500 w-[40vh] flex items-center justify-around h-[10vh] cursor-pointer bg-white">
                <img :src="local" alt="Local">
                Local deliveries
              </div>
              <div
                class="border-t-8 border-sky-400 my-2 w-[40vh] flex items-center justify-around text-center h-[10vh] bg-white pointer-events-none opacity-50">
                <img :src="intern" alt="International">
                <div class="flex flex-col items-center">
                  <span>within Central Asia</span>
                  <span class="text-xs">(coming soon)</span>
                </div>
              </div>
            </div>


            <div class="mx-3 flex justify-center">
              <div class="w-4/12 mx-auto">
                <AutoCompleteVue @change="getDistrictByRegion()" returnData="id"
                  v-model:model-value="orderData.fromRegion" label="From" :options="regions" resultNameKey="regionName" />
              </div>
              <div class="w-4/12 mx-auto">
                <AutoCompleteVue @change="getDist()" v-model="orderData.toRegion" label="To" :options="regions"
                  resultNameKey="regionName" />
              </div>
            </div>
            <div class="mx-3 flex justify-center">
              <div class="w-4/12 mx-auto">
                <AutoCompleteVue v-model:model-value="orderData.fromDistrict" label="Select the district"
                  :options="districtsByRegion" resultNameKey="name" />
              </div>
              <div class="w-4/12 mx-auto">
                <AutoCompleteVue v-model="orderData.toDistrict" label="Select the district" :options="toDistricts"
                  resultNameKey="name" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <GMapMap class="z-30 w-full mt-4" :center="coords" :zoom="10" map-type-id="terrain" style="height: 48vh">
            <GMapMarker :key="0" :position="orderData.startPoint" :clickable="false">
              <GMapInfoWindow :options="{ maxWidth: 200 }">
                <div>
                  <h3>Your Location</h3>
                </div>
              </GMapInfoWindow>
            </GMapMarker>
            <GMapMarker :key="1" :position="marker2Details.position" :draggable="true" @dragend="updateMarker2Position">
              <GMapInfoWindow v-if="locationDetails.address !== ''" :options="{ maxWidth: 200 }">
                <div class="location-details">
                  <h3>Location Details</h3>
                  <p>Address: {{ locationDetails.address }}</p>
                  <p>URL: <a :href="locationDetails.url" target="_blank">{{ locationDetails.url }}</a></p>
                </div>
              </GMapInfoWindow>
            </GMapMarker>

          </GMapMap>
        </div>
      </div>
      <div v-if="step2">
        <div class="w-12/12 mx-auto">
          <div class="w-6/12 mx-auto">
            <div>
              <span class="w-full flex justify-center text-[30px] max-sm:text-2xl max-xl:text-2xl max-md:text-md">When do
                you want to move?</span>
            </div>
            <span class="-translate-y-1 text-xs flex justify-center"><span
                class='text-red-500 text-base -translate-y-1 mr-1'>*</span> indicates the required fields</span>
          </div>
          <div class="w-full flex justify-center mt-16">
            <Icon icon="carbon:calendar" class="w-8 h-6 mr-2 absolute z-50 translate-x-20 mt-2 opacity-70" />
            <Datepicker class="border rounded-md w-12/12" v-model="orderData.loadDayTime" :clearable="false"
              @change="setLoadTime" />
          </div>
        </div>
      </div>
      <div v-else-if="step3">
        <div class="w-9/12 mx-auto">
          <div
            class="w-12/12  md:w-12/12 xl:w-12/12 mt-16 flex items-center flex-wrap justify-around mx-auto  font-semibold text-slate-700">
            <button @click="changeStat()">
              <div :class="{ 'border-t-8 border-sky-400': homeType == true }"
                class="border  my-2  hover:bg-sky-200 transition duration-700 w-[40vh] flex items-center justify-around h-[12vh] cursor-pointer bg-white">
                <img :src="flat" alt="International">
                <div class="flex flex-col items-center">
                  <span class="uppercase">House</span>
                  <span class="text-xs font-medium">(Single Family Home)</span>
                </div>
              </div>
            </button>
            <button @click="changeStat()">
              <div :class="{ 'border-t-8 border-sky-400 ': homeType == false }"
                class="border my-2 hover:bg-sky-200 transition duration-700 w-[40vh] flex items-center justify-around h-[12vh] cursor-pointer bg-white">
                <img :src="home" alt="Local">
                <div class="flex flex-col items-center">
                  <span class="uppercase">Flat</span>
                  <span class="text-xs font-medium">(Studio Condo TownHome)</span>
                </div>
              </div>
            </button>
          </div>
          <div class="w-12/12">
            <span class="flex justify-center my-12 text-2xl font-semibold from-neutral-700 text-slate-700 ">How many
              rooms?</span>
            <ul class="flex justify-center">
              <li class="hover:bg-sky-300 cursor-pointer transition duration-700 border rounded-sm px-4 py-2 mx-3"
                v-for="item in rooms" :key="item.value" @click="selectRoom(item.value)"
                :class="{ 'bg-sky-500 ': orderData.rooms === item.value }">
                {{ item.value }}
              </li>
            </ul>
            <span class="text-2xl flex justify-center my-12 font-semibold from-neutral-700 text-slate-700">How you are
              going to
              pay for it?</span>
            <div class="flex w-12/4 justify-center  ">
              <div class="flex justify-around  items-center mx-2">
                <input v-model="orderData.paymentType" type="radio" name="paymentType" id="cash" value="cash">
                <label class="mx-2 font-normal text-xl" for="cash">Cash</label>
              </div>
              <div class="flex justify-around  items-center mx-2">
                <input v-model="orderData.paymentType" type="radio" name="paymentType" id="card" value="card">
                <label class="mx-2 text-xl font-normal" for="card">Card</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="step4">
        <div class=" mx-auto">
          <span class=" w-full flex justify-center text-2xl">Contact information <span
              class="text-red-700">*</span></span>
          <div class="w-4/12  mx-auto mt-16">
            <BaseInput class="my-2" type="text" :disabled="false" :errors="error"
              v-model:model-value="orderData.firstName" label="First Name" errorMessage="" success="" />
            <BaseInput class="my-2" type="text" :disabled="false" :errors="error" v-model:model-value="orderData.lastname"
              label="Lastname" errorMessage="" success="" />
            <BaseInput class="my-2" type="text" :disabled="false" :errors="error"
              v-model:model-value="orderData.phoneNumber" label="Phone Number" errorMessage="" success="" />
            <BaseInput class="my-2" type="email" :disabled="false" :errors="error" v-model:model-value="orderData.email"
              label="Email Address" errorMessage="" success="" />
          </div>
        </div>
      </div>

    </OrderNavs>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import type { IDistrict, IRegion } from './types'
import Datepicker from 'vue3-datepicker';
import OrderNavs from './OrderNavs.vue';
import { onMounted, ref, computed, watchEffect, reactive } from 'vue';
import AutoCompleteVue from '@/components/BaseComponents/AutoComplete.vue';
import { storeToRefs } from 'pinia';
import { useDistrictStore } from '@/stores/districtStore'
import Step1 from './Steps/Step1.vue'
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import { useOrderStore } from "@/stores/orderStore"
import Step2 from './Steps/Step2.vue';
import Step3 from './Steps/Step3.vue';
import Step4 from './Steps/Step4.vue';
import Step5 from './Steps/Step5.vue';
import { useRegionStore } from '@/stores/regionStore';
import local from "@/assets/local.svg";
import intern from "@/assets/international.svg";
import flat from '@/assets/home.svg'
import home from '@/assets/corporate.svg';
import { IOrder } from './Steps/types';

const router = useRouter();
const regionStore = useRegionStore();
const districtStore = useDistrictStore();
const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);
const email = ref('')
const phoneNumber = ref('+998');
const error = ref('');
const success = ref('true')
const firstName = ref('');
const lastname = ref('')
const fromRegion = ref({} as IRegion);
const toRegion = ref({} as IRegion);
const fromDistrict = ref({} as IDistrict);
const toDistrict = ref({} as IDistrict);
const coords = ref({ lat: 51.5072, lng: 0.1276 });
const markerDetails = ref({ id: 1, position: coords.value });
const openedMarkerID = ref(null);
const locationDetails = ref({ address: '', url: '' });
const { regions } = storeToRefs(regionStore);
const { districtsByRegion, toDistricts } = storeToRefs(districtStore);
const marker2Details = ref({ id: 2, position: { lat: 41.2995, lng: 69.2401 } });
const picked = ref();
const homeType = ref(true)
const selectedRoom = ref('');
const paymentType = ref()

const orderData = ref<IOrder>({
  fromRegion: fromRegion.value.id,
  toRegion: toRegion.value.id,
  fromDistrict: fromDistrict.value.id,
  toDistrict: toDistrict.value.id,
  loadDayTime: picked.value,
  homeType: homeType.value,
  rooms: selectedRoom.value,
  paymentType: paymentType.value,
  firstName: firstName.value,
  lastname: lastname.value,
  phoneNumber: phoneNumber.value,
  email: email.value,
  startPoint: markerDetails.value.position,
  endPoint: marker2Details.value.position,
});

const getRegions = async () => {
  try {
    await regionStore.getRegion();
  } catch (error) {
    console.log(error);
  }
};

const getDistrictByRegion = async () => {
  if (orderData.value.fromRegion && orderData.value.fromRegion) {
    try {
      await districtStore.getDistrictByRegion(orderData.value.fromRegion?.id);
    } catch (error) {
      console.error(error);
    }
  }
};

const getUserLocation = () => {
  const isSupported = 'navigator' in window && 'geolocation' in navigator;
  if (isSupported) {
    navigator.geolocation.getCurrentPosition((position) => {
      coords.value.lat = position.coords.latitude;
      coords.value.lng = position.coords.longitude;
    });
  }
};

const updateMarker2Position = (event) => {
  orderData.value.endPoint = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };
};

const getDist = async () => {
  try {
    await districtStore.getDistric(orderData.value.toRegion?.id);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getUserLocation();
  getRegions();
});

watchEffect(() => {
  orderStore.updateOrder({ ...order, fromRegion, toRegion, fromDistrict, toDistrict });
  if(homeType.value) {
    orderData.value.homeType = 'House'
  } else {
    orderData.value.homeType = 'Flat'
  }
});

const orederStore = useOrderStore()
const { step1, step2, step3, step4 } = storeToRefs(orederStore)

const calculateWidth = computed(() => {
  if (step1.value) return 25;
  if (step2.value) return 50;
  if (step3.value) return 75;
  if (step4.value) return 100;
  return 0;
});

const submitOrder = async () => {
  try {
   const data= await orderStore.submitOrder(orderData.value);
   if(data.responseCode == 200){
    orderData.value = {} as IOrder;
      router.push('/')
   }
  } catch (error) {
    console.log(error);
  }
  console.log(orderData.value);
}
const selectRoom = (value: number) => {
  orderData.value.rooms = value;
};

function changeStat() {
  homeType.value = !homeType.value;
}

const rooms = ref([
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 }
]);

</script>
