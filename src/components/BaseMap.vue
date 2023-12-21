<template>
  <div>
    <!-- <input
      v-model="searchQuery"
      placeholder="Search for a location..."
      @input="handleSearch"
      class="search-input border"
    /> -->
    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

let latitude = ref(0);
let longitude = ref(0);
const accessToken =
  "pk.eyJ1IjoidGhld2Vla25kIiwiYSI6ImNsbHc1czg1ZDAzNmEzZGxmY3poNHpkZWIifQ.DCsa6pwMfm3LF_YpZ1PeEA";

let map = null;
const searchQuery = ref("");

const handleSearch = () => {  
  // Your existing search handling logic
};

watch(searchQuery, handleSearch);

onMounted(() => {
  mapboxgl.accessToken = accessToken;

  map = new mapboxgl.Map({
    container: "mapContainer",
    style: "mapbox://styles/mapbox/navigation-night-v1",
    center: [66.956955, 41.377491],
    zoom: 5,
    pitch: 0,
    // maxBounds: [
    //   [45, 35], // Lower-left corner of the maxBounds
    //   [85, 55], // Upper-right corner of the maxBounds
    // ],
  });

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });

  map.addControl(geocoder);

  geocoder.on("result", (event) => {
    const { center } = event.result.geometry;
    if (center && center.length >= 2) {
      map.setCenter(center);
      latitude.value = center[1];
      longitude.value = center[0];
    } else {
      console.error("Invalid center properties:", center);
    }
  });
});
</script>

<style lang="css" scoped>
.search-input {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}

.basemap {
  width: 100%;
  height: 40vh;
  margin-top: 40px; /* Adjust the margin-top based on your design preferences */
}
</style>
