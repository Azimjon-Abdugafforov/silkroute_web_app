<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div class="flex items-center justify-center">
          <img src="../../assets/silkroad.png" class="w-200" />
        </div>

        <div class="mt-6 flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
          <div class="w-full flex-1 mt-4">
            <div class="flex flex-col items-center">
              <button
                class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <div class="flex items-center justify-center">
                  <div class="w-9 bg-white p-2 rounded-full">
                    <svg class="w-5" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4" />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853" />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04" />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335" />
                    </svg>
                  </div>
                  <span class="ml-4"> Sign Up with Google </span>
                </div>
              </button>
            </div>

            <div class="my-8 border-b text-center">
              <div
                class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or sign up with e-mail
              </div>
            </div>

            <div class="mx-auto max-w-xs">
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email" placeholder="Email" />
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password" placeholder="Password" />
              <button
                class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <span class="ml-3">Sign In</span>
              </button>
              <p class="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by templatana's
                <a href="#" class="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>
                and its
                <a href="#" class="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
const rules = {
  userDetails: {
    username: {
      required: helpers.withMessage("Login kiriting!", required),
    },
    password: {
      required: helpers.withMessage("Parolni kiriting!", required),
    },
  },
};

const authStore = useAuthStore();

const router = useRouter();
const username = ref("");
const password = ref("");

const userDetails = reactive({
  username: username.value,
  password: password.value,
});
const v$ = useVuelidate(rules, { userDetails });

async function login() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const data = await authStore.login(userDetails);
    console.log(data);
    if (data) {
      router.push("/dashboard");
    }
  }
}
</script>
<style lang="css" scoped>
.container {
  height: 100vh;
  display: flex;
  margin: auto;
  width: 520px;
  height: 500px;
  max-width: 99%;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #ffffff25;
  border-radius: 15px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.03);
  border: 0.1px solid rgba(128, 128, 128, 0.178);
}

.left {
  width: 66%;
  height: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  left: 0;
  backdrop-filter: blur(20px);
  position: relative;
}

.form::before {
  position: absolute;
  content: "";
  width: 40%;
  height: 40%;
  right: 1%;
  z-index: -1;
  background: radial-gradient(circle,
      rgb(194, 13, 170) 20%,
      rgb(26, 186, 235) 60%,

      rgb(26, 186, 235) 100%);
  filter: blur(70px);
  border-radius: 50%;
}

.right {
  width: 34%;
  height: 100%;
}

.img {
  width: 100%;
  height: 100%;
}

.container::after {
  position: absolute;
  content: "";
  width: 80%;
  height: 80%;
  right: -40%;
  background: rgb(157, 173, 203);
  background: radial-gradient(circle,
      rgba(157, 173, 203, 1) 61%,
      rgba(99, 122, 159, 1) 100%);
  border-radius: 50%;
  z-index: -1;
}

.input,
button {
  background: rgba(253, 253, 253, 0);
  outline: none;
  border: 1px solid rgba(255, 0, 0, 0);
  border-radius: 0.5rem;
  padding: 10px;
  margin: 10px auto;
  width: 80%;
  display: block;
  color: #425981;
  font-weight: 500;
  font-size: 1.1em;
}

.input-block {
  position: relative;
}

label {
  position: absolute;
  left: 15%;
  top: 37%;
  pointer-events: none;
  color: gray;
}

.forgot {
  display: block;
  margin: 5px 0 10px 0;
  margin-left: 35px;
  color: #5e7eb6;
  font-size: 0.9em;
}

.input:focus+label,
.input:valid+label {
  transform: translateY(-120%) scale(0.9);
  transition: all 0.4s;
}

button {
  background-color: #5e7eb6;
  color: white;
  font-size: medium;
  box-shadow: 2px 4px 8px rgba(70, 70, 70, 0.178);
}

a {
  color: #5e7eb6;
}

.input {
  box-shadow: inset 4px 4px 4px rgba(165, 163, 163, 0.315),
    4px 4px 4px rgba(218, 218, 218, 0.13);
}
</style>
