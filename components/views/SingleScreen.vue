<template>
  <div class="single-screen">
    <section
      class="main"
      :style="`--main-height: ${wrapHeight + 'px'}`"
      v-for="(item, index) in sections"
      :key="JSON.stringify(item)"
      :id="index + 1"
    >
      <div class="container">
        <slot :name="item.slotName"/>
      </div>
    </section>
<!--    <aside class="navigator" :class="{move: showNavigate}">-->
<!--      <div class="nav-item"-->
<!--           v-for="(item, index) in sections"-->
<!--           :key="index + 1"-->
<!--           :class="{ active: currentId === index}"-->
<!--           @click="onScrollTOBlock(index)"-->
<!--      >-->
<!--        <span>{{ item.navTitle }}</span>-->
<!--      </div>-->
<!--    </aside>-->
  </div>
</template>

<script>
  export default {
    name: "SingleScreen",
    props: {
      sections: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentSectionId: 0,
        wrapHeight: 0,
      }
    },
    methods: {
      setResize() {
        this.wrapHeight = window.innerHeight - 56
      }
    },
    mounted() {
      this.setResize()
    }
  }
</script>

<style lang="scss" scoped>
 .single-screen {
   width: 100vw;
   height: 100%;
   overflow: hidden;
 }
 .main {
   width: 100vw;
   min-height: calc(100vh - 56px);
   height: var(--main-height);
   padding-right: $rate;

   .container {
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
