<template>
  <div class="min-h-[100vh] flex wrapper ">
    <div class="w-full mx-auto md:px-10  pb-2 header-shadow shadow-md">
      <button @click="routePush()"
        class="border-opacity-30 translate-y-10 px-4  text-sky-600 uppercase text-sm flex items-center hover:text-sky-700 transition duration-500 ">
        <Icon icon="typcn:arrow-back" class="w-5 h-5" />
        <div class="border-b-2 border-transparent hover:border-b-2 hover:border-sky-700 flex transition duration 200">
          <span>back</span>
        </div>
      </button>
      <div class="md:px-10 max-md:w-12/12 2xl:w-12/12  flex justify-center  max-sm:w-[100%]  xl:w-12/12 max-sm:w-12/12">
        <a @click="backtoMain" class="cursor-pointer"> <img src="../../assets/main_logo.png" class=" w-72  max-sm:w-60">
        </a>
      </div>
    </div>
    <div class="bg-slate-100 h-[85vh]">
      <div class="mx-auto">
        <slot />
      </div>
    </div>
    <div class="footer-container">
      <div class="footer flex justify-center mt-auto py-2">
        <button @click="previousStep" class="border px-14 py-4 uppercase rounded-md bg-slate-400 text-white text-md mx-auto hover:bg-slate-800 transition duration-500">
          Previous
        </button>
        <button @click="nextStep()"
          class="border px-14 py-4 uppercase rounded-md bg-sky-600 text-white text-md mx-auto hover:bg-sky-800  transition duration-1000">next</button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import { useOrderStore } from '@/stores/orderStore';

const orderStore = useOrderStore();

const router = useRouter();

const steps = ['step1', 'step2', 'step3', 'step4', ];

const nextStep = () => {
  const currentStepIndex = steps.findIndex(step => orderStore[step]);
  if (currentStepIndex < steps.length - 1) {
    orderStore[steps[currentStepIndex]] = false;
    orderStore[steps[currentStepIndex + 1]] = true;
  }
};

const previousStep = () => {
  const currentStepIndex = steps.findIndex(step => orderStore[step]);
  if (currentStepIndex > 0) {
    orderStore[steps[currentStepIndex]] = false;
    orderStore[steps[currentStepIndex - 1]] = true;
  }
};


const routePush = async () => {
  router.back();
};

const backtoMain = () => {
  router.push('/');
};
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
.header-shadow{
  top: 0;
  box-shadow: 0 -5px 10 px rgba(0, 0, 0, 0.1);
}

.footer {
  background-color: #fff;
  /* Add any additional styles as needed */
}
</style> 

