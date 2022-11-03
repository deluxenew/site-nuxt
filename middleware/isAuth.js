export default function ({ redirect, $auth, store, route: { fullPath } }) {
  if (!store.state.auth.user) return redirect('/');
}
