<template>
  <div ref="wrap" class="main-wrapper">
    <section
      class="main"
      :style="`--main-height: ${wrapHeight + 'px'}`"
      v-for="(item, index) in sections"
      :key="JSON.stringify(item)"
      :id="index + 1"
    >
      <div class="container-wrapper">
        <slot :name="item.slotName"/>
      </div>
    </section>
    <aside class="navigator" :class="{move: showNavigate}">
      <div class="nav-item"
           v-for="(item, index) in sections"
           :key="index + 1"
           :class="{ active: currentId === index}"
           @click="onScrollTOBlock(index)"
      >
        <span>{{ item.navTitle }}</span>
      </div>
    </aside>
  </div>
</template>

<script>

  const MOVE_COUNT = 3

  let interval = ''
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
        timer: 0,
        showNavigate: false,
        wrapHeight: 0,
        currentPosition: 0,
        currentId: 0,
        isScrolling: false,
        touchPosition: 0,
        touchHold: false,
        moveCount: 0,
        touchRange: 0
      }
    },
    watch: {
      timer(v) {
        if (v === 2) {
          this.showNavigate = false
          clearInterval(interval)
          interval = ''
        }
      },
      wrapHeight(newV) {
        this.currentPosition = newV * this.currentId
        this.$nextTick(() => {
          this.scrollToPosition(newV * this.currentId)
        })
      },
      touchPosition(newV, oldV) {
        if (this.touchHold) this.moveCount++
        if (!this.isScrolling && this.touchHold && this.moveCount === MOVE_COUNT && this.touchRange > 50) {
          this.getPosition(oldV - newV)
        }
      },
      currentPosition(v) {
        this.currentId = Math.floor(v / this.wrapHeight + 0.5)
      }
    },
    methods: {
      getTouchPosition(event) {
        const { touches } = event
        const { clientY } = touches[0]
        this.touchHold = true
        if (this.touchPosition !== clientY) {
          if (clientY - this.touchPosition > 0) this.touchRange = clientY - this.touchPosition
          else this.touchRange = this.touchPosition - clientY
        }
        this.touchPosition = clientY
      },
      getTouchMove(event) {
        const { touches } = event
        const { clientY } = touches[0]
        if (!this.isScrolling) this.touchPosition = clientY
        setTimeout(() => this.moveCount = 0, 100)
      },
      getCurrentPositionWheel(event) {
        if (!this.isScrolling) this.getPosition(event.deltaY)
        this.isScrolling = true
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
        const { target: { scrollTop } } = event
        this.isScrolling = scrollTop !== this.currentPosition;
      },
      onScrollTOBlock(id) {
        this.currentPosition = id * this.wrapHeight
        this.scrollToPosition(this.currentPosition)
      },
      scrollToPosition(top) {
        this.$refs.wrap.scrollTo({ top, behavior: "smooth" })
        setTimeout(() => {
          this.isScrolling = false
        }, 100)
        this.timer = 0
        clearInterval(interval)
        this.showNavigate = true
        interval = setInterval(function () {
          this.timer++
        }.bind(this), 1000)
      },
      setResize() {
        this.wrapHeight = window.innerHeight - 56
      }
    },
    mounted() {
      this.setResize()
      window.addEventListener('resize', this.setResize, { passive: true })
      this.$refs.wrap.addEventListener('scroll', this.setIsScrolling, { passive: true })
      this.$refs.wrap.addEventListener('wheel', this.getCurrentPositionWheel, { passive: true })
      this.$refs.wrap.addEventListener('touchstart', this.getTouchPosition, { passive: true })
      this.$refs.wrap.addEventListener('touchend', () => {
        this.moveCount = 0
        this.touchHold = false
        this.touchRange = 0
      }, { passive: true })
      this.$refs.wrap.addEventListener('touchmove', this.getTouchMove, { passive: true })
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setResize)
      this.$refs.wrap.removeEventListener('scroll', this.setIsScrolling)
      this.$refs.wrap.removeEventListener('wheel', this.getCurrentPositionWheel)
      this.$refs.wrap.removeEventListener('touchstart', this.getTouchPosition)
      this.$refs.wrap.removeEventListener('touchend', () => {
        this.moveCount = 0
        this.touchHold = false
        this.touchRange = 0
      })
      this.$refs.wrap.removeEventListener('touchmove', this.getTouchMove)
    }
  }
</script>
