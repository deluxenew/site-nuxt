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
        {{ tabs[tab].title }}
      </label>
      <div class="back"></div>
    </nav>

    <section :key="tab + 'sec'" v-for="tab in Object.keys(tabs)">
      <slot v-if="tab === checked" :name="checked"/>
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
$count: var(--slides-count);
$index: var(--slide-index);
$labelWidth: calc(100% / #{$count});
$left: calc(#{$labelWidth} * #{$index});

.tabs-component {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  background: #BEE3D1;
  width: 100%;
  max-width: 100%;
  min-width: 390px;

  *, *:after, *:before {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 none;
    position: relative;
  }

  section {
    position: relative;
    padding: 1rem 2rem 0;
    overflow: auto;
    transition: .7s;
    transform-origin: center;
    transition-delay: .1s;
  }

  section:before {
    color: rgba(0, 0, 0, .2);
    font-size: 4rem;
    font-weight: 100;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    width: 100%;
  }

  .back {
    width: $labelWidth;
    font-size: $p;
    line-height: $p;
    padding: 16px $mediumPadding;
    margin: 0;
    background: #BEE3D1;
    position: absolute;
    transition: .5s;
    left: $left;
    bottom: 0;
    top: 0;
    border-top: 0 none;
  }

  input {
    display: none;
  }

  .label {
    width: $labelWidth;
    float: left;
    color: #BEE3D1;
    text-align: center;
    cursor: pointer;
    transition: .5s;
    font-size: $p;
    line-height: $p;
    z-index: 2;
    padding: 16px $smallPadding;
  }

  .label:hover {
    color: #1E6743;
  }

  .label:before {
    display: block;
    z-index: 2;
  }

  .checked {
    color: #000;
    font-weight: 600;
  }
}
</style>
