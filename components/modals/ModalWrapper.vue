<template>
  <div class="modal-wrapper">
    <div class="modal-controls">
      <fa-icon class="icon" :icon="['fac', isFullscreen ? 'collapse' :'expand']" @click="isFullscreen = !isFullscreen"/>
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
$padding: 24px;
$paddingMobile: 16px;
$bodyHeight: calc(var(--modal-height) - var(--modal-header-height) - var(--modal-footer-height) - (#{$padding} * 2)) !important;
$bodyHeightMobile: calc(100vh - var(--modal-header-height) - var(--modal-footer-height) - (#{$paddingMobile} * 2) - 130px) !important;
.vm--overlay, .vm--container {
  transition: $trs;
}
.modal-custom {
  width: var(--modal-width) !important;
  height: var(--modal-height) !important;
  left: var(--modal-left) !important;
  top: var(--modal-top) !important;
  transition: $trs;

  @media (max-width: 640px) {
    width: calc(100vw - 16px) !important;
    height: calc(100vh - 128px) !important;
    left: 8px !important;
    top: 120px !important;
  }
}

.modal-wrapper {
  width: 100%;
  box-sizing: border-box;
  transition: $trs;

  .modal-controls {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: -56px;
    background-color: $white;
    border-radius: 8px;
    overflow: hidden;

    .icon + .icon {
      border-left: 1px solid $green;
    }

    .icon {
      position: relative;
      width: 16px;
      height: 16px;
      padding: 16px;
      cursor: pointer;
      box-sizing: content-box;
      transition: $trs;

      path {
        transition: $trs;

        &:nth-child(2) {
          fill: $gray;
        }
      }

      &:hover {
        background-color: $green;

        path {
          fill: $white;
        }
      }
    }
  }

  .modal-header {
    padding: $padding;
    border-bottom: 1px solid rgba($gray, 0.3);
    box-sizing: border-box;

    @media (max-width: 640px) {
      padding: $paddingMobile;
    }
  }

  .modal-body-wrapper {
    padding: $padding;

    @media (max-width: 640px) {
      padding: $paddingMobile;
    }

    .modal-body {
      width: 100%;
      overflow-y: auto;
      transition: $trs;
      box-sizing: border-box;
      height: $bodyHeight;

      @media (max-width: 640px) {
        height: $bodyHeightMobile;
      }

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: 0 0 16px rgba($gray, 0.3)!important;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $green!important;
        border-radius: 8px;
      }
    }
  }

  .modal-footer {
    display: flex;
    align-items: center;
    padding: $padding;
    border-top: 1px solid rgba($gray, 0.3);
    box-sizing: border-box;

    @media (max-width: 640px) {
      padding: $paddingMobile;
    }
  }
}

</style>
