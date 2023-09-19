<template>
  <div>
    <div class="flex gap-1 w-auto h-auto flex-col justify-end">
      <label
        v-if="label"
        :for="id"
        :class="['text-sm font-medium flex items-end h-6 w-45', color]"
        >{{ label }}</label
      >
      <input
        v-bind="$attrs"
        :path="props.icons"
        :id="props.id"
        :type="props.type"
        :maxlength="props.max"
        :minlength="props.min"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :disabled="disabled"
        :class="[{ 'border-green-600': success }]"
        :accept="props.accept"
        @input="updateInput"
        class="border h-8 bg-white p-1 rounded-md text-sm w-auto transition-all focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
      />
    </div>
    <p
      v-if="props.errors"
      class="text-red-600 text-sm font-medium flex items-end h-6 w-45"
    >
      {{ props.errors }}
    </p>
    <p
      v-if="success"
      class="text-green-600 text-sm font-medium flex items-end h-6 w-45"
    >
      {{ success }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";

interface Props {
  id: number | string;
  icons: string;
  max: number;
  min: number;
  label: string;
  modelValue: number | string | object | Array<any>;
  type: string;
  placeholder: string | number;
  errors: Array<any> | string;
  color: string | number;
  componentClass: string;
  accept: Array<any> | object | string;
  disabled: boolean;
}

const props = defineProps<Props>();

const success = ref<string>(""); // Success message

const componentClass = computed(() => {
  const base = [props.disabled ? "cursor-not-allowed" : "cursor-text"];
  if (props.disabled) {
    base.push(props.outline ? "opacity-50" : "opacity-70");
  }
  if (success.value) {
    base.push("border-green-400"); // Add green border class for success
  }
  return base;
});

const emit = defineEmits(["update:modelValue"]);

const updateInput = (event: InputEvent) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

// Function to show a success message
const showSuccessMessage = (message: string) => {
  success.value = message;
  setTimeout(() => {
    success.value = "";
  }, 3000); // Hide the message after 3 seconds
};
</script>
