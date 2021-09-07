export default (axios) => ({
  login({login, password}) {
    return axios.post('/api/auth/user/login', { login, password }).then(({ data }) => data)
  },
  logoutAll({login}) {
    return axios.post('/api/auth/user/logout-all', { login }).then(({ data }) => data)
  },
})
