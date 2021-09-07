<template>
  <div class="layout-wrapper">
    <header-component />

    <div class="content">
      <nuxt/>
    </div>

    <footer-component />
  </div>
</template>

<script>
 import FooterComponent from "../components/footer/FooterComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import api from '~/src/api'

export default {
  name: "default",
  components: {FooterComponent, HeaderComponent},
  methods: {
    async autoAuth() {
      await this.$store.dispatch('auth/autoAuth')
    },
    getRouteName: function() {
      api.request('GET', 'auth/user/all').then(function(response){
        if (response.data) {
          console.log(response)
        } else {
          console.log('No instances found in the database')
        }
      })
    },
  },
  async mounted() {
    this.getRouteName()
    await this.autoAuth()
  },
}
</script>

<style lang="scss" scoped>
.layout-wrapper {

}

.content {
  width: 100vw;
  padding-top: 56px;
  height: 100vh;
  overflow-y: auto;
  z-index: 0;
}
</style>
