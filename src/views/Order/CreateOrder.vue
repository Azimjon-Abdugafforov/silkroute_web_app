<template>
  <div>
    <OrderNavs>
      <div class="w-full bg-gray-200 rounded-sm h-2.5 mb-4 dark:bg-white">
        <div :style="{ width: calculateWidth + '%' }" class="bg-blue-600 h-2.5 rounded-sm dark:bg-blue-500"></div>
      </div>
      <Step1 v-if="step1" />
      <Step2 v-if="step2" />
      <Step3 v-else-if="step3" />
      <Step4 v-else-if="step4" />
      <Step5 v-else-if="step5" />
    </OrderNavs>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import type { IDistrict, IRegion } from './types'
import OrderNavs from './OrderNavs.vue';
import { onMounted, ref, computed } from 'vue';
import AutoCompleteVue from '@/components/BaseComponents/AutoComplete.vue';
import { useRegionStore } from '@/stores/regionStore'
import { storeToRefs } from 'pinia';
import { useDistrictStore } from '@/stores/districtStore'
import Step1 from './Steps/Step1.vue'
import { useOrderStore } from "@/stores/orderStore"
import Step2 from './Steps/Step2.vue';
import Step3 from './Steps/Step3.vue';
import Step4 from './Steps/Step4.vue';
import Step5 from './Steps/Step5.vue';


const orederStore = useOrderStore()
const { step1, step2, step3, step4, step5 } = storeToRefs(orederStore)

// Calculate width based on the current step
const calculateWidth = computed(() => {
  if (step1.value) return 20;
  if (step2.value) return 40;
  if (step3.value) return 60;
  if (step4.value) return 80;
  if (step5.value) return 100;
  return 0; // Default width if none of the steps are active
});

</script>
