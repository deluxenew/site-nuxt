<template>
  <div class="layout-wrapper">
    <header-component/>

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
        :duration="300000"
      >
        <template slot="body" slot-scope="props">
          <div class="custom-notify">
            <div class="inner card" @click="props.close">
              <div class="row">
                <div class="icon">
<!--                  <img-->
<!--                    v-if="props.item.type === 'success'"-->
<!--                    class="success"-->
<!--                    src="@/assets/img/notify-success.svg"-->
<!--                  >-->
<!--                  <img-->
<!--                    v-if="props.item.type === 'warn'"-->
<!--                    class="warn"-->
<!--                    :src="require('@imgs/notify-warning.svg')"-->
<!--                  >-->
<!--                  <img-->
<!--                    v-if="props.item.type === 'error'"-->
<!--                    class="error"-->
<!--                    :src="require('@imgs/notify-error.svg')"-->
<!--                  >-->
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
  name: "default",
  components: {FooterComponent, HeaderComponent},
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
