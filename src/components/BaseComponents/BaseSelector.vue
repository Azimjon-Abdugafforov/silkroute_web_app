<template>
  <div class="flex w-auto h-auto flex-col gap-1 justify-end">
    <label v-if="label" class="text-sm w-auto font-medium" :class="color">{{
      props.label
    }}</label>

    <select
      :value="modelValue"
      class="field border h-8 w-auto bg-slate-100 border-secondary text-sm rounded-md p-1 outline-none"
      v-bind="{
        ...$attrs,
        onChange: $event => {
          emit('update:modelValue', $event.target.value);
        },
      }"
    >
      <option></option>
      <option
        class="bg-primary border-2 text-sm font-medium text-white hover:font-bold"
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :selected="option === modelValue"
      >
        {{ option.name }}
      </option>
    </select>
    <p class="text-red-600 text-sm font-medium flex items-end h-6 w-45">
      {{ props.errors }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import { defineProps } from 'vue';

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  label: [String],
  modelValue: [String, Number, Array],
  options: [Array, Object, String],
  color: [String, Number],
  errors: [String],
});
</script>

<style lang="scss" scoped></style>
