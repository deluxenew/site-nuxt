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
      <tabs-component
        v-model="component"
        :tabs="{
          auth: {
            title: 'Авторизация'
          },
          register: {
            title: 'Регистрация'
          },
          registerUser: {
            title: 'Регистрация покупателя'
          }
        }"
      >
          <auth-form slot="auth" v-model="authForm" />
      </tabs-component>
    </template>

    <template slot="modal-footer">
      восстановление пароля
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "./ModalWrapper";
import AuthForm from "../forms/AuthForm";
import TabsComponent from "../contentComponents/TabsComponent";

export default {
  name: "AuthRegisterModal",
  components: {TabsComponent, AuthForm, ModalWrapper},
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
        case 'registerUser': return 'Регистрация покупателя'
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
