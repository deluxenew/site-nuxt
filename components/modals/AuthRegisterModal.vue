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
        :tabs="tabs"
      >
        <div slot="auth">
          <ui-form
            id="form"
            v-model="form"
            :loading="isLoading"
          />
          <div class="buttons form-row">
            <ui-button
              class="form-button"
              :disabled="errorForm"
              :loading="isLoading"
              v-bind="{ ...buttonSend }"
              @click="setLogin"
            />
            <ui-button
              class="form-button"
              v-bind="{ ...buttonRemember }"
              @click="rememberPassword"
            />
          </div>
        </div>

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

import UiForm from "../reuse/UiForm";
export default {
  name: "AuthRegisterModal",
  components: {
    UiForm,
    TabsComponent: () => import('~/components/contentComponents/TabsComponent'),
    AuthForm: () => import('~/components/forms/AuthForm'),
    RegisterForm: () => import('~/components/forms/RegisterForm'),
    ModalWrapper: () => import('~/components/modals/ModalWrapper'),
    UiButton: () => import('~/components/reuse/UiButton.vue')
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
      tabs: {
        auth: {
          title: 'Авторизация'
        },
        register: {
          title: 'Регистрация'
        },
        registerUser: {
          title: 'Регистрация покупателя'
        }
      },
      form: {
        steps: [{
          id: 'required',
          showStepNumber: false,
          stepNumber: 1,
          showTitle: false,
          title: 'Обязательные поля',
          rows: [
            [{ id: 'login', ...this.$utils.formFieldByName('login') }],
            [{ id: 'password', ...this.$utils.formFieldByName('password') }],
          ],
        }],
      },
      buttonSend: { id: 'signIn', text: 'Войти', iconName: 'login', emit: 'setLogin' },
      buttonRemember:  { id: 'remember', text: 'Напомнить пароль', emit: 'rememberPassword' },
      authForm: {
        login: {
          value: '',
          label: 'Почта'
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
          label: 'Почта'
        },
        password: {
          value: '',
          label: 'Пароль'
        }
      },
    }
  },
  computed: {
    formValues() {
      return this.form.steps.reduce((obj, { rows }) => {
        rows.forEach((el) => {
          el.forEach(({ id, value }) => {
            obj[id] = value
          })
        })
        return obj
      }, {})
    },
    requiredFields() {
      return this.form.steps.reduce((arr, { rows }) => {
        rows.forEach((el) => {
          el.forEach(({ id, required }) => {
            arr.push(id)
          })
        })
        return arr
      }, [])
    },
    errorForm() {
      return !!this.form.steps
        .find(({ rows }) => rows.flat()
          .find(({ validateFunction, value, id }) => {
            const required = this.requiredFields.includes(id) && value
            return !validateFunction(value).result || !required
          }))
    },
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
      return this.$store.getters["IS_LOADING"]
    }
  },
  methods: {
    async setRegister() {
      const {name: {value: name}, login: {value: login}, password: {value: password}} = this.registerForm
      await this.$store.dispatch('SIGN_UP_USER_ACTION', {name, login, password})
        .catch((err) => {
          let msg = this.$utils.formatError(err)
          this.$notify({title: 'Ошибка регистрации', ...msg})
        })
      await this.$nextTick()
      if (this.$auth.user) this.$emit('close')
    },
    async setLogin() {
      if (this.errorForm) return
      const { login, password } = this.formValues
      await this.$store.dispatch('SIGN_IN_USER_ACTION', {login, password})
      .catch((err) => {
        let msg = this.$utils.formatError(err)
        this.$notify({title: 'Ошибка авторизации', ...msg})
      })
      await this.$nextTick()
      if (this.$auth.user) this.$emit('close')
    },
    async rememberPassword() {

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
.form-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 16px;
}
</style>
