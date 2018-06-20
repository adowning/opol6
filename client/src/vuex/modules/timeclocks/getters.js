// const messages = state => state.messages;
// const isAuthenticated = state => Boolean(state.user)
// const loggedinusername = state => state.user.username

export default {
    isAuthenticated: (state) => {
        return Boolean(state.user)
    },
    loggedinUser: (state) => {
        return state.user
    }
}
