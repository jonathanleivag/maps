<script lang="ts" setup>
import { useMapStore, usePlacesStore } from '../composables'

const { map, isMapReady } = useMapStore()
const { useLocation } = usePlacesStore()

const centerMap = () => {
  map.value?.flyTo({ center: useLocation.value, zoom: 14 })
}
</script>

<template>
  <button
    v-if="isMapReady"
    @click="centerMap"
    class="z-40 fixed right-5 top-5 bg-slate-300 bg-opacity-75 p-2 rounded-lg shadow-2xl"
  >
    <svg
      class="w-6 h-6 text-white text-opacity-80"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      ></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
    </svg>
  </button>
</template>
