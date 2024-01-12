<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { useSidebar } from "../hooks/useSidebar";
import NavItem from "./NavComonents/NavItem.vue";
import NavHeader from "./NavComonents/NavHeader.vue";
import NavGroup from "./NavComonents/NavGroup.vue";
import { navItems } from "@/hooks/useSidebar";
import { Icon } from "@iconify/vue";

const activeClass = ref(
  "bg-blue-600 bg-opacity-25 text-gray-100 border-gray-100"
);
const inactiveClass = ref(
  "border-blue-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
);

const { isOpen } = useSidebar();
const userRole = localStorage.getItem("role");
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  window.location.href = "/login";
};

const filteredNavItems = computed(() => {
  return navItems.filter((item) => {
    return !item.role || item.role === userRole;
  });
});

</script>

<template>
  <div>
    <div :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-red opacity-50 lg:hidden"></div>

    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 flex items-center justify-between w-64 rounded-r-xl overflow-y-auto transition duration-300 transform bg-blue-800 lg:translate-x-0 lg:static lg:inset-0 flex-col"
      style="height: 100vh;">
      <div>
        <div class="flex items-center justify-center mt-8">
          <div class="flex items-center text-white italic">
            <img src="../assets/main.jpg" class="w-200" />
            <span class="text-2xl font-bold uppercase text-white">SilkRoute</span>
            <span class="relative translate-y-4 -translate-x-7 ">Express</span>
          </div>
        </div>
        <nav class="mt-10">
          <ul>
            <li v-for="item in filteredNavItems" :key="item.id">
              <NavItem :class="[
                $route.name === item.title ? activeClass : inactiveClass,
              ]" v-if="item?.to" :item="item" />
              <NavHeader v-if="item?.header" :item="item" />
              <NavGroup :class="[
                $route.name === item.title ? activeClass : inactiveClass,
              ]" v-if="item.childNav" :item="item" />
            </li>
          </ul>
        </nav>
      </div>
      <div class="w-full">
        <button @click="logout()"
          class="w-full bg-white py-6  flex items-center justify-center rounded-sm cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-slate-400 before:to-slate-50 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-black text-xl font-semibold">
          Logout
          <Icon icon="mdi-logout" class="text-black w-10 h-8  mx-3" />
        </button>
      </div>
    </div>
  </div>
</template>

