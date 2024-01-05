<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div>
  <FeatureViewsVue/>
</div>
</template>

<script setup lang="ts">
import FeatureViewsVue from "@/components/FeatureViews.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import { ref } from "vue";
import Breadcrumb from "../partials/Breadcrumb.vue";
interface User {
  name: string;
  email: string;
  title: string;
  title2: string;
  status: string;
  role: string;
}

const testUser: User = {
  name: "John Doe",
  email: "john@example.com",
  title: "Software Engineer",
  title2: "Web dev",
  status: "Active",
  role: "Owner",
};

const users = ref<User[]>([...Array(10).keys()].map(() => testUser));
</script>
