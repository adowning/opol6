const USER_UPDATED = (state, user) => {
    state.user = user
}
const USERID_UPDATED = (state, userId) => {
    state.userId = userId
}
const VERIFICATION_UPDATED = (state, data) => {
    state.userVerification = data
}
export default {
    USER_UPDATED: USER_UPDATED,
    VERIFICATION_UPDATED: VERIFICATION_UPDATED,
    USERID_UPDATED: USERID_UPDATED
}
