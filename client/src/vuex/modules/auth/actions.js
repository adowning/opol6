const setUser = (context, user) => {
  context.commit("USER_UPDATED", user);
};

const loadUser = (commit,
  dispatch,
  state
) => {

  return new Promise((resolve, reject) => {
    if (!state.auth.user) {
      console.log('getting token...')
      dispatch('cognito/getIdToken', null, {
        root: true
      }).then((token) => {
        console.log('got token')
        dispatch('updateuserActivity')
        commit('setUpdateuserActivity', setInterval(() => {
          dispatch('updateuserActivity')
        }, 60000))
        userService.methods.getuser(token).then((res) => {
          res.invitesReceived = res.invitesReceived || []
          res.invitesSent = res.invitesSent || []
          commit('setuser', res)
          if (res.invitesSent.length) {
            commit('setInvitesSent', res.invitesSent)
          }
          resolve()
        }).catch((err) => {
          console.log('error')
          reject()
        })
      }).catch((err) => {
        console.log(err)
        reject()
      })
    } else {
      console.log('user is logged in')
      resolve()
    }
  })
}

const setUserId = (context, id) => {
  context.commit("USERID_UPDATED", id);
};
export default {
  setUser,
  setUserId,
  loadUser
};

// import { fetchMessages } from '@/api'

// const getMessages = (context) => {
//   fetchMessages
//     .then((response) => {
//       context.commit('MESSAGES_UPDATED', response)
//     })
//     .catch((error) => {
//       // eslint-disable-next-line
//       console.error(error);
//     })
// }

// export default {
//   getMessages,
// }