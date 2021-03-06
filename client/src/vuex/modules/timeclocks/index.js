import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
    clockStatus: null,
    clocks: null
}

export default {
    namespaced: true,
    state: state,
    actions: actions,
    getters: getters,
    mutations: mutations
}
