<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 ">
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <form @submit.prevent="login()">
          <div class="flex items-center justify-center">
            <img src="../../assets/silkroad.png" class="w-200" />
          </div>
          <div class="mt-6 flex flex-col items-center">
            <div class="w-full flex-1 mt-4">
              <div class="flex flex-col items-center">
              </div>
              <div class="my-8 border-b text-center">
                <div
                  class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  We send you an email with login and password! Sign in here using them!
                </div>
              </div>
              <div class="mx-auto max-w-xs">
                <input required v-model="userDetails.username"
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text" placeholder="Email" />
                <input required v-model="userDetails.password"
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password" placeholder="Password" />
                <span @click="forgotPassword()"
                  class="hover:text-sky-400 w-12/12 flex justify-end text-xs cursor-pointer text-sky-600 mt-1">Forgot
                  password</span>
                <button type="submit"
                  class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span class="ml-3">Sign In</span>
                </button>
                <p class="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by templatana's
                  <a href="#" class="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>
                  and its
                  <a href="#" class="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
            <div class="bg-img"></div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <BaseLoader :isVisible="loading" />
  <ForgotPassword :is-visible="isVisible" @update:isVisible="updateIsVisible(isVisible)" />
</template>

<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from "vue";
import BaseLoader from '@/components/BaseLoader.vue'
import ForgotPassword from "./ForgotPassword.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { useToast } from 'vue-toastification'

const toast = useToast()
const authStore = useAuthStore();
const { resetPass, loading, userDetails } = storeToRefs(authStore)

const forgotPassword = () => {
  resetPass.value = true
  console.log(resetPass.value)
}
const isVisible = ref(false)
const router = useRouter();



async function login() {
  console.log(userDetails.value);


  if (userDetails.value && userDetails.value.username && userDetails.value.username.length > 0 && userDetails.value.password.length > 0) {
    try {
      loading.value = true
      const data = await authStore.login(userDetails.value);
      if (data?.user) {
        router.push("/my-orders");
      }
      else {
        router.push("/login")
      }
    } catch (error) {
      loading.value = false
    }
    finally {
      loading.value = false
    }
  }
  else {
    toast.error("Please fill the gaps!")
  }

}
const updateIsVisible = (value: boolean) => {
  isVisible.value = value;
};


</script>
<style lang="css" scoped>
.container {
  height: 100vh;
  display: flex;
  margin: auto;
  width: 520px;
  height: 500px;
  max-width: 99%;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #ffffff25;
  border-radius: 15px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.03);
  border: 0.1px solid rgba(128, 128, 128, 0.178);
}

.bg-img {
  background: url(../../assets/bg-login.svg);
  background-repeat: no-repeat;
  background: bottom;
}

.left {
  width: 66%;
  height: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  left: 0;
  backdrop-filter: blur(20px);
  position: relative;
}

.form::before {
  position: absolute;
  content: "";
  width: 40%;
  height: 40%;
  right: 1%;
  z-index: -1;
  background: radial-gradient(circle,
      rgb(194, 13, 170) 20%,
      rgb(26, 186, 235) 60%,

      rgb(26, 186, 235) 100%);
  filter: blur(70px);
  border-radius: 50%;
}

.right {
  width: 34%;
  height: 100%;
}

.img {
  width: 100%;
  height: 100%;
}

.container::after {
  position: absolute;
  content: "";
  width: 80%;
  height: 80%;
  right: -40%;
  background: rgb(157, 173, 203);
  background: radial-gradient(circle,
      rgba(157, 173, 203, 1) 61%,
      rgba(99, 122, 159, 1) 100%);
  border-radius: 50%;
  z-index: -1;
}

.input,
button {
  background: rgba(253, 253, 253, 0);
  outline: none;
  border: 1px solid rgba(255, 0, 0, 0);
  border-radius: 0.5rem;
  padding: 10px;
  margin: 10px auto;
  width: 80%;
  display: block;
  color: #425981;
  font-weight: 500;
  font-size: 1.1em;
}

.input-block {
  position: relative;
}

label {
  position: absolute;
  left: 15%;
  top: 37%;
  pointer-events: none;
  color: gray;
}

.forgot {
  display: block;
  margin: 5px 0 10px 0;
  margin-left: 35px;
  color: #5e7eb6;
  font-size: 0.9em;
}

.input:focus+label,
.input:valid+label {
  transform: translateY(-120%) scale(0.9);
  transition: all 0.4s;
}

button {
  background-color: #5e7eb6;
  color: white;
  font-size: medium;
  box-shadow: 2px 4px 8px rgba(70, 70, 70, 0.178);
}

a {
  color: #5e7eb6;
}

.input {
  box-shadow: inset 4px 4px 4px rgba(165, 163, 163, 0.315),
    4px 4px 4px rgba(218, 218, 218, 0.13);
}
</style>
