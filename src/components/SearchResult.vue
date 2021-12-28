<script lang="ts" setup>
import mapboxgl from 'mapbox-gl'
import { ref, watch } from 'vue'
import { useMapStore, usePlacesStore } from '../composables'
import { Feature } from '../interfaces'

const { isLoadingPlaces, places, useLocation } = usePlacesStore()
const isActivePlace = ref<string>()
const { map, setPlacesMarker, getRouteBetweenPoints } = useMapStore()

const isClickActivePlace = (place: Feature) => {
  isActivePlace.value = place.id
  map.value?.flyTo({
    center: place.center as mapboxgl.LngLatLike,
    zoom: 14
  })
}

const handleButton = (place: Feature) => {
  if (!useLocation.value) return
  getRouteBetweenPoints({
    start: useLocation.value,
    end: place.center as [number, number]
  })
}

watch(places, newPaces => {
  isActivePlace.value = ''
  setPlacesMarker(newPaces)
})
</script>

<template>
  <ul
    v-if="isLoadingPlaces"
    class="border-x text-gray-400 border-b rounded-b-lg shadow-2xl border-gray-300"
  >
    <li
      class="border py-2 px-3 cursor-pointer hover:bg-gray-200 hover:text-gray-600 text-center"
    >
      <h3>Cargando</h3>
      <span>Espere por favor...</span>
    </li>
  </ul>

  <ul
    v-else-if="places.length > 0"
    class="border-x h-full pb-20 text-gray-400 border-b rounded-b-lg shadow-2xl border-gray-300 overflow-y-scroll"
  >
    <li
      v-for="place in places"
      :key="place.id"
      class="border py-2 px-3 cursor-pointer hover:bg-gray-200 hover:text-gray-600"
      :class="{ activeSearchResult: isActivePlace === place.id }"
      @click="isClickActivePlace(place)"
    >
      <div class="flex flex-col overflow-hidden">
        <h5 class="font-bold text-black">{{ place.text }}</h5>
        <p class="text-sm my-2">{{ place.place_name_es }}</p>
        <div class="w-full flex flex-row justify-end pr-5">
          <button
            @click.self="handleButton(place)"
            class="border rounded-lg border-gray-400 hover:border-[#339FB3] hover:text-[#339FB3] px-3 py-1"
            :class="
              isActivePlace === place.id && 'border-[#339FB3] text-[#339FB3]'
            "
          >
            Dirección
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>
