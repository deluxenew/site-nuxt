<template>
  <div class="modal-wrapper">
    <div class="modal-controls">
      <fa-icon class="icon" :icon="['fac', 'expand']" @click="$emit('expand')"/>
      <fa-icon class="icon" :icon="['fac', 'close']" @click="$emit('close')"/>
    </div>
    <div v-if="!hideHeader" class="modal-header">
      <slot name="modal-header"/>
    </div>
    <div class="modal-body">
      <slot name="modal-body"/>
    </div>
    <div v-if="!hideFooter" class="modal-footer">
      <slot name="modal-footer"/>
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  width: 100%;
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
      border-left: 1px  solid $green;
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

        &:nth-child(2){
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

  }

  .modal-body {
    height: calc(100vh - 150px);
    width: 100%;
    overflow-y: auto;
  }
}
</style>
