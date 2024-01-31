<template>
  <div>
    <div class="flex gap-1 w-auto h-auto flex-col justify-end">
      <label
        v-if="label"
        :class="['text-sm font-medium flex items-end h-6 w-45']"
        >{{ label }}</label
      >
      <input
        v-bind="$attrs"
        :path="props.icons"
        :type="props.type"
        :maxlength="props.max"
        :minlength="props.min"
        :value="props.modelValue"
        :disabled="disabled"
        :class="[{ 'border-2 border-green-500': props.success }]"
        :accept="props.accept"
        @input="updateInput"
        class="border-2 px-3 h-12 bg-white p-1 rounded-md text-sm w-auto transition-all focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
      />
    </div>
    <p
      v-if="props.errors"
      class="text-red-600 text-sm font-medium flex items-end h-6 w-45"
    >
      {{ props.errors }}
    </p>
    <!-- <p
      v-if="props.success"
      class="text-green-600 text-sm font-medium flex items-end h-6 w-45"
    >
      {{ props.success }}
    </p> -->
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";

interface Props {
  label: string;
  modelValue: number | string | object | Array<any>;
  type: string;
  errors: Array<any> | string;
  disabled: boolean;
  success: string;
}

const props = defineProps<Props>();

const success = ref<string>(""); 

const componentClass = computed(() => {
  const base = [props.disabled ? "cursor-not-allowed" : "cursor-text"];
  if (props.disabled) {
    base.push(props.outline ? "opacity-50" : "opacity-70");
  }
  if (success.value) {
    base.push("border-green-400"); 
  }
  return base;
});

const emit = defineEmits(["update:modelValue"]);

const updateInput = (event: InputEvent) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

</script>
