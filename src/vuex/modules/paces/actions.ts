import { ActionTree } from 'vuex'
import { searchPlacesApi } from '../../../apis'
import { Feature, placesResponseInterface } from '../../../interfaces'
import { StateInterface } from '../../index'
import { PlacesInterface } from './state'

const actions: ActionTree<PlacesInterface, StateInterface> = {
  getInitialLocation ({ commit }) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        commit('setLngLat', { lng: coords.longitude, lat: coords.latitude }),
      error => {
        console.error(error)
        throw new Error('Error de geolocation')
      }
    )
  },
  async searchPlace ({ commit, state }, query: string): Promise<Feature[]> {
    let features: Feature[]

    if (query.length === 0) {
      commit('setPlaces', [])
      features = []
    }

    if (!state.useLocation) throw new Error('No hay ubicación del usuario')

    commit('setIsLoadingPlaces')

    const { data } = await searchPlacesApi.get<placesResponseInterface>(
      `/ ${query}.json`,
      {
        params: {
          proximity: state.useLocation?.join(',')
        }
      }
    )

    features = data.features

    commit('setPlaces', data.features)

    return features
  }
}

export default actions
