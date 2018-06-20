import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
    products: []
}

export default {
    namespaced: true,
    state: state,
    actions: actions,
    getters: getters,
    mutations: mutations
}
