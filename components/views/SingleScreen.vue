<template>
  <div class="w-screen h-full overflow-hidden">
    <section
      class="main w-screen"
      :style="`--main-height: ${wrapHeight + 'px'};height:  ${wrapHeight + 'px'}`"
      :id="currentSectionId"
    >
      <div class="container-wrapper">
        <slot :name="sections[currentSectionId].slotName"/>
      </div>
    </section>

    <slot name="nav"/>
  </div>
</template>

<script>
  export default {
    name: "SingleScreen",
    props: {
      sections: {
        type: Array,
        default: () => []
      },
      value: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        wrapHeight: 0,
      }
    },
    computed: {
      currentSectionId: {
        get() {
          return this.value
        },
        set(v) {
          this.$emit('input', v)
        },
      },
    },
    methods: {
      setResize() {
        this.wrapHeight = window.innerHeight - 56
      },
      changeSection(number) {
        this.currentSectionId = number
      },
    },
    mounted() {
      window.addEventListener('resize', this.setResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setResize)
    }
  }
</script>

