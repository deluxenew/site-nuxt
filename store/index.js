export const state = () => ({
  loading: false,
})

export const actions = {
 // async nuxtServerInit({commit}, {req}) {
 //    if (req.headers.cookie) {
 //      await this.$api.me()
 //        .then(({data}) => {
 //          this.$auth.setUser(data)
 //        })
 //    }
 //  },
  async SIGN_IN_USER_ACTION({commit, dispatch, getters}, {login, password}) {
    commit('SET_LOADING', true)
    await this.$auth.loginWith('local', {
      data: {
        login: login,
        password: password,
      }
    })
      .finally(() => commit('SET_LOADING', false))
      .then(({data}) => {
        if (data) {
          const {token, refreshToken} = data
          return  this.$auth.setUserToken(token, refreshToken)
        }
      })

  },
  async SIGN_UP_USER_ACTION({commit, dispatch, getters}, {name, login, password}) {
    commit('SET_LOADING', true)
    await this.$api.register({ name, login, password })
      .then(() => {
        return  dispatch("SIGN_IN_USER_ACTION", {login, password})
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
  IS_LOADING: (state) => state.loading
}
