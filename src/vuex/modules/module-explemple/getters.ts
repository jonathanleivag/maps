import { GetterTree } from 'vuex'
import { StateInterface } from '../../index'
import { ExampleStateInterface } from './state'

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  someGetter () {
    // return true;
  }
}

export default getters
