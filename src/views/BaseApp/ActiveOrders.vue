<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main class="w-full card bg-white rounded-md pl-4 pr-4 pb-3 mb-3">
    <div
      class="w-4/12 mb-4 border rounded-b-2xl bg-blue-600 mx-auto text-center h-10 flex items-center justify-center text-lg font-bold text-white">
      Orders List
    </div>

    <EasyDataTable :headers="headers" :items="formattedOrders">
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
      </template>
    </EasyDataTable>
  </main>
</template>

<script setup lang="ts">
import { useOrderStore } from "@/stores/orderStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import type { Header, FilterOption } from "vue3-easy-data-table";
import { IOrder } from "../Order/Steps/types";

const orderStore = useOrderStore();
const { allOrders } = storeToRefs(orderStore);

const showNameFilter = ref(false);
const nameCriteria = ref("");
const formattedOrders = computed(() => formatISODateToReadable(allOrders.value));

const headers: Header[] = [
  { text: "Client name", value: "client.name", sortable: true },
  { text: "Crated time", value: "createdAt", sortable: true },
  { text: "Phone number", value: "client.phoneNumber" },
  { text: "From", value: "fromRegion.regionName" },
  { text: "To", value: "toRegion.regionName" },
  { text: "Delivery date", value: "loadDayTime" },
  { text: "Payment type", value: "paymentType" },
  { text: "Status", value: "status" },
];

const getOrders = async () => {
  try {
    loading.value = true;
    await orderStore.getAllOrders();
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    loading.value = false;
  }
};
const loading = ref(false)

const editOrder = (item: any) => {
  console.log("Editing order:", item);
};

onMounted(getOrders);
function formatISODateToReadable(arr: IOrder[]): IOrder[] {
  return arr.map(order => ({
    ...order,
    createdAt: new Date(order.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit"
    }),
    loadDayTime: new Date(order.loadDayTime).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit"
    })
  }));
}

</script>

<style scoped></style>
