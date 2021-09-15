<template>
  <div class="personal-layout">
    <header-component :topMenu="topMenu"/>
    <div class="content">
      <nuxt/>
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
  name: "personal",
  components: {FooterComponent, HeaderComponent},
  data() {
    return {
      topMenu: [
        {
          itemName: 'contacts',
          iconName: 'contacts',
          title: 'Компания',
          arrowDown: false,
        },
        {
          itemName: 'contacts',
          iconName: 'contacts',
          title: 'Услуги',
          arrowDown: false,
        },
        {
          itemName: 'calc',
          iconName: 'calculator',
          title: 'Статьи',
          arrowDown: false,
        },
        {
          itemName: 'calc',
          iconName: 'calculator',
          title: 'Подписка',
          arrowDown: false,
        },
        {
          itemName: 'menu',
          iconName: 'burger',
          title: 'Меню',
          arrowDown: true,
        }
      ]
    }
  },
  mounted() {
    this.$auth.$storage.watchState('loggedIn', isLogin => {
      if (isLogin) {
        this.$router.push('/user')
      } else {
        this.$router.push('/')
      }
    });
  },
}
</script>

<style lang="scss" scoped>
.personal-layout {

}
</style>
