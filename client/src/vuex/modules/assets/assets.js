/*eslint-disable */

import AssetsService from '../../../services/AssetsService.vue'

const state = {
  hardwares: [],
  hardwaresTotal: null,
  consumables: [],
  consumablesTotal: null
}

const getters = {
  getHardwareList: (state) => {
    return state.hardwares
  },
  getConsumableList: (state) => {
    return state.consumables
  },
}

const mutations = {
  resetState: (state) => {
    state.hardwares = []
    state.hardwaresTotal = null
  },
  addHardware: (state, message) => {
    state.hardwares = { ...state.hardwares, [hardware.hardwareId]: hardware}
    if (!state.assets.hardwares) state.assets.hardwares = []
    state.assets.hardwares.push(hardware.hardwareId)
  },
  setHardwares: (state, hardwares) => {
    state.hardwares = hardwares
  },
  setHardwaresTotal: (state, hardwarestotal) => {
    state.hardwaresTotal = hardwarestotal
  },
  setConsumables: (state, consumables) => {
    state.consumables = consumables
  },
  setConsumablesTotal: (state, consumablestotal) => {
    state.consumablesTotal = consumablestotal
  },
}

const actions = {  

  checkInHardware: ({commit, dispatch, state}, assetId, userId) => {
    return new Promise((resolve, reject) => {
      AssetsService.methods.checkInhardware(assetId).then((x) => {
        AssetsService.methods.getHardwares().then((res) => {
          for(var item of res.rows){
            console.log(item)
            if(!item.assigned_to){
             var _assigned_to = {
               name: ' '
             }
             item.assigned_to = _assigned_to
            }
            // console.log(item.location)
            if(!item.location){
              var _location = {
                name: ' '
              }
              item.location = _location
              item.warn = true
             }
          }
          commit('setHardwares', res.rows)
          commit('setHardwaresTotal', res.total)
          resolve()
        })
            })
 
      
    })
  },
  checkOutHardware: ({commit, dispatch, state}, assetinfo) => {
    console.log(assetinfo.username)
    return new Promise((resolve, reject) => {
          AssetsService.methods.checkOuthardware(assetinfo.assetId, assetinfo.username).then((x) => {
            AssetsService.methods.getHardwares().then((res) => {
              for(var item of res.rows){
                console.log(item)
                if(!item.assigned_to){
                 var _assigned_to = {
                   name: ' '
                 }
                 item.assigned_to = _assigned_to
                }
                // console.log(item.location)
                if(!item.location){
                  var _location = {
                    name: ' '
                  }
                  item.location = _location
                  item.warn = true
                 }
              }
              commit('setHardwares', res.rows)
              commit('setHardwaresTotal', res.total)
              resolve()
            })

          })  
      
    })
  },
  loadHardwares: ({commit, dispatch, state}) => {
    return new Promise((resolve, reject) => {
          AssetsService.methods.getHardwares().then((res) => {
            for(var item of res.rows){
              console.log(item)
              if(!item.assigned_to){
               var _assigned_to = {
                 name: ' '
               }
               item.assigned_to = _assigned_to
              }
              // console.log(item.location)
              if(!item.location){
                var _location = {
                  name: ' '
                }
                item.location = _location
                item.warn = true
               }
            }
            commit('setHardwares', res.rows)
            commit('setHardwaresTotal', res.total)
            resolve()
          })
        // })
  
        resolve()
      
    })
  },
  loadConsumables: ({commit, dispatch, state}) => {
    return new Promise((resolve, reject) => {
          AssetsService.methods.getConsumables().then((res) => {
            console.log(res)
   
            commit('setConsumables', res)
            commit('setConsumablesTotal', res.total)
            resolve()
          })  
      
    })
  },
  takeConsumable: ({commit, dispatch, state}, asset) => {
    return new Promise((resolve, reject) => {
          AssetsService.methods.takeConsumable(asset).then((res) => {
            AssetsService.methods.getConsumables().then((res) => {
              console.log(res)
     
              commit('setConsumables', res)
              commit('setConsumablesTotal', res.total)
              resolve()
            })  
            
          })

      
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}