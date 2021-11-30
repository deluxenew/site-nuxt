<template>
  <nav
    ref="menu"
    class="page-sections-navigate"
  >
    <div class="toggle-nav" @click="opened = !opened">
      <fa-icon class="menu-icon" :icon="['fac', 'burger']"/>
    </div>
    <div class="item-list" :class="{opened}">
      <div
        class="nav-item"
        v-for="(item, index) in items"
        @click="clickMenu(index)"
      >
        {{item.navTitle}}
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "PageSectionsNavigate",
    props: {
      items: {
        type: Array,
        default: () => []
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        opened: false,
      }
    },
    watch: {
      opened(val) {
        if (val) this.subscribeClick()
        else this.unsubscribeClick()
      },
    },
    computed: {
      currentSectionId: {
        get() {
          return this.value || 0
        },
        set(v) {
          this.$emit('input', v)
        },
      }
    },
    methods: {
      outerClick(e) {
        if (!this.$refs.menu.contains(e.target) && this.opened) this.opened = false
      },
      subscribeClick() {
        window.addEventListener('click', this.outerClick)
      },
      unsubscribeClick() {
        window.removeEventListener('click', this.outerClick)
      },
      clickMenu(index) {
        this.currentSectionId = index
        this.opened = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-sections-navigate {
    position: fixed;
    top: 86px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;


    .toggle-nav {
      margin-right: 16px;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }

    .nav-item + .nav-item {
      margin-top: 16px;
    }

    .item-list {
      transition: $trs;
      transform: translateX(100%);
      z-index: 10000;

      .nav-item {
        width: 112px;
        height: 112px;
        background-color: $gray;
        border-radius: $rate;
        cursor: pointer;
      }

      &.opened {
        transform: translateX(0);
      }
    }

  }
</style>
