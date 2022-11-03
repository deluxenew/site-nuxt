export default (axios) => ({
  // dynamic
  getAllDynamic({ url }) {
    return axios.get(url).then(({ data }) => data)
  },
  addItemDynamic({ url, item }) {
    return axios.post(url, item).then(({ data }) => data)
  },
  editItemDynamic({ url, item }) {
    return axios.put(url, item).then(({ data }) => data)
  },
  deleteItemDynamic({ url, item }) {
    return axios.delete(url, item).then(({ data }) => data)
  },

  me() {
    return axios.get('/api/auth/user/me').then(({ data }) => data)
  },
  login({ login, password }) {
    return axios.post('/api/auth/user/login', { login, password }).then(({ data }) => data)
  },
  register({ name, login, password }) {
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
    return axios.get(`/api/admin/categories/all`, {
      headers: {
        'pragma': 'no-cache',
        'cache-control': 'no-cache'
      }
    }).then(({ data }) => data)
  },
  addCategory(category) {
    return axios.post('/api/admin/categories/add', category).then(({ data }) => data)
  },
  editCategory(category) {
    return axios.put('/api/admin/categories/edit', category).then(({ data }) => data)
  },
  removeCategory(id) {
    return axios.delete(`/api/admin/categories/remove/${id}`).then(({ data }) => data)
  },
  getCategoryBySlug(slug) {
    return axios.get(`/api/admin/categories/?slug=${slug}`).then(({ data }) => data)
  },
  getCategoryById(id) {
    return axios.get(`/api/admin/categories/?id=${id}`).then(({ data }) => data)
  },

  // admin
  getCategoryFull({ route }) {
    return axios.get(`/api/admin/category/${route}/all`).then(({ data }) => data)
  },
  addCategoryItem({ item, route }) {
    return axios.post(`/api/admin/category/${route}/add`, item).then(({ data }) => data)
  },
  editCategoryItem({ route, item }) {
    return axios.put(`/api/admin/category/${route}/edit`, item).then(({ data }) => data)
  },
  removeCategoryItem(route, id) {
    return axios.delete(`/api/admin/category/${route}/remove/${id}`).then(({ data }) => data)
  },

  // admin pages
  getPages() {
    return axios.get(`/api/admin/pages/all`).then(({ data }) => data)
  },
  addPage({ title, slug }) {
    return axios.post('/api/admin/pages/add', { title, slug }).then(({ data }) => data)
  },

  //admin users
  getUserRoles() {
    return axios.get(`/api/admin/category/roles/all`).then(({ data }) => data)
  },
  getUsers() {
    return axios.get(`/api/admin/users/all`).then(({ data }) => data)
  },

})
