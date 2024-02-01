<template>
  <div class="flex h-screen bg-gray-100 font-roboto">
    <Sidebar v-if="role" />

    <div class="flex-1 flex flex-col overflow-hidden">

      <Header v-if="!role"/>
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <CarouselView v-if="!role" />

        <div class=" mx-auto ">
          <slot />
        </div>
      </main>
      <ChatWithAi class=" flex justify-end mr-12"></ChatWithAi>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import CarouselView from "./CarouselView.vue";
import BaseLoader from '@/components/BaseLoader.vue'
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import ChatWithAi from "./ChatWithAi.vue";
import Footer from "./Footer.vue";



const role = localStorage.getItem('role')
</script>
