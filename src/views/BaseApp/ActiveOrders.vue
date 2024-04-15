<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main class="w-full card bg-white rounded-md pl-4 pr-4 pb-3 mb-3">
    <div
      class="w-4/12 mb-4 border rounded-b-2xl bg-blue-600 mx-auto text-center h-10 flex items-center justify-center text-lg font-bold text-white"
    >
      Orders List
    </div>

    <EasyDataTable :headers="headers" :items="allOrders">
      <template #item-operation="item">
        <div class="flex">
          <button @click="editOrder(item)">
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
  </main>

</template>

<script setup lang="ts">
import { useOrderStore } from "@/stores/orderStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import type { Header, Item, FilterOption } from "vue3-easy-data-table";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import BaseMapVue from "@/components/BaseMap.vue";


const name = ref("");
const orderStore = useOrderStore()
const showNameFilter = ref(false);
const nameCriteria = ref("");
const rows = ref(15);
const success = ref("success");
const {allOrders} = storeToRefs(orderStore)


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
const headers: Header[] = [
  { text: "Client name", value: "client.name", sortable: true },
  { text: "Crated time", value: `createdAt`, sortable: true },
  { text: "Phone number", value: "client.phoneNumber" },
  { text: "From", value: "fromRegion.regionName" },
  { text: "To", value: "fromRegion.regionName" },
  { text: "Delivery date", value: "loadDayTime" },
  { text: "Payment type", value: "paymentType" },
  { text: "Status", value: "status" },
];
const editOrder = () => {
  console.log("here");
  
}

const loading = ref(false);
const getOrders = async () => {
  try {
    loading.value == true;
    await orderStore.getAllOrders();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
function formatISODateToReadable(dateStr: string): string {
  const date = new Date(dateStr);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleDateString('en-US', options) + ' ' + date.toLocaleTimeString('en-US', options);
}

const isoDate = '2024-02-12T13:18:39.472447Z';
const formattedDate = formatISODateToReadable(isoDate);
console.log(formattedDate);


onMounted(() => {
  getOrders();
});
</script>

<style scoped></style>
