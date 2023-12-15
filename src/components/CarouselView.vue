<template>
    <fwb-carousel :pictures="pictures" slide :slide-interval="10000" />
</template>

<script setup lang="ts">
import { FwbCarousel } from 'flowbite-vue'
import img2 from "@/assets/truck5.jpeg"
import img3 from "@/assets/workk.jpeg"

const pictures = [  
  {src:img2, },
  {src:img3, },
  

]

</script>

