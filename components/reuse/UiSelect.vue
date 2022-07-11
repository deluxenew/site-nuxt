<template>
  <div class="relative flex align-center input-text">
    <input
      v-model="value"
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
    <fa-icon class="w-48 absolute top-0 right-0 h-50 flex align-center justify-center p-3" :icon="['fac', 'chevronDown']" />
    <drop-down
      ref="dropdown"
      animationName="slide-top"
      :show="showDropDown"
      :customStyle="customStyleDropDown"
    >
      <div class="flex flex-column">
        <div v-for="item in items" @click="clickItem(item)">
          {{item.title}}
        </div>
      </div>
    </drop-down>
  </div>
</template>

<script>
import DropDown from "./DropDown";
export default {
  name: "UiSelect",
  components: {DropDown},
  props: {
    value: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => []
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
    },
    clickItem({value}) {
      this.$emit("input", value)
    },
  },
  mounted() {
    this.init()
  }
}
</script>


