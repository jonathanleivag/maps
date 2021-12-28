import mapboxgl from 'mapbox-gl'
import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { Feature } from '../interfaces'
import { StateInterface } from '../vuex'
import { PayloadInterface } from '../vuex/modules/map/actions'

export interface UseMapStoreInterface {
  // state
  map: ComputedRef<mapboxgl.Map | undefined>
  distance: ComputedRef<number | undefined>
  duration: ComputedRef<number | undefined>

  // mutation
  setMap: (map: mapboxgl.Map) => void
  setPlacesMarker: (places: Feature[]) => void
  // getters
  isMapReady: ComputedRef<boolean>
  getRouteBetweenPoints: (points: PayloadInterface) => Promise<void>
}

export function useMapStore (): UseMapStoreInterface {
  const store = useStore<StateInterface>()

  const state = {
    map: computed<mapboxgl.Map | undefined>(() => store.state.mapModule.map),
    distance: computed<number | undefined>(
      () => store.state.mapModule.distance
    ),
    duration: computed<number | undefined>(() => store.state.mapModule.duration)
  }

  const mutation = {
    setMap: (map: mapboxgl.Map) => store.commit('mapModule/setMap', map),
    setPlacesMarker: (places: Feature[]) =>
      store.commit('mapModule/setPlacesMarker', places)
  }

  const getters = {
    isMapReady: computed<boolean>(() => store.getters['mapModule/isMapReay'])
  }

  const actions = {
    getRouteBetweenPoints: (points: PayloadInterface) =>
      store.dispatch('mapModule/getRouteBetweenPoints', points)
  }

  return {
    ...state,
    ...mutation,
    ...getters,
    ...actions
  }
}
