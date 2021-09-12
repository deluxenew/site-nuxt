import axios from "axios";

export const state = () => ({

})

export const actions = {
  SIGN_IN_USER_ACTION ({commit, dispatch, getters}, {login, password}) {
    const vm = this
    return this.$auth.loginWith('local', {
      data: {
        login: login,
        password: password,
      }
    })
      .then(({data}) => {
        const { token, refreshToken } = data
        return vm.$auth.setUserToken(token, refreshToken)
      })
  },
  async SIGN_UP_USER_ACTION({commit, dispatch, getters}, {name, login, password}) {
    await this.$api.register({name, login, password, })
      .then(() => {
        return dispatch("SIGN_IN_USER_ACTION", {login, password})
      })
      .catch(function (error) {
        // commit('setError', error, {root: true})
        throw error
      });
  },
  async logoutAll({ dispatch }) {
    if (this.$auth.user) {
      const data = await this.$api.logoutAll()
      if (data) {
        dispatch('logout')
      }
    }
  },
  async signup({ commit, dispatch }, formData) {
    await axios.post('/api/auth/admin/signup', formData)
      .then(function (response) {

      })
      .catch(function (error) {
        // commit('setError', error, {root: true})
        throw error
      });
  },
  logout() {
    return this.$auth.logout('local')
  },
}
export const mutations = {

}
