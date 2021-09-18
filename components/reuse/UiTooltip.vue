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

<style lang="scss" scoped>
$pointer-size: 8px;

.tooltip {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  cursor: help;
  z-index: 100;

  .slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__text {
    width: max-content;
    max-width: 280px;
    background-color: $white;
    color: $default;
    border-radius: 4px;
    position: absolute;
    z-index: 2;
    padding: 8px 16px;
    box-sizing: border-box;
    overflow: visible;
    cursor: default;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.08)) drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.16));
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;

    &.inverted {
      background-color: $default;
      color: $white;
    }

    &:before {
      position: absolute;
      width: 0;
      height: 0;
      content: '';
      z-index: 1;
    }

    &.default {
      &:before {
        content: '';
        top: 50%;
        left: 50%;
      }
    }

    &.bottom {
      transform-origin: top;
      &:before {
        border-left: $pointer-size solid transparent;
        border-right: $pointer-size solid transparent;
        border-bottom: $pointer-size solid $white;
        top: calc(#{-$pointer-size} + 1px);
        left: calc(50% - #{$pointer-size});
      }
      &.inverted:before {
        border-bottom: $pointer-size solid $default;
      }
    }

    &.bottom-left {
      transform-origin: top right;
      &:before {
        border-left: $pointer-size solid transparent;
        border-right: $pointer-size solid transparent;
        border-bottom: $pointer-size solid $white;
        top: calc(#{-$pointer-size} + 1px);
        left: calc(100% - #{$pointer-size} * 4);
      }
    }

    &.bottom-right {
      transform-origin: top;
      &:before {
        border-left: $pointer-size solid transparent;
        border-right: $pointer-size solid transparent;
        border-bottom: $pointer-size solid $white;
        top: calc(#{-$pointer-size} + 1px);
        left: $pointer-size;
      }
      &.inverted:before {
        border-bottom: $pointer-size solid $default;
      }
    }

    &.top {
      transform-origin: bottom;
      &:before {
        border-left: $pointer-size solid transparent;
        border-right: $pointer-size solid transparent;
        border-top: $pointer-size solid $white;
        bottom: calc(#{-$pointer-size} + 1px);
        left: calc(50% - #{$pointer-size});
      }
      &.inverted:before {
        border-top: $pointer-size solid $default;
      }
    }

    &.top-left {
      transform-origin: bottom;
      &:before {
        border-left: $pointer-size solid transparent;
        border-right: $pointer-size solid transparent;
        border-top: $pointer-size solid $white;
        bottom: calc(#{-$pointer-size} + 1px);
        left: calc(100% - #{$pointer-size} * 3);
      }
      &.inverted:before {
        border-top: $pointer-size solid $default;
      }
    }

    &.top-right {
      transform-origin: bottom;
      &:before {
        border-left: $pointer-size solid transparent;
        border-right: $pointer-size solid transparent;
        border-top: $pointer-size solid $white;
        bottom: calc(#{-$pointer-size} + 1px);
        left: #{$pointer-size};
      }
      &.inverted:before {
        border-top: $pointer-size solid $default;
      }
    }
    &.left {
      transform-origin: right;
      &:before {
        border-top: $pointer-size solid transparent;
        border-bottom: $pointer-size solid transparent;
        border-left: $pointer-size solid $white;
        right: calc(#{-$pointer-size} + 1px);
        top: calc(50% - #{$pointer-size});
      }
      &.inverted:before {
        border-left: $pointer-size solid $default;
      }
    }

    &.right {
      transform-origin: left;
      &:before {
        border-top: $pointer-size solid transparent;
        border-bottom: $pointer-size solid transparent;
        border-right: $pointer-size solid $white;
        left: calc(#{-$pointer-size} + 1px);
        top: calc(50% - #{$pointer-size});
      }
      &.inverted:before {
        border-right: $pointer-size solid $default;
      }
    }
  }
}

.scale-fade-enter-active{
  animation: showTranslate 0.2s linear;
}

.scale-fade-leave-active {
  animation: hideTranslate 0.1s linear;
}

.scale-fade-enter {
  transform: scale(1);
}

.scale-fade-leave-to {
  transform: scale(0);
}

@keyframes showTranslate {
  from {
    transform: scale(0);
    filter: none;
  }
  50% {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}

@keyframes hideTranslate {
  form {
    transform: scale(1);
  }

  to {
    transform: scale(0);
    filter: none;
  }
}
</style>
