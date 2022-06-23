<template>
  <div class="no-access-layout">
    <header-component :topMenu="topMenu"/>

    <div class="content-wrapper">
      <h2>Доступ ограничен</h2>
    </div>

    <footer-component/>
    <client-only>
      <notifications
        position="top center"
        classes="notify"
        width="100%"
        :max="3"
        :duration="3000"
      >
        <template slot="body" slot-scope="props">
          <div class="custom-notify">
            <div class="inner card" @click="props.close">
              <div class="row">
                <div class="icon">

                </div>
                <div class="data-wrap" :class="props.item.type">
                  <div class="notification-title">
                    {{ props.item.title }}
                  </div>
                  <div class="notification-content">
                    {{ props.item.text }}
                  </div>
                </div>
                <fa-icon class="icon-close" :icon="['fac', 'close']"/>
              </div>
            </div>
          </div>
        </template>
      </notifications>
    </client-only>
  </div>
</template>

<script>
import FooterComponent from "../components/footer/FooterComponent";
import HeaderComponent from "../components/header/HeaderComponent";

export default {
  name: 'noAccess',
  components: {FooterComponent, HeaderComponent},
  head() {
    return {
      title: 'У Вас нет доступа к этой странице',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
        }
      ]
    }
  },
  data: () => ({
    menuVisible: false,
    topMenu: [
      {
        itemName: 'menu',
        iconName: 'burger',
        title: 'Меню',
        arrowDown: true,
      }
    ]
  }),
  computed: {
    isAuth() {
      return this.$auth.loggedIn;
    }
  },
  methods: {
    menuToggle() {
      this.menuVisible = !this.menuVisible;
    }
  },
    async mounted() {
      await this.$nextTick()
    this.$auth.$storage.watchState('loggedIn', isLogin => {
      if (isLogin) this.$router.push('/user')
    });
  },
}
</script>


