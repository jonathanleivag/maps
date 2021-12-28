import { computed, ComputedRef, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Feature } from '../interfaces'
import { StateInterface } from '../vuex'

export interface UsePlacesStoreInterface {
  isLoading: ComputedRef<boolean>
  useLocation: ComputedRef<[number, number] | undefined>
  isUserLoctionReady: ComputedRef<boolean>
  searchPlace: (search: string) => Promise<void>
  isLoadingPlaces: ComputedRef<boolean>
  places: ComputedRef<Feature[]>
}

export function usePlacesStore (): UsePlacesStoreInterface {
  const store = useStore<StateInterface>()

  onMounted(() => {
    if (!store.getters['places/isUserLoctionReady']) {
      store.dispatch('places/getInitialLocation')
    }
  })
  return {
    isLoading: computed(() => store.state.places.isLoading),
    useLocation: computed(() => store.state.places.useLocation),
    isUserLoctionReady: computed(
      () => store.getters['places/isUserLoctionReady']
    ),
    searchPlace: (search = '') => store.dispatch('places/searchPlace', search),
    isLoadingPlaces: computed(() => store.state.places.isLoadingPlaces),
    places: computed(() => store.state.places.places)
  }
}
