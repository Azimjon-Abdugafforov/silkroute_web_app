<template>
  <div v-if="myOrders" class="w-10/12 mx-auto">
here is my orders:
<br>
{{ myOrders[0] }}
<ul v-for="item in myOrders" :key="item.email">
  <li class="border py-2 px-3 my-4 h-36 rounded-md bg-white cursor-pointer flex justify-between ">
    <span class="text-xl flex items-center font-semibold mx-2 my-4">{{ formatDate(item.loadDayTime) }}</span>
    <div class="border w-8/12 text-center flex justify-around items-center" >
      <div class="border ">
        <span class=" text-xl">From</span>
        <p class="text-md">{{ item.fromRegion?.regionName }}</p>
        <span class="text-xs">{{ item.fromDistrict.name }}</span>
      </div>
      <div class="border">
        <span class=" text-xl ">To</span>
        <p class="text-md">{{ item.toRegion?.regionName }}</p>
        <span class="text-xs">{{ item.toDistrict.name }}</span>
      </div>
    </div>
    <span class="text-md mx-10 flex items-end font-bold">{{ item.status }}</span>
  </li>
</ul>

</div>
<BaseLoader :is-visible="loading"/>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import BaseLoader from '@/components/BaseLoader.vue'



const loading = ref(false)
const orderStore = useOrderStore()
const {myOrders} = storeToRefs(orderStore)
const getUserOrders = async()=>{
  try {
    loading.value = true
    const user = ref(localStorage.getItem("name"))
    console.log(user)
    if(user.value !== null){
      const data = await orderStore.getOrderByUsername(user.value)
      console.log(data)
    }
    else{
      console.log("User is not setted!!")
    }
   
  } catch (error) {
    console.log(error)
  }
  finally{
      loading.value =false
    }
}
function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  
  // Extract date components
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  // Format the date
  return `${day}-${month}-${year}`;
}



onMounted(()=>{
  getUserOrders();
})
</script>

<style scoped>

</style>