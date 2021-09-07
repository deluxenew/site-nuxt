<template>
  <modal-wrapper @close="$emit('close')" @expand="$emit('expand')">
    <template slot="modal-header">
      <div class="title">{{ title }}</div>
    </template>

    <template slot="modal-body">
      <div>13123</div> <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div> <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div> <div>13123</div> <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div> <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div> <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div> <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div> <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
      <div>13123</div>
    </template>

    <template slot="modal-footer">

    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "./ModalWrapper";

export default {
  name: "AuthRegister",
  components: {ModalWrapper},
  data() {
    return {
      component: 'auth'
    }
  },
  computed: {
    title() {
      switch (this.component) {
        case 'auth': return 'Авторизация'
        case 'register': return 'Регистрация'
      }
    }
  },
}
</script>

<style scoped>

</style>
