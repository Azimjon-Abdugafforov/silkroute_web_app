<template>
  <div>
    <OrderNavs>
      <div class="w-full">
        <span class="w-full flex justify-center  text-[40px] max-sm:text-2xl max-xl:text-2xl max-md:text-md">Where are you
          moving?</span>
      </div>
      <span class="-translate-y-1 text-xs flex justify-center"><span
          class='text-red-500 text-base -translate-y-1 mr-1'>*</span> indicates the required fields</span>
      <div
        class="w-12/12 border md:w-12/12 xl:w-12/12 flex items-center flex-wrap justify-around mx-auto uppercase font-semibold text-slate-700">
        <div class="border-t-8 my-2 border-sky-400 w-[40vh] flex items-center justify-around h-[15vh] cursor-pointer bg-white">
          <img src="../../assets/local.svg" alt="Local" class="border">
          Local deliveries
        </div>
       
        <div
          class="border-t-8 border-sky-400 my-2 w-[40vh] flex items-center justify-around text-center h-[15vh] bg-white pointer-events-none opacity-50">
          <img src="../../assets/international.svg" alt="International">
          <div class="flex flex-col items-center">
            <span >within Central Asia</span>
            <span class="text-xs">(coming soon)</span>
          </div>
        </div>
      </div>

    </OrderNavs>
  </div>
</template>s

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import OrderNavs from './OrderNavs.vue';
import { ref } from 'vue';

const local = ref(false)
</script>

<style scoped></style>