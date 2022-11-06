export default function ({ route, redirect }) {
  if (route.path !== '/' && !route.path.endsWith('/')) {
    const { path, query, hash } = route;
    console.log({ path, query, hash })
    const nextPath = path + '/';
    const nextRoute = { path: nextPath, query, hash };

    redirect(nextRoute);
  }
}
