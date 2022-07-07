export const state = () => ({
  categories: [],
})

export const actions = {
  async GET_ADMIN_CATEGORIES_ALL({commit}) {
    const items = await this.$api.getCategories()
    if (items) {
      commit("SET_CATEGORIES", items)
      return items
    }
  },
  async GET_CATEGORY({dispatch, commit, state}, {route}) {
    const categoryIdx = state.categories.findIndex((cat) => cat.slug === route)
    if (categoryIdx === -1) {
      await dispatch("GET_ADMIN_CATEGORIES_ALL")
    }
    const category = await this.$api.getCategoryFull({route})
    if (category) {
      commit("SET_CATEGORY", {category, route})
    }
  },
  async ADD_CATEGORY_ITEM({commit}, {item, route}) {
    const categoryItem = await this.$api.addCategoryItem({item, route})
    if (categoryItem) {
      commit("SET_CATEGORY_ITEM", {item: categoryItem, route})

    }
  }
}

export const mutations = {
  SET_CATEGORIES: (state, items) => {
    state.categories = items
  },
  SET_CATEGORY: (state, {category, route}) => {
    const categoryIdx = state.categories.findIndex((cat) => cat.slug === route)
    if (categoryIdx > -1) {
      state.categories.splice(categoryIdx, 1, {
        ...state.categories[categoryIdx],
        items: category
      })
    }
  },
  SET_CATEGORY_ITEM: (state, {item, route}) => {
    const categoryIdx = state.categories.findIndex((cat) => cat.slug === route)
    if (categoryIdx > -1) {
      // if (!state.categories[categoryIdx].items) state.categories[categoryIdx].items = []
      state.categories[categoryIdx].items.push(item)
    }
  }
}

export const getters = {
  CATEGORY: (state) => (route) => state.categories.find((cat) => cat.slug === route),
  ADMIN_CATEGORIES_ALL: (state) => state.categories,

}
