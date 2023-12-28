<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-12/12 mx-auto">
    <div class="w-6/12 mx-auto">
      <div>
        <span class="w-full flex justify-center text-[30px] max-sm:text-2xl max-xl:text-2xl max-md:text-md">When do you want to move?</span>
      </div>
      <span class="-translate-y-1 text-xs flex justify-center"><span class='text-red-500 text-base -translate-y-1 mr-1'>*</span> indicates the required fields</span>
    </div>
    <div class="w-full flex justify-center mt-16">
      <Icon icon="carbon:calendar" class="w-8 h-6 mr-2 absolute z-50 translate-x-20 mt-2 opacity-70" />
      <Datepicker class="border rounded-md w-12/12" v-model="picked" :clearable="false" @change="setLoadTime" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from 'vue3-datepicker';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useOrderStore } from '@/stores/orderStore';
import { storeToRefs } from 'pinia';

const orderStore = useOrderStore();
const { setFromLoadTime } = storeToRefs(orderStore.mutations);
const picked = ref(new Date());

const setLoadTime = () => {
  setFromLoadTime(picked.value.toISOString()); // You may need to format the date string according to your requirements
};
</script>

<style scoped></style>
