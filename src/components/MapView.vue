<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMapStore, usePlacesStore } from '../composables'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_TOKEN_MAPBOX

const refMapElement = ref<HTMLDivElement>()
const { isUserLoctionReady, useLocation } = usePlacesStore()
const { setMap } = useMapStore()

const initMap = async () => {
  if (!refMapElement.value) throw new Error('La referencia del mapa no existe')
  if (!useLocation.value) throw new Error('El userLocation no existe')
  await Promise.resolve()
  const map = new mapboxgl.Map({
    container: refMapElement.value, // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: useLocation.value, // starting position [lng, lat]
    zoom: 15 // starting zoom
  })

  const myLocationPopUp = new mapboxgl.Popup().setLngLat(useLocation.value)
    .setHTML(/* html */ `
    <h1>hola que tal</h1>
    <p>${useLocation.value}</p>
    `)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userLocationMarker = new mapboxgl.Marker()
    .setLngLat(useLocation.value)
    .setPopup(myLocationPopUp)
    .addTo(map)

  setMap(map)
}

watch(isUserLoctionReady, () => {
  if (isUserLoctionReady.value) initMap()
})
</script>

<template>
  <div
    v-if="!isUserLoctionReady"
    class="h-full w-full text-white bg-black bg-opacity-80 fixed z-50 flex flex-col justify-center text-center items-center"
  >
    <h3>Espere por favor</h3>
    <span>Localizando....</span>
  </div>
  <div
    v-show="isUserLoctionReady"
    class="h-full w-full fixed"
    ref="refMapElement"
  />
</template>
