/* eslint-disable */
import UserService from '../../../services/UserService.vue'

import AWS from 'aws-sdk/global'
// import AWSMqtt from 'aws-mqtt'
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-west-2'
const config  = {
  USER_POOL_ID: 'us-west-2:742705829810:userpool/us-west-2_hCVnLcSMS',
  IDENTITY_POOL_ID: 'us-west-2:aea7ef79-6ec0-44e9-bb41-44b13ebdb89d',
  USER_POOL_CLIENT_ID: 'uadvu1ig9sddk49hpg3aj957d',
  AWS_REGION: 'us-west-2',
  API_GATEWAY_ENDPOINT: 'https://z1mp2pbwcg.execute-api.us-west-2.amazonaws.com/dev',
  IOT_ENDPOINT: 'a2irl5b2s0go37.iot.us-west-2.amazonaws.com',
  // IOT_CHANNEL_BASE: 'chat'
  IOT_CHANNEL: 'chat'
}
//console.log('identity pool is: ', config.IDENTITY_POOL_ID)
//console.log('iot endpoint is: ', config.IOT_ENDPOINT)
//console.log('iot channel is: ', config.IOT_CHANNEL)

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: config.IDENTITY_POOL_ID
})

const state = {
  client: null,
  groupChat: []
}

const getters = {
  getGroupChat: (state) => {
    return state.groupChat
  }
}

const mutations = {
  addMessage: (state, message) => {
    state.groupChat.unshift(message)
  },
  endClient: (state) => {
    state.client.end()
  }
}

const actions = {
  end({commit, dispatch, state}) {
    state.client.end()
    state.client = null
  },
  sendGroupMessage({commit, dispatch, state}, message) {
    return new Promise((resolve, reject) => {
      dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
        UserService.methods.sendGroupMessage(token, message).then((res) => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    })
  },
  startClient({commit, dispatch, state, rootState}) {
    let userId = rootState.auth.user.userId
    //console.log('userId is: ', userId)
    let chatIds = rootState.auth.user.chats || []
    //console.log(rootState.auth.user)
    //commit('startClient', { userId, chatIds })

    if (state.client) return;
    //console.log('chatIds are : ', chatIds)
    let params = {
      WebSocket: window.WebSocket,
      region: AWS.config.region,
      credentials: AWS.config.credentials,
      endpoint: config.IOT_ENDPOINT,
      // clientId: userId
      identityPoolId: config.IDENTITY_POOL_ID
    }
    //console.log(params)
    // state.client = AWSMqtt.connect(params)

    //let messageHandler = new MessageHandler(state, IOT_CHANNEL)

    state.client.on('connect', () => {
      state.client.subscribe(`${config.IOT_CHANNEL}/user/${userId}`)
      state.client.subscribe(`${config.IOT_CHANNEL}/group`)
    })
    state.client.on('message', (topic, jsonMessage) => {
      const message = JSON.parse(jsonMessage)
      //console.log(jsonMessage)
      const payload = message.payload
      const type = message.type
      if (topic === `${config.IOT_CHANNEL}/group`) {
        commit('addMessage', message)
      } else if (type === 'invite') {
        dispatch('user/addInvite', payload, { root: true })
      } else if (type === 'chat') {
        dispatch('user/addChat', payload, { root: true })
      } else if (type === 'message') {
        //console.log('new message!')
        dispatch('user/addMessage', payload, { root: true })
      }
    })
    state.client.on('close', (err) => {
      //console.log('Closed  :-(')
    })
    state.client.on('offline', () => {
      //console.log('Went offline  :-(')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}