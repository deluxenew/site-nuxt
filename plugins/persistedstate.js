import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  let stateCopy = { ...store.state }
  createPersistedState({
    rehydrated: (defStore) => {
      defStore.replaceState(stateCopy)
    },
    paths: ['auth', 'profile', 'admin'],

  })(store)
}
