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

  // admin
  getCategories() {
    return axios.get(`/api/admin/categories/all`).then(({ data }) => data)
  },
  addCategory({ title, slug }) {
    return axios.post('/api/admin/categories/add', { title, slug }).then(({ data }) => data)
  },
  editCategory({ title, slug }) {
    axios.put('/api/admin/categories/edit', { title, slug }).then(({ data }) => data)
  },
  removeCategory({id}) {
    axios.delete('/api/admin/categories/remove', { id }).then(({ data }) => data)
  },
  getCategoryBySlug(slug) {
    return axios.get(`/api/admin/categories/?slug=${slug}`).then(({ data }) => data)
  },
  getCategoryById(id) {
    return axios.get(`/api/admin/categories/?id=${id}`).then(({ data }) => data)
  }

})
