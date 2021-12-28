import { GetterTree } from 'vuex'
import { StateInterface } from '../../index'
import { MapStateInterface } from './state'

const getters: GetterTree<MapStateInterface, StateInterface> = {
  isMapReay (state) {
    return !!state.map
  }
}

export default getters
