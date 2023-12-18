<template>
  <div class="min-h-[100vh] flex wrapper">
    <div class=" w-full mx-auto px-10 py-8 border shadow-md">
      <div class="container px-10 md:w-7/12  flex justify-between sm:w-12/12 ">
        <button @click="routePush()"
          class="border border-sky-500 border-opacity-30 px-4  text-sky-600 uppercase text-sm flex items-center hover:text-sky-700 transition duration-500 ">
          <Icon icon="typcn:arrow-back" class="w-5 h-5" />
          <div class="border-b-2 border-transparent hover:border-b-2 hover:border-sky-700 flex transition duration 200">
          <span >back</span>
        </div>

        </button>
        <a @click="backtoMain" class="cursor-pointer"> <img src="../../assets/main_logo.png" class="w-72">
        </a>
      </div>
    </div>
    <div class="w-8/12 mx-auto border my-10 py-8">
      <slot/>
    </div>
    <div class="footer-container">
      <div class="footer flex justify-center mt-auto py-4">
        <button class="border px-14 py-6 uppercase rounded-md bg-sky-600 text-white text-md mx-auto hover:bg-sky-800  transition duration-1000">next: {{ btnName }}</button>
      </div>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import {useOrderStore} from '@/stores/orderStore'
const orderStore = useOrderStore()

const {btnName} = storeToRefs(orderStore)

const router = useRouter()
async function routePush() {
  router.push('/')
}
const backtoMain = () => {
  router.push('/')
}

</script>
 
<style scoped>
.wrapper {
  flex-direction: column;
}

.footer-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
  /* Adjust the shadow as needed */
}

.footer {
  background-color: #fff;
  /* Add any additional styles as needed */
}
</style>