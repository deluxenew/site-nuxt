export const state = () => ({
  userRoles: [],
})

export const actions = {
  async GET_USER_ROLES({commit}) {
    const items = await this.$api.getUserRoles()
    console.log(items)
    if (items) {
      commit("SET_USER_ROLES", items)
      return items
    }
  }
}

export const mutations = {
  SET_USER_ROLES: (state, items) => {
    state.userRoles = items
  }
}

export const getters = {
  USER_ROLES: ({userRoles}) => userRoles
}
