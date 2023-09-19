<template>
  <div>
    <input
      v-model="searchQuery"
      placeholder="Search for a location..."
      @input="handleSearch"
    />
    <div id="mapContainer" class="basemap"></div>
    <div class="coordinates">
      <p>Latitude: {{ latitude }}</p>
      <p>Longitude: {{ longitude }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import mapboxgl from "mapbox-gl";

let latitude = ref(0);
let longitude = ref(0);
const accessToken =
  "pk.eyJ1IjoidGhld2Vla25kIiwiYSI6ImNsbHc1czg1ZDAzNmEzZGxmY3poNHpkZWIifQ.DCsa6pwMfm3LF_YpZ1PeEA";
const branchLocations = [
  {
    name: "Tashkent Region",
    coordinates: [69.171018, 41.26465],
  },
  {
    name: "Samarkand Region",
    coordinates: [66.9597, 39.6282],
  },
  {
    name: "Bukhara Region",
    coordinates: [64.4823, 39.7748],
  },
];

let map = null;
const searchQuery = ref("");

const handleSearch = () => {
  const matchingLocation = branchLocations.find((location) =>
    location.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  if (matchingLocation) {
    const newCenter = matchingLocation.coordinates;
    map.setCenter(newCenter);
    latitude.value = newCenter[1];
    longitude.value = newCenter[0];
  }
};

watch(searchQuery, handleSearch);

onMounted(() => {
  mapboxgl.accessToken = accessToken;

  map = new mapboxgl.Map({
    container: "mapContainer",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [66.956955, 41.377491],
    zoom: 6,
    pitch: 0,
    maxBounds: [
      [55.928924, 37.18938],
      [73.055139, 45.585204],
    ],
  });
  map.on("click", (e) => {
    const coordinates = e.lngLat;
    latitude.value = coordinates.lat;
    longitude.value = coordinates.lng;
  });
  branchLocations.forEach((region) => {
    new mapboxgl.Marker()
      .setLngLat(region.coordinates)
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${region.name}</h3>`))
      .addTo(map);
  });
});
</script>
<style lang="css" scoped>
.basemap {
  width: 100%;
  height: 500px;
}

.coordinates {
  margin-top: 10px;
}
</style>
