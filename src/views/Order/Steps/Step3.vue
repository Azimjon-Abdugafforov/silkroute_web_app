<!-- eslint-disable vue/multi-word-component-names -->
<template>
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
          :class="{ 'bg-sky-500 ': selectedRoom === item.value }">
          {{ item.value }}
        </li>
      </ul>
      <span class="text-2xl flex justify-center my-12 font-semibold from-neutral-700 text-slate-700">How you are going to
        pay for it?</span>
      <div class="flex w-12/4 justify-center  ">
        <div class="flex justify-around  items-center mx-2">
          <input v-model="paymentType" type="radio" name="paymentType" id="cash" value="cash">
          <label class="mx-2 font-normal text-xl" for="cash">Cash</label>
        </div>
        <div class="flex justify-around  items-center mx-2">
          <input v-model="paymentType" type="radio" name="paymentType" id="card" value="card">
          <label class="mx-2 text-xl font-normal" for="card">Card</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import flat from '@/assets/home.svg'
import home from '@/assets/corporate.svg'
import { ref } from 'vue';

const selectedRoom = ref();
const selectRoom = (value: number) => {
  selectedRoom.value = value;
};
const homeType = ref(true)
function changeStat() {
  homeType.value = !homeType.value
}

const paymentType = ref(null)
const rooms = ref([
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 }
])
</script>

