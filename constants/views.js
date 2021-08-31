export const views = {
  content: {
    components: {
      test: () => import('~/components/reuse/test'),
      WelcomeBlock: () => import ('~/components/viewBoxes/WelcomeBlock'),
      PageView: () => import ('~/components/views/PageView'),
    },
  }
}
