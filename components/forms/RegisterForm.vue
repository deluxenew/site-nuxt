<template>
  <div class="register-form">
    <div class="row field input" v-for="fieldName in Object.keys(value)" :key="fieldName">
      <single-text
        :id="fieldName"
        v-bind="modelForm[fieldName]"
        @input="modelForm[fieldName].value = $event"
      />
    </div>
    <div class="row field">
      <ui-button
        iconName="register"
        :loading="loading"
        text="Зарегистрироваться"
        @click="$emit('setRegister')"
      />
      <ui-button
        :loading="loading"
        text="Напомнить пароль"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  components: {
    SingleText: () => import('../reuse/SingleText'),
    UiButton: () => import('../reuse/UiButton')
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    modelForm: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-form {
  .field {
    padding-top: 24px;
  }

  .input {
    width: 100%;
  }
}
</style>
