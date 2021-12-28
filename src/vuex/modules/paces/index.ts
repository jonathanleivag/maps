import { Module } from 'vuex'
import { StateInterface } from '../../index'

import state, { PlacesInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const placesModule: Module<PlacesInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default placesModule
