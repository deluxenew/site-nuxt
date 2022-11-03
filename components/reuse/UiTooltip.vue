<template>
  <div
    class="tooltip"
    ref="tooltip"
    @click="subscribeTouch"
    @mouseenter="showTooltip = true"
    @mouseleave="hide"
  >
    <div class="slot" ref="slot">
      <slot/>
    </div>
    <transition name="scale-fade" mode="out-in">
      <div
        class="tooltip__text"
        v-show="showTooltip"
        :class="classes ? classes : additionalClass + (inverted ? ' inverted' :'')"
        ref="text"
        :style="{top: posY, left: posX}"
      >
        <div v-if="isHtml" v-html="text"></div>
        <div v-else>
          {{ text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  const MARGIN = 8
  const MARGIN_ARROW = 24

  export default {
    name: 'UiTooltip',
    props: {
      classes: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isHtml: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showTooltip: false,
        middle: true,
        bottom: true,
        right: true,
        left: true,
        posY: 0,
        posX: 0
      }
    },
    watch: {
      async showTooltip(val) {
        if (val) {
          await this.$nextTick()
          this.calcOffset()
        } else {
          this.bottom = true
          this.middle = true
          this.right = true
          this.left = true
        }
      }
    },
    computed: {
      additionalClass() {
        if (!this.showTooltip) return 'default'
        if (this.bottom && this.left && this.right) return 'bottom'
        if (this.bottom && !this.left && this.right) return 'bottom-right'
        if (this.bottom && !this.right && this.left) return 'bottom-left'
        if (this.right && this.middle) return 'right'
        if (this.left && this.middle) return 'left'
        if (!this.middle && !this.left && this.right) return 'top-right'
        if (!this.middle && !this.right && this.left) return 'top-left'
        if (!this.middle && this.left && this.right) return 'top'
        return ''
      }
    },
    methods: {
      hide() {
        const vm = this
        setTimeout(() => {
          vm.showTooltip = false
        }, 100)
      },
      setPosition({ slotWidth, slotHeight, textWidth, textHeight }) {
        switch (this.classes ? this.classes : this.additionalClass) {
          case 'bottom':
            this.posY = (slotHeight + MARGIN) + 'px'
            this.posX = '-' + (textWidth / 2 - slotWidth / 2) + 'px'
            break
          case 'bottom-left':
            this.posY = (slotHeight + MARGIN) + 'px'
            this.posX = -textWidth + slotWidth / 2 + MARGIN_ARROW + 'px'
            break
          case 'bottom-right':
            this.posY = (slotHeight + MARGIN) + 'px'
            this.posX = slotWidth / 2 - MARGIN_ARROW + 'px'
            break
          case 'top':
            this.posY = '-' + (textHeight + MARGIN) + 'px'
            this.posX = '-' + (textWidth / 2 - slotWidth / 2) + 'px'
            break
          case 'top-left':
            this.posY = '-' + (textHeight + MARGIN) + 'px'
            this.posX = -textWidth + slotWidth / 2 + MARGIN_ARROW + 'px'
            break
          case 'top-right':
            this.posY = '-' + (textHeight + MARGIN) + 'px'
            this.posX = slotWidth / 2 - MARGIN_ARROW + 'px'
            break
          case 'left':
            this.posY = '-' + (textHeight / 2 - slotHeight / 2) + 'px'
            this.posX = '-' + (textWidth + MARGIN) + 'px'
            break
          case 'right':
            this.posY = '-' + (textHeight / 2 - slotHeight / 2) + 'px'
            this.posX = (slotWidth + MARGIN) + 'px'
            break
        }
      },
      calcOffset() {
        const coords = this.$el.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth
        const offsetLeft = coords.left
        const offsetTop = coords.top
        const slotWidth = this.$refs.slot.clientWidth
        const slotHeight = this.$refs.slot.clientHeight
        const textWidth = this.$refs.text.clientWidth
        const textHeight = this.$refs.text.clientHeight

        if (offsetTop + textHeight >= windowHeight - slotHeight) this.bottom = false
        if (offsetTop + textHeight / 2 >= windowHeight - slotHeight) this.middle = false
        if (offsetLeft + textWidth + slotWidth > windowWidth) this.right = false
        if (offsetLeft < textWidth) this.left = false
        this.setPosition({ slotWidth, slotHeight, textWidth, textHeight })
      },
      checkOuterClick(event) {
        if (this.$refs.tooltip && !this.$refs.tooltip.contains(event.target)) {
          this.unSubscribeTouch()
        }
      },
      subscribeTouch() {
        if (!this.showTooltip) {
          window.addEventListener('touchend', this.checkOuterClick)
        }
      },
      unSubscribeTouch() {
        window.removeEventListener('touchend', this.checkOuterClick)
      }
    }
  }
</script>


