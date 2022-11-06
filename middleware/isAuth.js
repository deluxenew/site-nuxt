export default function ({ redirect, $auth, store, route: { fullPath } }) {

  if (process.browser){
    const isAuth = $auth.loggedIn
    const isAdmin = $auth.user && $auth.user.accessLevel > 2
    console.log($auth.user)
    if (!isAuth || !isAdmin) return redirect('/');
  }
}


