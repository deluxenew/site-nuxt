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
        <auth-form
          slot="auth"
          v-model="authForm"
          :loading="isLoading"
          @setLogin="setLogin"
        />

        <register-form
          slot="register"
          v-model="registerForm"
          :loading="isLoading"
          @setRegister="setRegister"
        />

      </tabs-component>
    </template>

    <template slot="modal-footer">
      восстановление пароля
    </template>
  </modal-wrapper>
</template>

<script>


export default {
  name: "AuthRegisterModal",
  components: {
    TabsComponent: () => import('~/components/contentComponents/TabsComponent'),
    AuthForm: () => import('~/components/forms/AuthForm'),
    RegisterForm: () => import('~/components/forms/RegisterForm'),
    ModalWrapper: () => import('~/components/modals/ModalWrapper')
  },
  props: {
    handleFn: {
      type: Function,
      default: () => {
      }
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
      },
      registerForm: {
        name: {
          value: '',
          label: 'Имя'
        },
        login: {
          value: '',
          label: 'Логин'
        },
        password: {
          value: '',
          label: 'Пароль'
        }
      },
    }
  },
  computed: {
    title() {
      switch (this.component) {
        case 'auth':
          return 'Авторизация'
        case 'register':
          return 'Регистрация'
        case 'registerUser':
          return 'Регистрация покупателя'
      }
    },
    isLoading() {
      return this.$store.getters["IS_LOGGING"]
    }
  },
  methods: {
    async setRegister() {
      const {name: {value: name},login: {value: login}, password: {value: password}} = this.registerForm
      await this.$store.dispatch('SIGN_UP_USER_ACTION', {name, login, password})
      this.$emit('close')
    },
    async setLogin() {
      const {login: {value: login}, password: {value: password}} = this.authForm
      await this.$store.dispatch('SIGN_IN_USER_ACTION', {login, password})
      this.$emit('close')
    },
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
