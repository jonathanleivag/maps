import { createStore } from 'vuex'
import { MapStateInterface } from './modules/map/state'
import mapModule from './modules/map'

import placesModule from './modules/paces'
import { PlacesInterface } from './modules/paces/state'

export interface StateInterface {
  places: PlacesInterface
  mapModule: MapStateInterface
}

export default createStore<StateInterface>({
  modules: {
    places: placesModule,
    mapModule: mapModule
  }
})
