<template>
  <div class="layout-wrapper">
    <header-component />

    <div class="content">
      <button @click="addRouteName(123)">13132</button>
      <button @click="setModel('photo')">13132</button>
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
    setModel(val) {

    },
    getRouteName: function() {
      api.request('GET', 'user/all').then(function(response){
        if (response.data) {
          console.log(response)
        }else{
          console.log('No instances found in the database')
        }
      })
    },
    addRouteName: function(name) {
      api.request('POST', 'user/add', { name: name }).then(function (response) {
        console.log(response)
      })
    },
  },
  mounted() {
    this.getRouteName()
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
