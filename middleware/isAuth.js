export default function ({ redirect, $auth, store, route: { fullPath } }) {

  if (process.browser){
    const isAuth = $auth.loggedIn
    const isAdmin = $auth.user && $auth.user.accessLevel > 2
    if (!isAuth || !isAdmin) return redirect('/');
  }
}


