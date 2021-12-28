<script lang="ts" setup>
import { usePlacesStore } from '../composables'
import MapView from '../components/MapView.vue'
import MyLocationBtn from '../components/MyLocationBtn.vue'
import SearchBar from '../components/SearchBar.vue'
import TripDetails from '../components/TripDetails.vue'

usePlacesStore()
</script>

<template>
  <map-view />
  <my-location-btn />
  <search-bar />
  <trip-details />
</template>
