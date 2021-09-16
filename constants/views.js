export const views = {
  content: {
    components: {
      test: () => import('~/components/reuse/test'),
      WelcomeBlock: () => import ('~/components/viewBoxes/WelcomeBlock'),

    },
    props: {

    }
  },
  pageTemplates: {
    components: {
      PageView: () => import ('~/components/views/PageView'),
    },
    props: {

    }
  },
  Ui: {
    components: {

    },
    props: {

    }
  }
}
