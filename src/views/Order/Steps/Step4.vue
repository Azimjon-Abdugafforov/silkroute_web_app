<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class=" mx-auto">
    <span class=" w-full flex justify-center text-2xl">Contact information <span class="text-red-700">*</span></span>


    <div class="w-4/12 border mx-auto">
      <BaseInput v-model:model-value="firstName" label="Xodim Ismi" placeholder="Enter your name" errorMessage=""
        success="" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from "@/components/BaseComponents/BaseInput.vue";

const firstName = ref(''); 
</script>

<style scoped></style>