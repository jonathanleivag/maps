import { ActionTree } from 'vuex'
import { directionPlacesApi } from '../../../apis'
import { DirectionResponseInterface } from '../../../interfaces'
import { StateInterface } from '../../index'
import { MapStateInterface } from './state'

export interface PayloadInterface {
  start: [number, number]
  end: [number, number]
}

const actions: ActionTree<MapStateInterface, StateInterface> = {
  async getRouteBetweenPoints ({ commit }, { start, end }: PayloadInterface) {
    const resp = await directionPlacesApi.get<DirectionResponseInterface>(
      `${start.join(',')};${end.join(',')}`
    )
    commit('setDistanceDuration', {
      duration: resp.data.routes[0].duration,
      distance: resp.data.routes[0].distance
    })
    commit('setRouterPolyline', resp.data.routes[0].geometry.coordinates)
  }
}

export default actions
