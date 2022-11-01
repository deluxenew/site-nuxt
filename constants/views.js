export const views = {
  content: {
    components: {
      // test: () => import('COMPONENTS/reuse/test'),
      WelcomeBlock: () => import ('COMPONENTS/viewBoxes/WelcomeBlock'),
      UserInfo: () => import ('COMPONENTS/UserComponents/UserInfo'),
    },
    props: {

    }
  },
  pageTemplates: {
    components: {
      PageView: () => import ('COMPONENTS/views/PageView'),
      SingleScreen: () => import ('COMPONENTS/views/SingleScreen'),
    },
    props: {

    }
  },
  ui: {
    components: {
      UiBlock: () => import('COMPONENTS/reuse/UiBlock'),
      PageSectionsNavigate: () => import('COMPONENTS/reuse/PageSectionsNavigate'),
    },
    props: {

    }
  }
}
