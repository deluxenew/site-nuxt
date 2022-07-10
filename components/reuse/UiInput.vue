<template>
  <div class="input-text">
    <input
      v-model="text"
      :type="type"
      :id="id"
      class="balloon"
      :class="customClasses"
      :placeholder="placeholder"
      :style="{ textIndent: indent + 'px' }"
      @blur="blur"
      @focus="focus"
    >
    <label ref="label" :for="id">
     {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: "UiInput",
  props: {
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    classes: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    validateFunction: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      indent: 0
    }
  },
  computed: {
    text: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    },
    customClasses() {
      return this.classes
    }
  },
  methods: {
    blur() {
      this.init()
      this.$emit('setError', {fieldName: this.name, value: this.validateFunction(this.value, this.required)})
    },
    init() {
      this.indent = this.$refs.label.clientWidth
    },
    focus() {
      this.indent = 0
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</styles>
