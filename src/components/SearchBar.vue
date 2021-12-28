<script lang="ts" setup>
import SearchResult from './SearchResult.vue'
import { useMapStore, usePlacesStore } from '../composables'
import { ref } from 'vue'
import useDebounce from '../composables/useDebounce'

const { places, useLocation } = usePlacesStore()

const { isMapReady, map } = useMapStore()
const value = ref<string>('')
const timeValue = ref<number>(0)

const centerMap = () => {
  map.value?.flyTo({ center: useLocation.value, zoom: 14 })
}
const { search } = useDebounce({ value, timeValue, centerMap })
</script>

<template>
  <div
    v-if="isMapReady"
    class="fixed transform ease-in-out duration-500 w-64 top-[70px] sm:top-[30px] left-[30px] z-40 border border-gray-300 border-opacity-60 shadow-2xl bg-white rounded-lg overflow-hidden"
    :class="places.length > 0 ? 'h-1/2' : 'h-10'"
  >
    <div class="flex flex-row items-center">
      <svg
        class="w-6 h-6 pl-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <input
        v-model="search"
        type="text"
        placeholder="Buscar lugares"
        class="rounded-lg p-2 focus:outline-none w-[250px]"
      />
    </div>
    <search-result />
  </div>
</template>
