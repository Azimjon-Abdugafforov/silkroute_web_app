<template>
  <div class="flex w-auto h-auto flex-col gap-1 justify-end">
    <label class="text-sm w-auto font-medium">{{ label }}</label>
    <select
      v-model="selectedResult"
      class="field bg-white h-10 w-auto border-2 border-sky-300 border-opacity-90 rounded-md  text-sm  p-1 outline-none"
      @change="handleChange"
      v-bind="$attrs"
    > 
      <option
      class="bg-primary  text-sm font-medium text-white hover:font-bold"
        v-for="option in options"
        :key="option.id"
        :value="option"
      >
        {{ option?.[resultNameKey] }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref, watch, toRefs } from 'vue';

export default {
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    options: {
      type: Array,
      required: true,
    },
    resultNameKey: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue, resultNameKey } = toRefs(props);
    const selectedResult = ref(modelValue.value);

    const handleChange = () => {
      emit('update:modelValue', selectedResult.value);
    };

    watch(modelValue, (newValue) => {
      selectedResult.value = newValue;
    });

    return {
      selectedResult,
      handleChange,
    };
  },
};
</script>
