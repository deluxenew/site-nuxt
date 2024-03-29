<template>
  <div class="modal-wrapper">
    <div class="modal-controls">
      <fa-icon v-if="expanded" class="icon" :icon="['fac', isFullscreen ? 'collapse' :'expand']"
               @click="isFullscreen = !isFullscreen"/>
      <fa-icon class="icon" :icon="['fac', 'close']" @click="$emit('close')"/>
    </div>
    <div v-if="!hideHeader" ref="header" class="modal-header">
      <slot name="modal-header"/>
    </div>
    <div class="modal-body-wrapper">
      <div class="modal-body">
        <slot name="modal-body"/>
      </div>
    </div>
    <div v-if="!hideFooter" ref="footer" class="modal-footer">
      <slot name="modal-footer"/>
    </div>
  </div>
</template>

<script>

  const TOP_MARGIN = 120;

  export default {
    name: "ModalWrapper",
    props: {
      hideHeader: {
        type: Boolean,
        default: false,
      },
      hideFooter: {
        type: Boolean,
        default: false,
      },
      expanded: {
        type: Boolean,
        default: false,
      },
      defaultWidth: {
        type: Number,
        default: 320,
      },
      defaultHeight: {
        type: Number,
        default: 450,
      },
    },
    data() {
      return {
        isFullscreen: false,
        resizeHeight: 0,
        headerHeight: 0,
        footerHeight: 0,
        windowHeight: window.innerHeight,
        bodyHeight: 0,
        searchText: '',
        itemsToSearch: [],
        currentSearchPosition: 0,
      };
    },
    watch: {
      isFullscreen() {
        this.setHeaderHeight()
        this.setFooterHeight()
        this.setBodyHeight()
        this.setModalSize()
      }
    },
    computed: {
      top() {
        return (this.windowHeight - this.modalHeight + TOP_MARGIN) / 2;
      },
      modalHeight() {
        return this.defaultHeight;
      },
    },
    methods: {
      setHeaderHeight() {
        this.headerHeight = this.$refs.header ? this.$refs.header.clientHeight : 0
      },
      setFooterHeight() {
        this.footerHeight = this.$refs.footer ? this.$refs.footer.clientHeight : 0
      },
      setBodyHeight() {
        this.bodyHeight = this.isFullscreen
            ? this.windowHeight - this.headerHeight - this.footerHeight - TOP_MARGIN - 8
            : this.defaultHeight - this.headerHeight - this.footerHeight
      },
      setModalSize() {
        this.$parent.$parent.$el.setAttribute('style', `
        --modal-width: ${this.isFullscreen ? 'calc(100vw - 20px)' : this.defaultWidth + 'px'};
        --modal-height:  ${this.isFullscreen ? `calc(100vh - 8px - ${TOP_MARGIN}px)` : this.defaultHeight + 'px'};
        --modal-top:  ${this.isFullscreen ? TOP_MARGIN + 'px' : this.top + 'px'};
        --modal-left: ${this.isFullscreen ? '10px' : 'calc((100vw - ' + this.defaultWidth + 'px) / 2)'};
        --modal-header-height: ${this.$refs.header ? this.$refs.header.clientHeight : 0}px;
        --modal-footer-height: ${this.$refs.footer ? this.$refs.footer.clientHeight : 0}px;
        `);
      },
    },
    mounted() {
      this.setHeaderHeight()
      this.setFooterHeight()
      this.setBodyHeight()
      this.setModalSize()
    }
  }
</script>

<style lang="scss">
  .vm--overlay {
    width: 100%;
    height: 100%;

    &:after {
      opacity: 0.5;
      content: '';
      position: absolute;
      width: 600px;
      height: 600px;
      animation-name: modal-bg-in, cssload-rotate-three;
      animation-iteration-count: infinite;
      animation-duration: 20s, 1.15s;
      animation-timing-function: linear;
      border-top: 3px solid $white;
      border-radius: 50%;
    }
  }

  .vm--top-right-slot {
    width: 0;
    height: 100%;
    box-sizing: border-box;
    border-radius: 50%;

    &:before {
      opacity: 0.5;
      content: '';
      position: absolute;
      width: 600px;
      height: 600px;
      animation-name: modal-bg-in, cssload-rotate-two;
      animation-iteration-count: infinite;
      animation-duration: 20s, 1.15s;
      animation-timing-function: linear;
      border-right: 3px solid $default;
      border-radius: 50%;
    }

    &:after {
      opacity: 0.5;
      content: '';
      position: absolute;
      width: 600px;
      height: 600px;
      background-color: transparent;
      animation-name: modal-bg-in, cssload-rotate-one;
      animation-iteration-count: infinite;
      animation-duration: 20s, 1.15s;
      animation-timing-function: linear;
      border-bottom: 3px solid $green;
      border-radius: 50%;
    }
  }
</style>
