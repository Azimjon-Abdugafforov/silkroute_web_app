<template>
  <div>
    <div class="max-w-xs relative  mx-auto">
      <label for="search" class="text-gray-900 text-md pl-2  font-normal">{{ label }}</label>

      <input
        type="text"
        id="search"
        v-model="searchTerm"
        :placeholder="placeholder"
        class="p-3 mb-0.5 w-full border border-gray-300 rounded text-sm"
      >

      <ul
        v-if="searchResults.length"
        class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10"
      >
        <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
          Showing {{ searchResults.length }} of {{ allItems.length }} results
        </li>
        <li
          v-for="result in searchResults"
          :key="result.id"
          @click="selectItem(result)"
          class="cursor-pointer hover:bg-gray-100 p-1"
        >
          {{ result[resultNameKey]  }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    allItems: {
      type: Array,
      required: true,
    },
    resultNameKey: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object, // Assuming each item is an object
    },
    placeholder:{
      type: String,
      default: 'Default Placeholder', 

    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const searchTerm = ref('');
    const selectedResult = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        selectedResult.value = newValue;
      }
    );

    const searchResults = computed(() => {
      if (searchTerm.value === '') {
        return [];
      }

      let matches = 0;

      return props.allItems.filter((item) => {
        if (
          item[props.resultNameKey]
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) &&
          matches < 10
        ) {
          matches++;
          return item;
        }
      });
    });

    const selectItem = (result) => {
      selectedResult.value = result;
      searchTerm.value = '';
      emit('update:modelValue', result);
    };

    return {
      searchTerm,
      searchResults,
      selectItem,
      selectedResult, 
    };
  },
};
</script>
