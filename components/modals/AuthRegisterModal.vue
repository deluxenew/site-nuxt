<template>
  <modal-wrapper
    :defaultWidth="800"
    :defaultHeight="600"
    @close="$emit('close')"
  >
    <template slot="modal-header">
      <div class="title">{{ title }}</div>
    </template>

    <template slot="modal-body">
      <auth-form v-model="authForm" />
    </template>

    <template slot="modal-footer">
      восстановление пароля
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "./ModalWrapper";
import AuthForm from "../forms/AuthForm";

export default {
  name: "AuthRegisterModal",
  components: {AuthForm, ModalWrapper},
  props: {
    handleFn: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      component: 'auth',
      authForm: {
        login: {
          value: '',
          label: 'Логин'
        },
        password: {
          value: '',
          label: 'Пароль'
        }
      }
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
  methods: {
    expand() {

    }
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  line-height: 1;
  font-weight: 500;
}
</style>
