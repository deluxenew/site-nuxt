export const views = {
  content: {
    components: {
      test: () => import('~/components/reuse/test'),
      WelcomeBlock: () => import ('~/components/viewBoxes/WelcomeBlock'),
      UserInfo: () => import ('~/components/UserComponents/UserInfo'),
    },
    props: {

    }
  },
  pageTemplates: {
    components: {
      PageView: () => import ('~/components/views/PageView'),
      SingleScreen: () => import ('~/components/views/SingleScreen'),
    },
    props: {

    }
  },
  ui: {
    components: {
      UiBlock: () => import('~/components/reuse/UiBlock'),
      PageSectionsNavigate: () => import('~/components/reuse/PageSectionsNavigate'),
    },
    props: {

    }
  }
}
