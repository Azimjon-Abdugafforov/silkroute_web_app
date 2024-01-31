<template>
  <div class="bg bg-slate-50" style="height: 100vh;">
    <div class="w-full mx-auto  ">
      <div class=" w-9/12 mx-auto  ">

        <h1 class=" text-center pt-12 text-3xl font-semibold text-sky-700">We are hiring professional drivers</h1>
        <h1 class=" w-9/12 mt-6 text-slate-500 text-xl mx-auto">Driver credentials</h1>
        <div class="w-9/12 mx-auto  flex ">
          <div class="mx-1 w-6/12 ">
            <BaseInput class="my-2  border-sky-300" type="text" :disabled="false" v-model:model-value="fullName"
              label="Full Name" errorMessage="" success="" />
            <div class="flex justify-between -translate-y-1">
              <div>
                <label class="block text-sm font-medium text-black mb-2">Date of Birth</label>
                <Datepicker class="border-2 border-sky-300 rounded-md w-12/12" v-model="dateOfBirth" :clearable="false"
                  @change="setLoadTime" />
              </div>
              <BaseInput class="w-6/12 border-sky-300" type="number" :disabled="false" v-model:model-value="fullName"
                label="Years of driving" errorMessage="" success="" />
            </div>
          </div>
          <div class="mx-1 w-6/12">
            <BaseInput class="my-2 border-sky-300" type="text" :disabled="false" v-model:model-value="phoneNumber"
              label="Phone Number" errorMessage="" success="" />
            <AutoCompleteVue returnData="id" class="w-4/12 h-12" v-model:model-value="birthRegion" label="Region of birth"
              :options="regions" resultNameKey="regionName" />
          </div>
        </div>
        <h1 class=" w-9/12 mt-4 text-slate-500 text-xl mx-auto">Truck details</h1>
        <div class="w-9/12 mx-auto  bg-slate-50">
          <div class=" flex justify-between">
            <div class="w-6/12 mx-1">
              <BaseInput v-model:model-value="truckModel" class="mt-2 border-sky-300" type="text" :disabled="false"
                label="Truck model" errorMEssage="" success="" />
              <BaseInput v-model:model-value="truckStatus" class="my-1 border-sky-300" type="text" :disabled="false"
                label="Truck condition" />
            </div>
            <div class="w-6/12 mx-1">
              <BaseInput v-model:model-value="truckNumber" class="mt-2 border-sky-300" type="text" :disabled="false"
                label="Vehicle number" errorMEssage="" success="" />
              <BaseInput v-model:model-value="manufacturedYear" class="my-1 border-sky-300" type="text" :disabled="false"
                label="Manufactured year" />
            </div>
          </div>
          <div class="flex justify-between">
            <div >
              <label class="custum-file-upload" for="file">
                <div class="icon">
                </div>
                <Icon icon="mdi-card-account-details" class="w-20 h-20"/>
                <div class="text">
                  <span>Upload the drivers license</span>
                </div>
                <input type="file" id="file">
              </label>

            </div>
            <div >
              <label class="custum-file-upload" for="file">
             <Icon icon="mdi-account" class="w-20 h-20"/>
                <div class="text">
                  <span>Upload the personal image</span>
                </div>
                <input type="file" id="file">
              </label>

            </div>
            <div >
              <label class="custum-file-upload" for="file">
               <Icon icon="mdi-truck-fast" class="w-20 h-20"/>
                <div class="text">
                  <span>Upload the truck images</span>
                </div>
                <input type="file" id="file">
              </label>

            </div>
         

          </div>

        </div>


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import Datepicker from 'vue3-datepicker';
import AutoCompleteVue from "@/components/BaseComponents/AutoComplete.vue";
import { useRegionStore } from "@/stores/regionStore";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";



const regionStore = useRegionStore()
const { regions } = storeToRefs(regionStore)

async function getRegions() {
  try {
    await regionStore.getRegion()
  } catch (error) {
    console.log(error);
  }
}


onMounted(() => {
  getRegions()
})
const birthRegion = ref()
const fullName = ref("")
const phoneNumber = ref('+998 ')
const dateOfBirth = ref(new Date())
const truckModel = ref("")
const truckStatus = ref("")
const truckNumber = ref("")
const manufacturedYear = ref("")

</script>

<style scoped>
.bg {
  background-image: url('../../assets//subHead.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
}

.custum-file-upload {
  height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cacaca;
  background-color: rgba(255, 255, 255, 1);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
}




.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: rgba(75, 85, 99, 1);
}

.custum-file-upload input {
  display: none;
}
</style>

