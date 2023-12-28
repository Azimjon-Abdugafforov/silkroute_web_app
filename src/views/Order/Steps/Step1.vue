<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class=" w-12/12 mx-auto ">

    <div class="w-6/12 mx-auto ">
      <div>
        <span class="w-full flex justify-center  text-[30px] max-sm:text-2xl max-xl:text-2xl max-md:text-md">Where are
          you
          moving?</span>
      </div>
      <span class="-translate-y-1 text-xs flex justify-center"><span
          class='text-red-500 text-base -translate-y-1 mr-1'>*</span> indicates the required fields</span>
      <div
        class="w-12/12  md:w-12/12 xl:w-12/12 flex items-center flex-wrap justify-around mx-auto uppercase font-semibold text-slate-700">
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
          <AutoCompleteVue @change="getDistrictByRegion(fromRegion?.id)" returnData="regionName"
            v-model:model-value="fromRegion" label="From" :options="regions" resultNameKey="regionName" />
        </div>
        <div class="w-4/12 mx-auto">
          <AutoCompleteVue @change="getDist()" v-model="toRegion" label="To" :options="regions"
            resultNameKey="regionName" />
        </div>
      </div>
      <div class="mx-3 flex justify-center">
        <div class="w-4/12 mx-auto">
          <AutoCompleteVue v-model:model-value="fromDistrict" label="Select the district" :options="districtsByRegion"
            resultNameKey="name" />
        </div>
        <div class="w-4/12 mx-auto">
          <AutoCompleteVue v-model="toDistrict" label="Select the district" :options="toDistricts" resultNameKey="name" />
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="translate-y-5 absolute z-50 w-8/12 mx-4">
      <GMapAutocomplete placeholder="Search for a location" @place_changed="setPlace" class="border w-2/12 rounded-md p-2"
        style="font-size: medium"></GMapAutocomplete>
    </div>

    <GMapMap class="z-30 w-full mt-4 " :center="coords" :zoom="10" map-type-id="terrain" style="height: 48vh">
      <GMapMarker :key="markerDetails.id" :position="markerDetails.position" :clickable="true" :draggable="true"
        @click="openMarker(markerDetails.id)" @dragend="updateMarkerPosition">
        <GMapInfoWindow v-if="locationDetails.address !== ''" :closeclick="true" @closeclick="openMarker(null)"
          :opened="openedMarkerID === markerDetails.id" :options="{
            pixelOffset: {
              width: 10,
              height: 0
            },
            maxWidth: 320,
            maxHeight: 320
          }">
          <div class="location-details">
            <h3>Location Details</h3>
            <p>Address: {{ locationDetails.address }}</p>
            <p>
              URL: <a :href="locationDetails.url" target="_blank"> {{ locationDetails.url }}</a>
            </p>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRegionStore } from '@/stores/regionStore';
import { useDistrictStore } from '@/stores/districtStore';
import AutoCompleteVue from '@/components/BaseComponents/AutoComplete.vue';
import local from "@/assets/local.svg";
import intern from "@/assets/international.svg";
import type { IRegion, IDistrict } from '@/views/Order/types';
import { storeToRefs } from 'pinia';

const router = useRouter();
const regionStore = useRegionStore();
const districtStore = useDistrictStore();

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

const getRegions = async () => {
  try {
    console.log('here');

    await regionStore.getRegion();
  } catch (error) {
    console.log(error);
  }
};

const   getDistrictByRegion = async (id: number) => {
  if (fromRegion.value && fromRegion.value?.id) {
    try {
      await districtStore.getDistrictByRegion(id);
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

const setPlace = (place) => {
  if (place && place.geometry && place.geometry.location) {
    coords.value.lat = place.geometry.location.lat();
    coords.value.lng = place.geometry.location.lng();

    locationDetails.value.address = place.formatted_address;
    locationDetails.value.url = place.url;

    // Update marker position
    markerDetails.value.position = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
  } else {
    console.error('Invalid place object:', place);
  }



};

const openMarker = (id) => {
  openedMarkerID.value = id;
};

const updateMarkerPosition = (event) => {
  markerDetails.value.position = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };
};

const getDist = async () => {
  try {
    await districtStore.getDistric(toRegion.value.id);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getUserLocation();
  getRegions();
});

</script>



<style scoped>
.location-details {
  color: black;
  font-size: 12px;
  font-weight: 500;
}
</style>