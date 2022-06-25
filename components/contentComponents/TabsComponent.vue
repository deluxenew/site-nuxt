<template>
  <div
    class="tabs-component"
    v-if="Object.keys(tabs).length"
    :style="`--slides-count: ${Object.keys(tabs).length}; --slide-index:${ ind }`"
  >
    <input v-for="(tab, index) in Object.keys(tabs)"
           :key="tab"
           type="radio"
           :id="tab"
           :name="tab"
           :class="{ checked: checked === tab }"
           :checked='checked === tab'
           @click="checked = tab, ind = index"
    />

    <nav>
      <label
        v-for="tab in Object.keys(tabs)"
        :key="tab + 'nav'"
        :for="tab"
        class="label"
        :class="{ checked: checked === tab }"
      >
        <fa-icon class="icon" :icon="['fac', tabs[tab].icon]"/>
        <span class="text">{{ tabs[tab].title }}</span>
      </label>
      <div class="back"></div>
    </nav>
  <section :key="tab + 'sec'" v-for="tab in Object.keys(tabs)">
    <transition name="fade" mode="out-in">
      <slot v-if="tab === checked" :name="checked" />
    </transition>
  </section>
  </div>
</template>

<script>
export default {
  name: "TabsComponent",
  props: {
    value: {
      type: String,
      default: ''
    },
    tabs: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      ind: 0
    }
  },
  computed: {
    checked: {
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

<style lang="scss">


</style>
