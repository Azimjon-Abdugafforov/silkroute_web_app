<template>
  <div class="bg bg-slate-50" style="height: 100vh;">
    <div class="w-full mx-auto  ">
      <form @submit.prevent="submitForm()" class=" w-9/12 mx-auto ">
        <button @click="goBack()" class="  flex justify-center items-center text-sky-600 ">
          <Icon icon="mdi-arrow-left" />
          <span class="border-b border-b-sky-500">back</span>
        </button>
        <h1 class=" text-center  pt-12 text-3xl font-semibold text-sky-700">We are hiring professional drivers</h1>
        <h1 class=" w-9/12 mt-6 text-slate-500 text-xl mx-auto">Driver credentials</h1>
        <div class="w-9/12 mx-auto  flex  ">
          <div class="mx-1 w-6/12 ">
            <BaseInput class="my-2   border-sky-300" type="text" errors="" :disabled="false"
              v-model:model-value="fullName" label="Full Name" errorMessage="" success="" />
            <div class="flex justify-between -translate-y-1">
              <div>
                <label class="block text-sm font-medium text-black mb-2">Date of Birth</label>
                <Datepicker class="border-2 border-sky-300 rounded-md w-12/12" v-model="dateOfBirth" :clearable="false" />
              </div>
              <BaseInput errors="" class="w-6/12 border-sky-300" type="number" :disabled="false"
                v-model:model-value="yearsOfDriving" label="Years of driving" errorMessage="" success="" />
            </div>
          </div>
          <div class="mx-1 w-6/12">
            <BaseInput errors="" class="my-2 border-sky-300" type="text" :disabled="false"
              v-model:model-value="phoneNumber" label="Phone Number" errorMessage="" success="" />
            <AutoCompleteVue returnData="id" class="w-4/12 h-12" v-model:model-value="branch" label="Region of birth"
              :options="branches" resultNameKey="regionName" />
          </div>
        </div>
        <h1 class=" w-9/12 mt-4 text-slate-500 text-xl mx-auto">Truck details</h1>
        <div class="w-9/12 mx-auto  bg-slate-50">
          <div class=" flex justify-between ">
            <div class="w-6/12 mx-1">
              <BaseInput errors="" v-model:model-value="truckModel" class="mt-2 border-sky-300" type="text"
                :disabled="false" label="Truck model" errorMEssage="" success="" />
              <BaseInput errors="" success="" v-model:model-value="truckStatus" class="my-1 border-sky-300" type="text"
                :disabled="false" label="Truck condition" />
            </div>
            <div class="w-6/12 mx-1">
              <BaseInput errors="" v-model:model-value="truckNumber" class="mt-2 border-sky-300" type="text"
                :disabled="false" label="Vehicle number" errorMEssage="" success="" />
              <BaseInput errors="" success="" v-model:model-value="manufacturedYear" class="my-1 border-sky-300"
                type="text" :disabled="false" label="Manufactured year" />
            </div>
          </div>
          <div class="flex justify-between flex-wrap ">
            <div>
              <label class="custum-file-upload max-lg:w-12/12 max-sm:w-12/12" for="file">
                <div class="icon">
                </div>
                <img src="../../assets/document.svg" alt="">
                <div class="text">
                  <span>Upload the drivers license</span>
                </div>
                <input id="file"
                  type="file" accept="[ '.xlsx, .xls, .jpeg, .doc, .docx,
                .pdf', .tif, .zip, ]" v-on:change="getLicence($event)" />
              </label>

            </div>
            <div>
              <label class="custum-file-upload max-md:w-12/12 max-sm:w-12/12" for="personalImg">
                <img src="../../assets/person.svg" alt="">
                <div class="text">
                  <span>Upload the personal image</span>
                </div>
                <input 
                  id="personalImg"
                  type="file" accept="[ '.xlsx, .xls, .jpeg, .doc, .docx,
                .pdf', .tif, .zip, ]" v-on:change="getPersonalImage($event)" />              </label>

            </div>
            <div class="max-sm:w-12/12">
              <label class="custum-file-upload max-sm:w-12/12 max-md:w-12/12" for="truckImg">
                <img src="../../assets/truck-image.svg" alt="">
                <div class="text">
                  <span>Upload the truck images</span>
                </div>
                <input  id="truckImg"
                  type="file" accept="[ '.xlsx, .xls, .jpeg, .doc, .docx,
                .pdf', .tif, .zip, ]" v-on:change="getFile($event)" />              </label>
            </div>
          </div>
        </div>
        <div class="mt-10 w-12/12 flex justify-center">
          <button type="submit"
            class="border py-2 px-4 uppercase text-xl text-white bg-sky-600 rounded-md ">submit</button>
        </div>
        <div class=" w-12/12 flex flex-wrap">

          <span class="px-4 bg-red-500 py-2 rounded my-2 mx-4 flex items-center " v-for="e in v$.$errors" :key="e.$uid">
            <Icon icon="mdi-alert-circle" class="w- h-8"></Icon>
            {{ e.$message }}
          </span>
        </div>
      </form>
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
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import router from "@/router";
import { Icon } from "@iconify/vue";



const yearsOfDriving = ref("")
const birthRegion = ref()
const fullName = ref("")
const phoneNumber = ref('+998 ')
const dateOfBirth = ref(new Date())
const truckModel = ref("")
const truckStatus = ref("")
const truckNumber = ref("")
const manufacturedYear = ref("")
const truckImages = ref("")
const personalPhoto = ref("")
const license = ref("")
const email = ref("")
const branch = ref()
const regionStore = useRegionStore()
const { branches } = storeToRefs(regionStore)

const getFile = $event => {
  [...$event.target.files].forEach(targetFile => {
    license.value = targetFile;
  });
};
const getPersonalImage = $event => {
  [...$event.target.files].forEach(targetFile => {
   

  personalPhoto.value ==targetFile;
  });
};
const getLicence = $event => {
  [...$event.target.files].forEach(targetFile => {
    license.value = targetFile;
  });
};



const submitForm = async () => {
  try {
    const valid = await validateForm()
    //send data to the server in the formData format and request to the server
    const driverDetails = {
      driverFullName: fullName.value,
      phoneNumber: phoneNumber.value,
      dateOfBirth: dateOfBirth.value,
      truckModel: truckModel.value,
      truckStatus: truckStatus.value,
      truckNumber: truckNumber.value,
      manufacturedYear: manufacturedYear.value,
      truckImages: truckImages.value,
      files: personalPhoto.value,
      license: license.value,
      branchId: 1,
      email: email.value,
    }


    if (valid) {
      console.log("submited");
    }
    console.log(valid);
  } catch (error) {
    console.log(error)
  }

}


const rules = {
  fullName: {
    required: helpers.withMessage('Full name is required', required),
  },
  phoneNumber: {
    required: helpers.withMessage('Phone number is required', required),
  },
  yearsOfDriving: {
    required: helpers.withMessage('Years of driving is required', required),
  },
  birthRegion: {
    required: helpers.withMessage('Birth region is required', required),
  },
  dateOfBirth: {
    required: helpers.withMessage('Date of birth is required', required),
  },
  truckModel: {
    required: helpers.withMessage('Truck model is required', required),

  },
  truckStatus: {
    required: helpers.withMessage('Truck status is required', required),
  },
  truckNumber: {
    required: helpers.withMessage('Truck number is required', required),
  },
  manufacturedYear: {
    required: helpers.withMessage('Manufactured year is required', required),
  },
}
const v$ = useVuelidate(rules, {
  fullName,
  phoneNumber,
  yearsOfDriving,
  birthRegion,  
  dateOfBirth,
  truckModel,
  truckStatus,
  truckNumber,
  manufacturedYear
})

const validateForm = async () => {
  try {
    const isValid = await v$.value.$validate()
    return isValid
  } catch (error) {
    console.log(error)
  }

}




async function getRegions() {
  try {
    await regionStore.getBranch()
  } catch (error) {
    console.log(error);
  }
}
const goBack = () => {
  router.back()
}


onMounted(() => {
  getRegions()
})

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

