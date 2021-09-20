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
  FETCH_USER_DATA({commit, dispatch}) {

  }
}

export const getters = {
  USER_DATA: (state) => state.user
}
