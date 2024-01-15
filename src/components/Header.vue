<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="flex items-center justify-between px-6 py-5 bg-white border-b-4 border-sky-600 shadow-2xl">

    <div class="w-full flex items-center">
      <button @click="isOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <img src="../assets/main_logo.png" class="h-8 md:h-10 lg:h-12">
      <nav class="max-sm:hidden max-md:hidden max-lg:hidden   w-full flex-grow">
        <ul class="w-full flex items-center justify-end">
          <li
            class="border-b-4 uppercase md:text-sm xl:text-xs font-sans font-normal mx-2 md:mx-4 lg:mx-6 py-2 px-2 md:px-4 lg:px-6 border-transparent hover:border-sky-600 transition duration-300"
            v-for="route in navbarRoutes" :key="route.path">
            <router-link :to="route.path" class="flex items-center">
              <Icon :icon="route.icon" color="black" class="w-4 h-4 mr-2" />
              <span>{{ route.name }}</span>
            </router-link>
          </li>
          <li class=" ml-2 md:ml-4 lg:ml-6">
            <button @click="routePush()"
              class="border xl:px-4 xl:py-2 xl:text-xs px-6 py-3 bg-blue-500 rounded-md uppercase font-bold text-white">
              Get a Quote
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- the responsive sidebar -->
    <div class="border flex">
      <div
        :class="isOpen ? 'block opacity-100 transition-opacity duration-2000' : 'hidden opacity-0 transition-opacity duration-2000'"
        @click="isOpen = false" class="fixed inset-0 z-50 bg-red lg:hidden">
        <div
          :class="isOpen ? 'translate-x-0 ease-out transition-transform duration-2000' : '-translate-x-full ease-in transition-transform duration-2000'"
          class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transform bg-sky-600 lg:translate-x-0 lg:static lg:inset-0">

          <nav class="w-full flex mt-10 justify-center  mx-auto">
            <ul>
              <li v-for="item in navbarRoutes" :key="item.path">
                <router-link class="flex  items-center px-6 py-2 mt-4 duration-200 border-l-4" :to="item.path">
                  <Icon :icon="item.icon" color="white" class="w-6 h-6" />
                  <span class="mx-4 uppercase text-md text-white ">{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <!-- the end of the sidebar -->
    <div class="flex items-center ml-3">
      <div class="relative ">
        <button @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
          <img class="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Your avatar" />
        </button>

        <!-- <div v-show="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 z-index w-full h-full border"></div> -->

        <transition enter-active-class="transition duration-150 z-50 ease-out transform" enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100" leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100" leave-to-class="scale-95 opacity-0">
          <div v-show="dropdownOpen" class="absolute right-0  w-48 py-1 mt-2 bg-white rounded-lg shadow-xl">
            <a href="#" class="px-4 py-2 flex rounded-md text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile</a>
            <a href="#" class="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings</a>
            <router-link to="/"
              class="flex px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out</router-link>
          </div>
        </transition>
      </div>
    </div>

  </header>
  <BaseLoader v-if="loading"/>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";


const loading = ref(false)

const router = useRouter()
const dropdownOpen = ref(false);
const notificationOpen = ref(false);
const isOpen = ref(false);

async function  routePush() {
  try {
      loading.value = true
      router.push('/create-order')



  } catch (error) {
    console.log(error)
  }
  finally{
    loading.value = false
  }
}

const navbarRoutes = [
  {
    name: "Moving Services",
    path: "/services",
    icon: "bx:bx-home",
  },
  {
    name: "Packing and More",
    path: "/more",
    icon: "bx:bx-user",
  },
  {
    name: "Resources",
    path: "/resources",
    icon: "bx:bx-book-content",
  },
  {
    name: "Locations",
    path: "/locations",
    icon: "bx:bx-map",
  },

];
</script>
<style scoped>
/* Add this style to override the background */
.spinner {
  background: none !important;
}
</style>
