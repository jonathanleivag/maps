import { GetterTree } from 'vuex'
import { StateInterface } from '../../index'
import { PlacesInterface } from './state'

const getters: GetterTree<PlacesInterface, StateInterface> = {
  isUserLoctionReady (state) {
    return !!state.useLocation
  }
}

export default getters
