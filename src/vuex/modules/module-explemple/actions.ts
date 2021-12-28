import { ActionTree } from 'vuex'
import { StateInterface } from '../../index'
import { ExampleStateInterface } from './state'

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  someAction () {
    // a line to prevent linter errors
  }
}

export default actions
