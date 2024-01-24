<template>
  <div v-if="resetPass" class="rounded-md absolute global-loader bg-transparent">
    <transition class=" w-4/12 mx-auto ">
      <div class="w-5/12 rounded-xl flex flex-col justify-between shadow-lg bg-white mx-auto border"
        style="height: 30vh;">
        <div>
          <h3 class="w-12/12 mt-2 text-center xl:text-3xl font-semibold text-sky-700">Request Password Reset</h3>
          <div class="flex justify-end -translate-y-10 ">
            <button class=" flex justify-end" @click="close()">
              <Icon icon="iconamoon:close-thin" class="w-12 h-12 cursor-pointer " color="rgb(67, 113, 163)" />
            </button>
          </div>
        </div>
        <div class="h-40">
          <p class="w-8/12 mx-auto text-xs text-slate-700">Enter your email address and we'll send you a link to reset
            your
            password</p>
          <form action="submit">
            <div class=" w-8/12 mx-auto">
              <label for="email"></label>
              <input v-model="userDetails.username" required type="email"
                class="border w-full mt-4 rounded-md border-sky-500" placeholder="enter your email address">
            </div>
          </form>
        </div>
        <button @click="resetPassword()"
          class="w-full hover:bg-sky-500 transition duration-300 bg-sky-700 h-12 text-white text-xl font-medium rounded-md border py-2 px-6"><span
            v-if="!btnLoading">Send</span>

          <div v-if="btnLoading" class="flex justify-center flex-row gap-2">
            <div class="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
            <div class="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
            <div class="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
          </div>
        </button>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Icon, loadIcon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import {useToast} from 'vue-toastification'

const toast = useToast()
const authStore = useAuthStore()
const { resetPass, userDetails } = storeToRefs(authStore)
const btnLoading = ref(false)


const close = () => {
  resetPass.value = false
}
const resetPassword = async () => {
  if (userDetails.value && userDetails.value.username && userDetails.value.username.length > 0) {
    try {
      btnLoading.value = true
      const data = await authStore.resetPassword(userDetails.value.username)
     if(data.responseCode == 200 ){
      toast.success("We've sent you the temporary password to your email!")
     }
    } catch (error) {
      console.log(error)
    }
    finally{
      btnLoading.value = false
      resetPass.value = false
    }
  }
}
</script>


<style scoped>
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>