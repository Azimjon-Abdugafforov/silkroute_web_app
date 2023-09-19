<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main class="w-full card bg-white rounded-md pl-4 pr-4 pb-3 mb-3">
    <div
      class="w-4/12 mb-4 border rounded-b-2xl bg-blue-600 mx-auto text-center h-10 flex items-center justify-center text-lg font-bold text-white"
    >
      Employee List
    </div>

    <EasyDataTable :headers="headers" :items="userList">
      <template #item-operation="item">
        <div class="flex">
          <button @click="editStaff(item)">
            <base-icon icon="mdi:pencil" color="green" class="w-6 h-6" />
          </button>

          <Icon icon="mdi:delete" color="red" class="w-6 h-6" />
        </div>
      </template>
      <template #name="name">
        <div class="filter-column">
          <button @click.stop="showNameFilter = !showNameFilter">
            {{ name.text }}
          </button>

          <div class="filter-menu" v-if="showNameFilter">
            <input v-model="nameCriteria" />
          </div>
        </div>
        ></template
      >
    </EasyDataTable>
    <BaseMapVue />
  </main>

  <EditStaff />
</template>

<script setup lang="ts">
import { useEmployeeStore } from "@/stores/employeeStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import type { Header, Item, FilterOption } from "vue3-easy-data-table";
import type { ICurrentUser } from "./types/types";
import EditStaff from "./components/EditStaff.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import BaseMapVue from "@/components/BaseMap.vue";

const employeeStore = useEmployeeStore();
// const searchField = ["name", "lastname", "position", "phone", "is_active"];
// const search = ref();
const name = ref("");

const filterOptions = computed((): FilterOption[] => {
  const nameArray: FilterOption[] = [];
  nameArray.push({
    field: "name",
    comparison: (value, criteria): boolean =>
      value != null &&
      criteria != null &&
      typeof value === "string" &&
      value.includes(`name-${criteria}`),
    criteria: name.value,
  });

  return nameArray;
});

const showNameFilter = ref(false);
const nameCriteria = ref("");
const editStaff = async (item: ICurrentUser) => {
  employeeStore.currentUser = item;
  employeeStore.isEditing = true;
};
const rows = ref(15);

const success = ref("success");
const { userList } = storeToRefs(employeeStore);
const headers: Header[] = [
  { text: "Name", value: "name", sortable: true },
  { text: "Last Name", value: "lastname", sortable: true },
  { text: "Phone number", value: "phone" },
  { text: "Lavozim", value: "position.title" },
  { text: "Mintaqa", value: "region.name" },
  { text: "Filial", value: "branch.name" },
  { text: "Holati", value: "is_active" },
  { text: "Operation", value: "operation" },
];

const loading = ref(false);
const getEmployees = async () => {
  try {
    loading.value == true;
    await employeeStore.getEmployees();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getEmployees();
});
</script>

<style scoped></style>
