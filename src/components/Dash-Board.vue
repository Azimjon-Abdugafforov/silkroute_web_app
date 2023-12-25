<template>
  <div class="flex h-screen bg-gray-100 font-roboto">
    <!-- <Sidebar /> -->

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <CarouselView />

        <div class=" mx-auto ">
          <slot />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import CarouselView from "./CarouselView.vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>
