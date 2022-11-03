<template>
  <div ref="select" class="relative flex align-center input-text">
    <input
      v-model="value"
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
    <fa-icon
      class="w-48 absolute top-0 right-0 h-50 flex align-center justify-center p-3 cursor-pointer"
      :icon="['fac', 'chevronDown']"
      @click="showDropDown = true"
    />
    <drop-down
      class="absolute"
      ref="dropdown"
      animationName="slide-top"
      :show="showDropDown"
      :customStyle="customStyleDropDown"
    >
      <div class="flex flex-col">
        <div
          class="p-4 cursor-pointer hover:bg-[#50df1e]"
          v-for="item in items"
          @click="clickItem(item)"
        >
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
    components: { DropDown },
    props: {
      value: {
        type: [String, Number],
        default: '' || 0,
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
        default: () => {
        }
      }
    },
    data() {
      return {
        indent: 0,
        showDropDown: false
      }
    },
    computed: {
      customClasses() {
        return this.classes
      },
      customStyleDropDown() {
        return {
          right: 50
        }
      }
    },
    methods: {
      blur() {
        this.init()
        this.$emit('setError', { fieldName: this.name, value: this.validateFunction(this.value, this.required) })
      },
      init() {
        this.indent = this.$refs.label.clientWidth
      },
      focus() {
        this.indent = 0
      },
      clickItem({ value }) {
        this.$emit("input", value)
        this.showDropDown = false
      },
      setOutsideClick(e) {
        if (!this.$refs.select.contains(e.target)) this.showDropDown = false
      },
    },
    mounted() {
      this.init()
      window.addEventListener("click", this.setOutsideClick)
    },
    beforeDestroy() {
      window.removeEventListener("click", this.setOutsideClick)
    }
  }
</script>


