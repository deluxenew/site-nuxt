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
  name: "SingleText",
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
      this.$emit('setError', {fieldName: this.name, value: this.validateFunction(this.value)})
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

<style lang="scss" scoped>

.input-text + .input-text {

}
.input-text {
  position: relative;
  width: 100%;
}
.balloon {
  display: inline-block;
  width: 100%;
  padding: 16px 0 16px 16px;
  font-family: $font;
  font-weight: 500;
  color: $default;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  transition: all .3s ease-in-out;

  &::-webkit-input-placeholder {
    color: rgba($default, .5);
    text-indent: 50%;
    font-weight: 300;
    font-family: $font;
  }

  + label {
    display: inline-block;
    position: absolute;
    top: calc(50% - 14px);
    left: 0;
    padding: 8px 16px;
    color: $green;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 0 1px 0 rgba(19,74,70,0);
    transition: all .3s ease-in-out;
    border-radius: 3px;
    background: rgba(122,184,147,0);

    &:after {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      top: 100%;
      left: 50%;
      margin-left: -3px;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 3px solid rgba(122,184,147,0);
      transition: all .3s ease-in-out;
    }
  }
}
.balloon:focus,
.balloon:active {
  color: $default;
  text-indent: 0;

  &::-webkit-input-placeholder {
    color: #aaa;
  }
  + label {
    color: #fff;
    text-shadow: 0 1px 0 rgba(19,74,70,.4);
    background: $green;
    transform: translateY(-30px);

    &:after {
      border-top: 4px solid rgba(122,184,147,1);
    }
  }
}
</style>
