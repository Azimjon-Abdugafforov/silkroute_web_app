<template>
  <div
    :class="`modal ${
      !isOpen && 'opacity-0 pointer-events-none'
    } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
  >
    <div
      @click="cancelEditing"
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>
    <div
      class="z-50 w-12/12 mx-auto overflow-y-auto bg-white rounded shadow-lg md:max-w-5xl"
    >
      <div
        class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
      >
        <svg
          class="text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          />
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="px-6 py-4 text-left modal-content">
        <!-- Title -->
        <div class="flex items-center justify-between pb-3">
          <p class="text-2xl font-bold">{{ title }}</p>
          <div class="z-50 cursor-pointer modal-close" @click="cancelEditing">
            <svg
              class="text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              />
            </svg>
          </div>
        </div>
        <slot name="extraContent"></slot>
        <!-- Modal Footer -->
        <div class="flex justify-end pt-2">
          <button
            @click="cancelEditing"
            class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
          >
            Close
          </button>

          <slot
            name="extraBtn"
            class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
          >
          </slot>
          <button
            @click="cancelEditing"
            class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";

// Define the props without destructuring
// eslint-disable-next-line no-undef
const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();



// Access the context using getCurrentInstance()
const context = getCurrentInstance();

const cancelEditing = () => {
  context?.emit("update:isOpen", false); // or 'context.emit('cancel-editing')' if you prefer to emit an event
};
</script>
