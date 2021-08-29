<template>
  <div ref="wrap" class="main-wrapper">
    <section
      class="main"
      :style="`--main-height: ${wrapHeight + 'px'}`"
      v-for="(item, index) in sections"
      :key="index"
      :id="index + 1"
    >
      <div class="container">
        <div class="title">
          {{ item.title }}
        </div>

        <slot :name="item.slotName" />
      </div>
    </section>
    <aside class="navigator">
      <div class="nav-item"
           v-for="(item, index) in sections"
           :key="index + 1"
           :class="{ active: currentId === index}"
           @click="onScrollTOBlock(index)"
      >
        <span>{{ item.title }}</span>

      </div>
    </aside>
  </div>
</template>

<script>

const MOVE_COUNT = 2

export default {
  name: 'PageView',
  props: {
    sections: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      wrapHeight: 0,
      currentPosition: 0,
      currentId: 0,
      isScrolling: false,
      touchPosition: 0,
      touchHold: false,
      moveCount: 0,
    }
  },
  watch: {
    wrapHeight(newV) {
      this.currentPosition = newV * this.currentId
      this.$nextTick(() => {
        this.scrollToPosition(newV * this.currentId)
      })
    },
    touchPosition(newV, oldV) {
      this.moveCount++
      if (!this.isScrolling && this.touchHold && this.moveCount === MOVE_COUNT) {
        this.getPosition(oldV - newV)
      }
    },
    currentPosition(v) {
      this.currentId = Math.floor(v / this.wrapHeight + 0.5)
    }
  },
  methods: {
    getTouchPosition(event) {
      this.touchHold = true
      this.touchPosition = event.touches[0].clientY
    },
    getTouchMove(event) {
      if (!this.isScrolling) this.touchPosition = event.touches[0].clientY
    },
    getCurrentPositionWheel(event) {
      if (!this.isScrolling) this.getPosition(event.deltaY)
    },
    getPosition(deltaY) {
      const winHeight = this.wrapHeight
      if (deltaY > 0 && this.currentId < this.sections.length - 1) {
        const wst = this.$refs.wrap.scrollHeight - this.wrapHeight
        wst < this.currentPosition ? this.currentPosition = wst : this.currentPosition += winHeight
      } else if (deltaY < 0 && this.currentId !== 0) {
        (this.currentPosition - winHeight) >= 0 ? this.currentPosition -= winHeight : 0
      }
      this.scrollToPosition(this.currentPosition)
    },
    setIsScrolling(event) {
      this.isScrolling = event.target.scrollTop !== this.currentPosition;
    },
    onScrollTOBlock(id) {
      this.currentPosition = id * this.wrapHeight
      this.scrollToPosition(this.currentPosition)
    },
    scrollToPosition(top) {
      this.$refs.wrap.scrollTo({top, behavior: "smooth"})
    },
    setResize(event) {
      if (event) this.wrapHeight = window.innerHeight - 56
      else this.wrapHeight = window.innerHeight - 56
    }
  },
  beforeMount() {
    this.setResize()
    window.addEventListener('resize', this.setResize, {passive: true})
  },
  mounted() {
    this.$refs.wrap.addEventListener('scroll', this.setIsScrolling, {passive: true})
    this.$refs.wrap.addEventListener('wheel', this.getCurrentPositionWheel, {passive: true})
    this.$refs.wrap.addEventListener('touchstart', this.getTouchPosition, {passive: true})
    this.$refs.wrap.addEventListener('touchend', () => {
      this.moveCount = 0
      this.touchHold = false
    }, {passive: true})
    this.$refs.wrap.addEventListener('touchmove', this.getTouchMove, {passive: true})
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setResize)
    this.$refs.wrap.removeEventListener('scroll', this.setIsScrolling)
    this.$refs.wrap.removeEventListener('wheel', this.getCurrentPositionWheel)
    this.$refs.wrap.removeEventListener('touchstart', this.getTouchPosition)
    this.$refs.wrap.removeEventListener('touchend', () => {
      this.moveCount = 0
      this.touchHold = false
    })
    this.$refs.wrap.removeEventListener('touchmove', this.getTouchMove)
  }
}
</script>

<style lang="scss">

.main-wrapper {
  width: 100vw;
  height: 100%;
  overflow: hidden;
}

.navigator {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background: #000;
  padding-top: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: $trs;

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    color: $white;
    width: 8px;
    height: 0;
    cursor: pointer;
    user-select: none;
    padding: 16px 0;
    font-size: $verticalText;
    transition: $trs;

    span {
      opacity: 0;
      white-space: nowrap;
      transform: rotate(-90deg);
      transition: $trs;
    }

    &:hover {
      color: $green;
    }

    &.active {
      background-color: $green;
      color: $white;
    }
  }

  &:hover {
    .nav-item {
      padding: 16px 16px;
      transition: $trs;

      span {
        opacity: 1;
      }
    }
  }
}

.main {
  width: 100vw;
  background-image: url('/images/bg2.png');
  background-size: auto auto;
  background-position: center top;
  background-repeat: repeat-y;
  min-height: calc(100vh - 56px);
  height: var(--main-height);

  .container {
    padding: $largePadding;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .title {
    color: $default;
    font-size: $h1;
  }
}
</style>
