<template>
  <BaseModal
    v-model:isOpen="employeeStore.isEditing"
    title="here"
    @cancel-editing="employeeStore.isEditing === false"
  >
    <template #extraContent>
      <p>
        {{ currentUser }}
        <BaseInput
          v-model:model-value="currentUser.username"
          label="Xodim Ismi"
          placeholder="Enter your name"
          :errorMessage="nameError"
          :success="nameSuccess"
        />
      </p>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useEmployeeStore } from "@/stores/employeeStore";
import { storeToRefs } from "pinia";
import { ICurrentUser } from "../types/types";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import { ref } from "vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";

const cancelEditing = () => {
  employeeStore.isEditing = false;

  setTimeout(() => {
    employeeStore.currentUser = {} as ICurrentUser;
  }, 200);
};
const nameError = ref("");
const nameSuccess = ref(false);

const employeeStore = useEmployeeStore();
const { currentUser } = storeToRefs(employeeStore);
</script>

<style scoped></style>
