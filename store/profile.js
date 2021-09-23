const axios = require('axios')

export const state = () => ({
 user: null
})

export const mutations = {
  SET_USER_DATA_MUTATION(state, data) {
    state.user = data
  }
}

export const actions = {
  async FETCH_USER_DATA({commit, dispatch, getters}) {
    const { id: userId } = this.$auth.user
    const data = await this.$api.profile({userId})
    if (data){
      commit('SET_USER_DATA_MUTATION', data)
    }
  }
}

export const getters = {
  USER_DATA: (state) => state.user
}
