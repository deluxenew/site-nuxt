<template>
  <div class="personal-layout" :style="{'--page-height': pageHeight + 'px'}">
    <header-component :topMenu="topMenu"/>
    <div class="content-wrapper">
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
  import FooterComponent from "COMPONENTS/footer/FooterComponent";
  import HeaderComponent from "COMPONENTS/header/HeaderComponent";

  export default {
    name: "personal",
    transition: 'bounce-fast',
    components: {FooterComponent, HeaderComponent},
    data() {
      return {
        pageHeight: 0,
        topMenu: [
          {
            itemName: 'company',
            iconName: 'company',
            title: 'Компания',
            link: '/user/company',
            arrowDown: false,
          },
          {
            itemName: 'contacts',
            iconName: 'contacts',
            link: "/user/services",
            title: 'Услуги',
            arrowDown: false,
          },
          {
            itemName: 'articles',
            iconName: 'articles',
            link: "/user/articles",
            title: 'Статьи',
            arrowDown: false,
          },
          {
            itemName: 'subscribe',
            iconName: 'subscribe',
            link: "/user/subscribe",
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
      const vm = this
      this.$auth.$storage.watchState('loggedIn', isLogin => {
        if (isLogin) {
          this.$router.push('/user')
        } else {
          this.$router.push('/')
        }
      });
      vm.pageHeight = window.innerHeight
      window.addEventListener('resize', () => {
        vm.pageHeight = window.innerHeight
      })
    },
    beforeDestroy() {
      const vm = this
      window.removeEventListener('resize', () => vm.pageHeight = window.innerHeight)
    }
  }
</script>

