import {CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute} from 'amazon-cognito-identity-js'

import AWS from 'aws-sdk/global'

// import { USER_POOL_ID, USER_POOL_APP_CLIENT, AWS_REGION } from '../../globals/resources'
const config = {
  USER_POOL_ID: 'us-east-1_xwnQBRbGa',
  USER_POOL_CLIENT_ID: '35qkglmgdvv8g8do97j53q7sn8',
  AWS_REGION: 'us-west-2',
  API_GATEWAY_ENDPOINT: 'https://z1mp2pbwcg.execute-api.us-west-2.amazonaws.com/dev',
  IOT_ENDPOINT: 'a2irl5b2s0go37.iot.us-west-2.amazonaws.com',
  // IOT_CHANNEL_BASE: 'chat'
  IOT_CHANNEL: 'chat'
}
import UserService from '../../../services/UserService.vue'
//console.log(UserService)

function handleResults(err, result, success, failure) {
  if (err) {
    console.error(err)
    return failure(err)
  } else {
    return success(result)
  }
}

// const config = {
//   // TODO: Move this to a config file
//   region: config1.AWS_REGION,
//   userPoolId: config1.USER_POOL_ID,
//   clientId: config1.USER_POOL_CLIENT_ID
// }

const state = {
  userPool: new CognitoUserPool({
    UserPoolId: config.USER_POOL_ID,
    ClientId: config.USER_POOL_CLIENT_ID
  })
}

//console.log(state.userPool)

const getters = {}

const mutations = {
  setUserId: (state, payload, rootState) => {
    rootState.auth.userId = payload
  },
  setUsername: (state, payload, rootState) => {
    state.username = payload
  }
}

const actions = {
  confirmPassword({commit, state}, {code, pass, username}) {
    return new Promise((resolve, reject) => {
      //let user = state.userPool.getCurrentUser()
      let userData = {
        Username: username,
        Pool: state.userPool
      }
      //console.log(code, pass)
      //console.log(userData)
      let user = new CognitoUser(userData)
      user.confirmPassword(code, pass, {
        onSuccess: (data) => {
          //console.log(data)
          resolve(data)
        },
        onFailure: (err) => {
          reject(err)
        }
      })
    })
  },
  forgotPassword({commit, state}, username) {
    return new Promise((resolve, reject) => {
      let userData = {
        Username: username,
        Pool: state.userPool
      }
      let user = new CognitoUser(userData)
      user.forgotPassword({
        onSuccess: (data) => {
          //console.log(data)
          resolve(data)
        },
        onFailure: (err) => {
          reject(err)
        }
      })
    })
  },
  changePassword({commit, state}, {oldPass, newPass}) {
    //console.log('changing password...')
    return new Promise((resolve, reject) => {
      let user = state.userPool.getCurrentUser()
      //console.log(user)
      if (!user) {
        reject(new Error('user is not logged in'))
      }
      user.getSession((err, session) => {
        //console.log('got session')
        user.changePassword(oldPass, newPass, (err, result) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            //console.log('success!')
            resolve(result)
          }
        })
      })
    })
  },
  getIdToken({commit, state}) {
    ////console.log('running getIdToken')
    return new Promise((resolve, reject) => {
      let user = state.userPool.getCurrentUser()
      if (user) {
        user.getSession((err, session) => {
          if (err) return reject(err)
          resolve(session.getIdToken().getJwtToken())
        })
      } else {
        reject(new Error('user is not logged in'))
      }
    })
  },
  isAuthenticated({commit, state}) {
    return new Promise((resolve, reject) => {
      let user = state.userPool.getCurrentUser();
      ////console.log('function is running');
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            resolve(false)
            return
          }
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.identityPoolId,
          })
          resolve(true)
        })
      } else {
        resolve(false);
      }
    })
  },
  signIn({commit, dispatch, state}, {username, pass}) {
    let authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: pass
    })
    let cognitoUser = new CognitoUser({
      Username: username,
      Pool: state.userPool
    })
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
        // var token = session.getIdToken().getJwtToken()
// console.log(token)
console.log('log in successful')

          UserService.methods.noderedLogin( username).then((res) => {
            resolve()
          }).catch((err) => {
            console.log(err)
            reject(err)
          })
        //  dispatch('setUserId').then(() => {
        //    resolve(session)
        //  })
          // resolve()
        },
        onFailure: (err) => {
          console.error(err);
          reject(err);
        }
      })
    })
  },
  signUp({commit, state}, user) {
   console.log('running user signup')
    return new Promise((resolve, reject) => {
      console.log(user)
      var apiData = {
        humanityname: user.humanityname,
        humanitypass: user.humanitypass,
        humanityid: user.humanityid
      }
      let attributeList = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: user.email
        }),
        // new CognitoUserAttribute({
        //   Name: 'custom:apiData',
        //   Value: JSON.stringify(apiData)
        // }),
      ]
        console.log(attributeList)
      state.userPool.signUp(user.username, user.pass, attributeList, null, (err, result) => {
        return handleResults(err, result, resolve, reject)
      })
    })
  },
  confirmRegistration({commit, state}, {username, code}) {
    let cognitoUser = new CognitoUser({
      Username: username,
      Pool: state.userPool
    })
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        return handleResults(err, result, resolve, reject)
      })
    })
  },
  resendConfirmationCode({commit, state}, username) {
    let cognitoUser = new CognitoUser({
      Username: username,
      Pool: state.userPool
    })
    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        return handleResults(err, result, resolve, reject)
      })
    })
  },
  signOut({commit, state}) {
    let user = state.userPool.getCurrentUser();
    if (!user) {
      return
    }
    return user.signOut()
  },
  setUserId({commit, state}) {
    console.log('setting user id...')
    let user = state.userPool.getCurrentUser()
    console.log(user.username)
    return new Promise((resolve, reject) => {
      user.getSession((err, session) => {
        if (err) {
          return reject(err)
        }
        console.log(session)
        user.getUserAttributes((err, attributes) => {
          if (err) {
            return reject(err)
          }
          console.log(attributes)
          commit('setUserId', attributes.find((i) => {
            return i.Name === 'sub'
          }).Value)
          //console.log(state.userId)
          resolve(state.userId)
        })
      })
    })
  },
  setUsername({commit, state}) {
    console.log('setting user id...')
    let user = state.userPool.getCurrentUser()
    console.log(user.username)
    return new Promise((resolve, reject) => {
    commit('setUsername', user.username)
    resolve(state.username)
    })
    // return new Promise((resolve, reject) => {
    //   user.getSession((err, session) => {
    //     if (err) {
    //       return reject(err)
    //     }
    //     console.log(session)
    //     user.getUserAttributes((err, attributes) => {
    //       if (err) {
    //         return reject(err)
    //       }
    //       console.log(attributes)
    //       commit('setUsername', attributes.find((i) => {
    //         return i.Name === 'sub'
    //       }).Value)
    //       //console.log(state.userId)
    //       resolve(state.userId)
    //     })
    //   })
    // })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}