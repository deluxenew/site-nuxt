export default (axios) => ({
  login({login, password}) {
    return axios.post('/api/auth/user/login', { login, password }).then(({ data }) => data)
  },
})
