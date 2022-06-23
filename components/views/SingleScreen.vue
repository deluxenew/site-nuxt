<template>
  <div class="single-screen">
    <section
      class="main"
      :style="`--main-height: ${wrapHeight + 'px'}`"
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

<style lang="scss">
 .single-screen {
   width: 100vw;
   height: 100%;
   overflow: hidden;
 }
 .main {
   width: 100vw;
   min-height: calc(100vh - 56px);
   height: var(--main-height);
   padding-right: 0;

   .container-wrapper {
     padding: 0;
     display: flex;
     align-items: center;
     justify-content: flex-start;
     flex-direction: column;
     height: 100%;
     width: 100%;
   }
 }

</style>
