export default (axios) => ({
  me() {
    return axios.get('/api/auth/user/me').then(({ data }) => data)
  },
  login({login, password}) {
    return axios.post('/api/auth/user/login', { login, password }).then(({ data }) => data)
  },
  register({name, login, password}) {
    return axios.post('/api/auth/user/register', { name, login, password }).then(({ data }) => data)
  },
  logoutAll() {
    return axios.post('/api/auth/user/logout-all').then(({ data }) => data)
  },
  // profile
  profile({ userId }) {
    return axios.get(`/api/profile/my/${userId}`).then(({ data }) => data)
  },

})
