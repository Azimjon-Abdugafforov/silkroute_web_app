<!-- <template>
  <div>
    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import mapboxgl from "mapbox-gl";

const accessToken =
  "pk.eyJ1IjoidGhld2Vla25kIiwiYSI6ImNsbHc1czg1ZDAzNmEzZGxmY3poNHpkZWIifQ.DCsa6pwMfm3LF_YpZ1PeEA";

let map = null;

onMounted(() => {
  mapboxgl.accessToken = accessToken;

  map = new mapboxgl.Map({
    container: "mapContainer",
    style: "mapbox://styles/mapbox/navigation-night-v1",
    center: [66.956955, 41.377491],
    zoom: 5,
    pitch: 0,
  });
});
https://api.mapbox.com/search/geocode/v6/reverse?country=uz&language=en&longitude=67.20670044486803&latitude=39.46677362206361&access_token=pk.eyJ1IjoidGhld2Vla25kIiwiYSI6ImNsbHc1czg1ZDAzNmEzZGxmY3poNHpkZWIifQ.DCsa6pwMfm3LF_YpZ1PeEA
</script>

<style lang="css" scoped>
.basemap {
  width: 100%;
  height: 50vh;
}
</style> -->
