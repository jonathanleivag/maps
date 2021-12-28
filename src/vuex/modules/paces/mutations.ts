import { MutationTree } from 'vuex'
import { Feature } from '../../../interfaces'
import { PlacesInterface } from './state'

const mutation: MutationTree<PlacesInterface> = {
  setLngLat (state: PlacesInterface, coords: { lng: number; lat: number }) {
    state.useLocation = [coords.lng, coords.lat]
    state.isLoading = true
  },
  setIsLoadingPlaces (state) {
    state.isLoadingPlaces = true
  },
  setPlaces (state, places: Feature[]) {
    state.places = places
    state.isLoadingPlaces = false
  }
}

export default mutation
