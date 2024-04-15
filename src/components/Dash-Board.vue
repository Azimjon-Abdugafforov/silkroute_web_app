<template>
  <div class="flex h-screen bg-gray-100 font-roboto">
    <Sidebar :isOpen="isOpen" v-if="role" />
    <span  v-if="role && visibleIcon " class="z-50" @click="toggleOpen">
      <Icon  v-if="!isOpen"  icon="line-md:close-to-menu-alt-transition" class="w-6 h-6"></Icon>
      <Icon v-if="isOpen" :icon="'line-md:menu-to-close-alt-transition'" color="white" class="w-6 h-6"/>
    </span>

    
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header v-if="!role" />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <CarouselView v-if="!role" />
        <div class="mx-auto">
          <slot />
        </div>
      </main>
 
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, watchEffect } from 'vue';
import CarouselView from "./CarouselView.vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { useSidebar } from "@/hooks/useSidebar";
import { Icon } from "@iconify/vue";

const { isOpen } = useSidebar();
const role = ref('');
const windowWidth = ref(window.innerWidth);
const visibleIcon =ref(false)

const toggleOpen = () => {
  console.log("Toggle sidebar");
  isOpen.value = !isOpen.value;
};
function handleResize() {
  windowWidth.value = window.innerWidth;
  if(windowWidth.value > 1020){
    visibleIcon.value = false
  }
  else{
    visibleIcon.value = true
  }
}

onMounted(() => {
  role.value = localStorage.getItem('role') || '';
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
watchEffect(()=>{
  handleResize()
})
</script>
