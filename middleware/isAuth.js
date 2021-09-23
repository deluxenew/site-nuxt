// import { SAVE_LAST_ROUTE_MUTATION } from '../constants/mutations-type'

export default function ({ redirect, $auth, store, route: { fullPath } }) {
    // store.commit(SAVE_LAST_ROUTE_MUTATION, fullPath)
  console.log(store.state.auth.loggedIn);
    if (!store.state.auth.user) return redirect('/');
}
