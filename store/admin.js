export const state = () => ({
  categories: []
})

export const actions = {
  async GET_ADMIN_CATEGORIES_ALL({commit, dispatch, getters}) {
    const items = await this.$api.getCategories()
    if (items) {
      commit("SET_CATEGORIES", items)
    }
  }
}

export const mutations = {
  SET_CATEGORIES: (state, items) => {
    state.categories = items
  }
}

export const getters = {
  ADMIN_CATEGORIES_ALL: (state) => state.categories
}
