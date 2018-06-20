import userService from '../../../services/UserService'
const state = {
    user: null,
    chats: null,
    messages: {},
    users: null,
    invites: [],
    invitesSent: [],
    updateuserActivity: null
}

const getters = {
    getuser: (state) => {
        return state.user
    },
    getInvitesSent: (state) => {
        return state.invitesSent
    },
    getuserId: (state) => {
        return state.user.userId
    },
    getChats: (state) => {
        return state.chats
    },
    getChatIds: (state) => {
        return state.user.chats || []
    },
    getusers: (state) => {
        return state.users
    },
    getInvites: (state) => {
        return state.invites
    },
    getInviteIds: (state) => {
        return state.user.invitesReceived || []
    }
}

const mutations = {
    resetState: (state) => {
        state.user = null,
        state.chats = null,
        state.messages = {},
        state.users = null,
        state.invites = [],
        state.invitesSent = [],
        state.updateuserActivity = null
    },
    setInvitesSent: (state, invites) => {
        state.invitesSent = invites
    },
    addInviteSent: (state, userId) => {
        state.invitesSent.push(userId)
        if (state.user.invitesSent) {
            state.user.invitesSent.push(userId)
        } else {
            state.user.invitesSent = [ userId ]
        }
    },
    setuser: (state, user) => {
        state.user = user
    },
    setChats: (state, chats) => {
        state.chats = chats
    },
    addChat: (state, chat) => {
        state.chats = { ...state.chats,
            [chat.chatId]: chat
        }
        if (!state.user.chats) {
            state.user.chats = []
        }
        state.user.chats.push(chat.chatId)
    },
    setMessages: (state, {
        chatId,
        messages
    }) => {
        state.messages = { ...state.messages,
            [chatId]: messages
        }
    },
    addMessage: (state, message) => {
        const chatId = message.chatId
        if (state.messages[chatId]) {
            state.messages[chatId].unshift(message)
        }
        if (state.chats && state.chats[chatId]) {
            state.chats[chatId] = { ...state.chats[chatId],
                lastMessage: message
            }
        }
    },
    addInvite: (state, invite) => {
        state.invites.push(invite)
        if (!state.user.invitesReceived) {
            state.user.invitesReceived = []
        }
        state.user.invitesReceived.push(invite.userId)
    },
    setusers: (state, users) => {
        state.users = users
    },
    setInvites: (state, users) => {
    /* state.invites.splice(0, state.invites.length)
    for (let u of users) {
      console.log(u)
      state.invites.push(u)
    }*/
        state.invites = users
    },
    setUpdateuserActivity: (state, interval) => {
        state.updateuserActivity = interval
    },
    removeInvite: (state, userId) => {
        let pos = state.invites.findIndex((i) => {
            return i.userId = userId
        })
        state.invites.splice(pos, 1)
    },
    deleteChat: (state, chatId) => {
        let temp = { ...state.chats
        }
        delete temp[chatId]
        state.chats = temp
        state.user.chats.splice(state.user.chats.findIndex((x) => {
            return x === chatId
        }), 1)
    }
}

const actions = {
    end: function({
        commit,
        dispatch,
        state
    }) {
        clearInterval(state.updateuserActivity)
        commit('resetState')
    },
    deleteuser: ({
        commit,
        dispatch,
        state
    }) => {
        return new Promise((resolve, reject) => {
            dispatch('cognito/getIdToken', null, {
                root: true
            }).then((token) => {
                userService.methods.deleteuser(token).then((res) => {
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            })
        })
    },
    deleteChat: ({
        commit,
        dispatch,
        state
    }, chatId) => {
        return new Promise((resolve, reject) => {
            dispatch('cognito/getIdToken', null, {
                root: true
            }).then((token) => {
                userService.methods.deleteChat(token, chatId).then((res) => {
                    commit('deleteChat', chatId)
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
                reject(err)
            })
        })
    },
    updateuserActivity: ({
        commit,
        dispatch,
        state
    }) => {
        console.log('updating user activity...')
        return new Promise((resolve, reject) => {
            dispatch('cognito/getIdToken', null, {
                root: true
            }).then((token) => {
                userService.methods.updateuserActivity(token).then((res) => {
                    console.log('got result')
                    resolve()
                }).catch((err) => {
                    console.log('there was an error')
                    reject(err)
                })
            }).catch((err) => {
                reject(err)
            })
        })
    },
    loaduser: ({
        commit,
        dispatch,
        state,
        rootState
    }) => {
        return new Promise((resolve, reject) => {
            if (!state.user) {
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
    },
    loadChats: ({
        commit,
        dispatch,
        state
    }) => {
        return new Promise((resolve, reject) => {
            if (!state.user.chats) {
                return resolve()
            }
            let chatIds = [ ...state.user.chats ]
            if (chatIds.length && !state.chats) {
                dispatch('cognito/getIdToken', null, {
                    root: true
                }).then((token) => {
                    userService.methods.getChats(token).then((res) => {
                        if (res) {
                            commit('setChats', res)
                        }
                        resolve()
                    })
                })
            } else {
                resolve()
            }
        })
    },
    addChat: ({
        commit,
        dispatch,
        state,
        rootState
    }, chat) => {
        if (rootState.route.name !== 'Chats') {
            const notification = {
                to: {
                    name: 'Chat',
                    params: {
                        id: chat.chatId
                    },
                },
                message: `${chat.otheruser.username} accepted your invite! Click here to chat with them!`
            }
            dispatch('addNotification', notification, {
                root: true
            })
        }
        commit('addChat', chat)
    },
    loadMessages: ({
        commit,
        dispatch,
        state
    }, chatId) => {
        return new Promise((resolve, reject) => {
            if (!state.messages[chatId]) {
                dispatch('cognito/getIdToken', null, {
                    root: true
                }).then((token) => {
                    userService.methods.getMessages(chatId, token).then((res) => {
                        commit('setMessages', {
                            chatId: chatId,
                            messages: res
                        })
                        resolve()
                    })
                })
            } else {
                resolve()
            }
        })
    },
    addMessage: ({
        commit,
        dispatch,
        state,
        rootState
    }, message) => {
        function doNotification() {
            dispatch('addNotification', {
                to: {
                    name: 'Chat',
                    params: {
                        id: message.chatId
                    },
                    hash: '#first'
                },
                message: `${state.chats[message.chatId].otheruser.username} sent you a message!`
            }, {
                root: true
            })
        }
        commit('addMessage', message)
        if (rootState.route.name !== 'Chat' && rootState.route.params.id !== message.chatId) {
            if (state.chats && state.chats[message.chatId]) {
                doNotification()
            } else {
                dispatch('loadChats').then(() => {
                    console.log('loaded!')
                    doNotification()
                })
            }
        }
    },
    addInvite: ({
        commit,
        dispatch,
        state,
        rootState
    }, invite) => {
        if (rootState.route.name !== 'Invites') {
            dispatch('addNotification', {
                to: {
                    name: 'Invites'
                },
                message: `${invite.username} invited you to chat!`
            }, {
                root: true
            })
        }
        commit('addInvite', invite)
    },
    sendMessage: ({
        commit,
        dispatch,
        state
    }, {
        body,
        chatId
    }) => {
        return new Promise((resolve, reject) => {
            dispatch('cognito/getIdToken', null, {
                root: true
            }).then((token) => {
                userService.methods.sendMessage(body, chatId, token).then((message) => {
                    commit('addMessage', message)
                    resolve()
                })
            })
        })
    },
    sendInviteByusername: ({
        commit,
        dispatch,
        state
    }, username) => {
        return new Promise((resolve, reject) => {
            dispatch('cognito/getIdToken', null, {
                root: true
            }).then((token) => {
                userService.methods.sendInvite(username, token, 'username').then((res) => {
                    commit('addInviteSent', res)
                    resolve()
                })
            })
        })
    },
    sendInviteByuserId: ({
        commit,
        dispatch,
        state
    }, userId) => {
        return new Promise((resolve, reject) => {
            dispatch('cognito/getIdToken', null, {
                root: true
            }).then((token) => {
                userService.methods.sendInvite(userId, token).then((res) => {
                    commit('addInviteSent', res)
                    resolve()
                })
            })
        })
    },
    acceptInvite: ({
        commit,
        dispatch,
        state
    }, userId) => {
        return new Promise((resolve, reject) => {
            dispatch('cognito/getIdToken', null, {
                root: true
            }).then((token) => {
                userService.methods.acceptInvite(userId, token).then((res) => {
                    commit('removeInvite', userId)
                    dispatch('addNotification', {
                        to: {
                            name: 'Chat',
                            params: {
                                id: res.chatId
                            }
                        },
                        message: `You can now chat with ${res.otheruser.username}`
                    }, {
                        root: true
                    })
                    commit('addChat', res)
                    resolve()
                })
            })
        })
    },
    loadOnlineusers: ({
        commit,
        dispatch,
        state
    }, force) => {
        return new Promise((resolve, reject) => {
            if (!state.users || force) {
                dispatch('cognito/getIdToken', null, {
                    root: true
                }).then((token) => {
                    userService.methods.getusers(token).then((res) => {
                        console.log('users are: ', res)
                        commit('setusers', res)
                        resolve()
                    })
                })
            } else {
                resolve()
            }
        })
    },
    loadInvites: ({
        commit,
        dispatch,
        state
    }) => {
        return new Promise((resolve, reject) => {
            console.log(state.user.invitesReceived)
            if (state.user.invitesReceived.length) {
                console.log('loading invites')
                dispatch('cognito/getIdToken', null, {
                    root: true
                }).then((token) => {
                    userService.methods.getInvites(token).then((res) => {
                        if (!res) {
                            res = []
                        }
                        commit('setInvites', res)
                        resolve()
                    })
                })
            } else {
                resolve()
            }
        })
    }
}

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
