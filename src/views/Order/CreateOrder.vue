<template>
  <div>
    <OrderNavs>
      <div class=" w-6/12 mx-auto">
      <div >
        <span class="w-full flex justify-center  text-[30px] max-sm:text-2xl max-xl:text-2xl max-md:text-md">Where are you
          moving?</span>
      </div>
      <span class="-translate-y-1 text-xs flex justify-center"><span
          class='text-red-500 text-base -translate-y-1 mr-1'>*</span> indicates the required fields</span>
      <div
        class="w-12/12  md:w-12/12 xl:w-12/12 flex items-center flex-wrap justify-around mx-auto uppercase font-semibold text-slate-700">
        <div
          class="border-t-8 my-2 border-sky-500 w-[40vh] flex items-center justify-around h-[10vh] cursor-pointer bg-white">
          <img src="../../assets/local.svg" alt="Local">
          Local deliveries
        </div>
        <div
          class="border-t-8 border-sky-400 my-2 w-[40vh] flex items-center justify-around text-center h-[10vh] bg-white pointer-events-none opacity-50">
          <img src="../../assets/international.svg" alt="International">
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
      <BaseMap class="mt-2"/>
    </OrderNavs>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import type { IDistrict, IRegion } from './types'
import OrderNavs from './OrderNavs.vue';
import { onMounted, ref } from 'vue';
import AutoCompleteVue from '@/components/BaseComponents/AutoComplete.vue';
import { useRegionStore } from '@/stores/regionStore'
import { storeToRefs } from 'pinia';
import { useDistrictStore } from '@/stores/districtStore'
import BaseMap from '@/components/BaseMap.vue';


const fromRegion = ref({} as IRegion)
const toRegion = ref({} as IRegion)
const fromDistrict = ref({} as IDistrict)
const toDistrict = ref({} as IDistrict)
const districtStore = useDistrictStore()
const regionStore = useRegionStore()
const { regions } = storeToRefs(regionStore)
const { districtsByRegion, toDistricts } = storeToRefs(districtStore);
const item = ref()
const getRegions = async () => {
  try {
    await regionStore.getRegion()
  } catch (error) {
    console.log(error)
  }
}

const getDistrictByRegion = async (id: number) => {
  if (fromRegion.value && fromRegion.value?.id) {
    try {
      await districtStore.getDistrictByRegion(id);
    } catch (error) {
      console.error(error);
    }
  }
};
const getDist = async () => {
  try {
    await districtStore.getDistric(toRegion.value.id)
  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  getRegions()
})
</script>
