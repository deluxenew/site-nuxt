const axios = require('axios')
import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: false,
  user: null,
})

export const mutations = {
  setUser(state, user)    { state.user = user },
  clearUser(state)        { state.user = null },
  setToken(state, token)  { state.token = token },
  clearToken(state)       { state.token = null }
}

export const actions = {
  async login({ dispatch, commit }, { login, password }) {
    try {
      const { token, user } = await this.$api.login({ login, password })
      if (token) {
        dispatch('setToken', token)
        commit('setUser', user)
      }
    } catch (e) {
      this.$utils.formatError(e)
    }
  },
  async logoutAll({ dispatch, getters }) {
    const { user } = getters
    if (user) {
      const { login } = user
      const data = await this.$api.logoutAll({ login })
      if (data) {
        dispatch('logout')
      }
    }
  },
  async signup({ commit, dispatch }, formData) {
    await axios.post('/api/auth/admin/signup', formData)
      .then(function (response) {
        dispatch('setToken', response.data.token)

      })
      .catch(function (error) {
       // commit('setError', error, {root: true})
        throw error
      });

  },
  setToken({ commit }, token) {
    commit('setToken', token)
    Cookies.set('jwt-token', token)

  },
  logout({ commit }) {
    commit('clearToken')
    commit('clearUser')
    Cookies.remove('jwt-token')

  },
  autoAuth({dispatch}) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isTokenValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }
}

export const getters = {
  isAuthenticated: state => !!state.token,
  token: state => state.token,
  user: state => state.user
}

function isTokenValid(token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
