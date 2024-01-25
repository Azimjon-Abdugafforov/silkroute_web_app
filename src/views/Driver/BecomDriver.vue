<template>
  <div  class="bg bg-slate-50"
    style="height: 100vh;">
    <div class="w-full mx-auto  " >
      <div class=" w-9/12 mx-auto ">
        <h1 class=" text-center pt-12 text-3xl font-semibold text-sky-700">We are hiring professional drivers</h1>
        <div class="w-9/12 mx-auto mt-12 flex">
          <div class="mx-1 w-6/12 ">
            <BaseInput class="my-2" type="text" :disabled="false" v-model:model-value="fullName" label="Full Name"
              errorMessage="" success="" />
            <label class="block text-sm font-medium text-black mb-2">Date of Birth</label>
              <Datepicker class="border rounded-md w-12/12" v-model="dateOfBirth" :clearable="false"
              @change="setLoadTime" />
          </div>
          <div class="mx-1 w-6/12">
            <BaseInput class="my-2" type="text" :disabled="false" v-model:model-value="phoneNumber" label="Phone Number"
              errorMessage="" success="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import Datepicker from 'vue3-datepicker';

const fullName = ref("")
const phoneNumber = ref('+998 ')
const dateOfBirth = ref(new Date())

</script>

<style scoped>
.bg{
  background-image: url('../../assets//subHead.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
}
</style>

