<template>
  <div class="auth-form">
    <single-text
      v-for="fieldName in Object.keys(value)"
      :key="fieldName"
      :id="fieldName"
      v-bind="modelForm[fieldName]"
      @input="modelForm[fieldName].value = $event"
    />
  </div>
</template>

<script>

export default {
  name: "AuthForm",
  components: {
    SingleText: () => import('../reuse/SingleText')
  },
  props: {
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

<style scoped>
.auth-form {

}
</style>
