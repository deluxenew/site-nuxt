import axios from "axios";

export const state = () => ({
  loading: false,
})

export const actions = {
  async SIGN_IN_USER_ACTION({commit, dispatch, getters}, {login, password}) {
    commit('SET_LOADING', true)
    await this.$auth.loginWith('local', {
      data: {
        login: login,
        password: password,
      }
    })
      .then(({data}) => {
        if (data) {
          const {token, refreshToken} = data
          this.$auth.setUserToken(token, refreshToken)
          return data
        }
      })
      .finally(() => commit('SET_LOADING', false))
  },
  async SIGN_UP_USER_ACTION({commit, dispatch, getters}, {name, login, password}) {
    commit('SET_LOADING', true)
    await this.$api.register({name, login, password,})
      .then(() => {
        dispatch("SIGN_IN_USER_ACTION", {login, password})
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },
  async logoutAll({commit, dispatch}) {
    commit('SET_LOADING', true)
    if (this.$auth.user) {
      const data = await this.$api.logoutAll()
      if (data) {
        dispatch('logout')
      }
    }
    commit('SET_LOADING', false)
  },
  async logout({commit}) {
    commit('SET_LOADING', true)
    await this.$auth.logout('local')
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },
}
export const mutations = {
  SET_LOADING(state, load) {
    state.loading = load
  }
}

export const getters = {
  IS_LOGGING: (state) => state.loading
}
