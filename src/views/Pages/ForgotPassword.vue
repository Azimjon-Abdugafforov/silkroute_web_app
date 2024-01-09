<template>
  <div v-if="props.isVisible" class="rounded-md absolute global-loader bg-transparent">
    <transition class=" w-4/12 mx-auto ">
      <div class="w-5/12 rounded-xl flex flex-col justify-between shadow-lg bg-white mx-auto border"
        style="height: 30vh;">
        <div>
          <h3 class="w-12/12 mt-2 text-center xl:text-3xl font-semibold text-sky-700">Request Password Reset</h3>
          <div class="flex justify-end -translate-y-10 ">
            <button class=" flex justify-end" @click="close">
              <Icon icon="iconamoon:close-thin" class="w-12 h-12 cursor-pointer " color="rgb(67, 113, 163)" />
            </button>
          </div>
        </div>
        <div class="h-40">
          <p class="w-8/12 mx-auto text-xs text-slate-700">Enter your email address and we'll send you a link to reset
            your
            password</p>
          <form action="submit">
            <div class=" w-8/12 mx-auto">
              <label for="email"></label>
              <input v-model="email" required type="email" class="border w-full mt-4 rounded-md border-sky-500"
                placeholder="enter your email address">
            </div>
          </form>
        </div>
        <button @click="resetPassword()"
          class="w-full hover:bg-sky-500 transition duration-300 bg-sky-700 text-white text-xl font-medium rounded-md border py-2 px-6">Send</button>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { Icon } from '@iconify/vue';

const email = ref("");
const props = defineProps<{
  isVisible: boolean
}>();
const emits = defineEmits(['update:isVisible']); 

const close = () => {
  emits('update:isVisible', false);
  console.log(props.isVisible);
}

const resetPassword = async () => {
  console.log('reset');
}

</script>


<style scoped>
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>