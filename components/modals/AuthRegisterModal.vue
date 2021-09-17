<template>
  <modal-wrapper
    :defaultWidth="800"
    :defaultHeight="600"
    :hideFooter="true"
    @close="$emit('close')"
  >
    <template slot="modal-header">
      <div class="title">{{ title }}</div>
    </template>

    <template slot="modal-body">
      <tabs-component
        v-model="formName"
        :tabs="tabs"
      >
        <div slot="authForm">
          <ui-form
            id="form"
            v-model="authForm"
            :loading="isLoading"
          />

          <div class="buttons form-row">
            <ui-button
              class="form-button"
              :disabled="$utils.isInvalidForm(authForm)"
              :loading="isLoading"
              v-bind="{ ...buttonLogin }"
              @click="setLogin"
            />

            <ui-button
              class="form-button"
              v-bind="{ ...buttonRemember }"
              @click="rememberPassword"
            />
          </div>
        </div>

        <div slot="registerForm">
          <ui-form
            id="registerForm"
            v-model="registerForm"
            :loading="isLoading"
          />

          <div class="buttons form-row">
            <ui-button
              class="form-button"
              :disabled="$utils.isInvalidForm(registerForm)"
              :loading="isLoading"
              v-bind="{ ...buttonRegister }"
              @click="setRegister"
            />
          </div>
        </div>
      </tabs-component>
    </template>

    <template slot="modal-footer">

    </template>
  </modal-wrapper>
</template>

<script>

export default {
  name: "AuthRegisterModal",
  components: {
    TabsComponent: () => import('~/components/contentComponents/TabsComponent'),
    ModalWrapper: () => import('~/components/modals/ModalWrapper'),
    UiButton: () => import('~/components/reuse/UiButton.vue'),
    UiForm: () => import('~/components/reuse/UiForm.vue')
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
      formName: 'authForm',
      buttonLogin: { id: 'signIn', text: 'Войти', iconName: 'login' },
      buttonRegister: { id: 'register', text: 'Зарегистрироваться', iconName: 'register' },
      buttonRemember:  { id: 'remember', text: 'Напомнить пароль' },
      authForm: {
        title: 'Авторизация',
        formIcon: 'login',
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
      registerForm: {
        title: 'Регистрация',
        formIcon: 'register',
        steps: [{
          id: 'required',
          showStepNumber: false,
          stepNumber: 1,
          showTitle: false,
          title: 'Обязательные поля',
          rows: [
            [{ id: 'name', ...this.$utils.formFieldByName('name') }],
            [{ id: 'login', ...this.$utils.formFieldByName('login') }],
            [{ id: 'password', ...this.$utils.formFieldByName('password') }],
          ],
        }],
      },
    }
  },
  computed: {
    title() {
      return this.$data[this.formName].title
    },
    tabs() {
      const dataFields = Object.keys(this.$data)
      return dataFields
        .filter(el => this.$data[el].steps)
        .reduce((obj, el) => {
          obj[el] = {
            title: this.$data[el].title,
            icon: this.$data[el].formIcon
          }
          return obj
        }, {})
    },
    isLoading() {
      return this.$store.getters["IS_LOADING"]
    }
  },
  methods: {
    async setRegister() {
      if (this.$utils.isInvalidForm(this.registerForm)) return
      const {name,  login, password} = this.$utils.getFormValues(this.registerForm)
      await this.$store.dispatch('SIGN_UP_USER_ACTION', {name, login, password})
        .catch((err) => {
          let msg = this.$utils.formatError(err)
          this.$notify({title: 'Ошибка регистрации', ...msg})
        })
      await this.$nextTick()
      if (this.$auth.user) this.$emit('close')
    },
    async setLogin() {
      if (this.$utils.isInvalidForm(this.authForm)) return
      const { login, password } = this.$utils.getFormValues(this.authForm)
      await this.$store.dispatch('SIGN_IN_USER_ACTION', {login, password})
      .catch((err) => {
        let msg = this.$utils.formatError(err)
        this.$notify({title: 'Ошибка авторизации', ...msg})
      })
      await this.$nextTick()
      if (this.$auth.user) this.$emit('close')
    },
    async rememberPassword() {
      console.log("Вот еще руки не дошли")
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
