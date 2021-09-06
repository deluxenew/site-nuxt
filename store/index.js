export const state = () => ({
  token: ''
})

export const actions = {
  setUserToken({commit}, {token}) {
    commit('tokenMutation', token)
  }
}
export const mutations = {
  tokenMutation(state, data) {
    state.token = data
  }
}
