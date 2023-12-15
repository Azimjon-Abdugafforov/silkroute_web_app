<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";
import { useSidebar } from "../hooks/useSidebar";
import NavItem from "./NavComonents/NavItem.vue";
import NavHeader from "./NavComonents/NavHeader.vue";
import NavGroup from "./NavComonents/NavGroup.vue";
import { navItems } from "@/hooks/useSidebar";

const activeClass = ref(
  "bg-blue-600 bg-opacity-25 text-gray-100 border-gray-100"
);
const inactiveClass = ref(
  "border-blue-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
);

const { isOpen } = useSidebar();
</script>

<template>
  <div class="flex">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-red opacity-50 lg:hidden"
    ></div>

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-blue-800 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img src="../assets/silkroad.png" class="w-200" />
        </div>
      </div>

      <nav class="mt-10">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <NavItem
              :class="[
                $route.name === item.title ? activeClass : inactiveClass,
              ]"
              v-if="item?.to"
              :item="item"
            />
            <NavHeader v-if="item?.header" :item="item" />
            <NavGroup
              :class="[
                $route.name === item.title ? activeClass : inactiveClass,
              ]"
              v-if="item.childNav"
              :item="item"
            />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
