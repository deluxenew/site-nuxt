<template>
  <div class="header-item" @click="$emit('click', itemName)">
    <transition name="bounce">
      <div class="title" v-if="titleShow" :style="{ justifyContent: alignTitle }">
        <div class="desktop">
          {{ title }}
        </div>

        <div class="mobile">
          <fa-icon class="item-icon" :icon="['fac', iconName]"/>
        </div>
      </div>
    </transition>

    <div class="arrow-button" v-if="itemName ==='calc'">
      <transition name="bounce">
        <fa-icon v-if="currentItem !== 'calc'" class="icon" :icon="['fac', 'chevronDown']"/>
      </transition>

      <transition name="bounce">
        <fa-icon v-if="currentItem === 'calc'" class="icon-close calc" :icon="['fac', 'close']"/>
      </transition>

      <fa-icon class="icon-bottom" :icon="['fac', 'arrowHeader']"/>
    </div>

    <template v-else>
      <transition name="bounce">
        <fa-icon v-if="currentItem === itemName" class="icon-close" :class="itemName"
                 :icon="['fac', 'close']"/>
      </transition>
    </template>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "HeaderItemComponent",
  props: {
    currentItem: {
      type: String,
      default: ''
    },
    alignTitle: {
      type: String,
      default: 'flex-start'
    },
    title: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: ''
    },
    itemName: {
      type: String,
      default: ''
    },
    titleShow: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.desktop {
  text-align: center;
  transition: $trs;
  user-select: none;

  @media (max-width: 640px) {
    display: none;
  }
}

.mobile {
  width: 21px;
  height: 23px;
  display: flex;
  justify-content: center;
  text-align: center;
  user-select: none;

  .item-icon {
    path {
      transition: $trs;
    }
  }

  @media (min-width: 641px) {
    display: none;
  }
}

.icon-close {
  width: 18px;
  height: 18px;
  position: absolute;
  z-index: 2;
  top: calc(50% - 9px);

  path {
    transition: $trs;
  }

  &:hover {
    path {
      fill: $green;
    }
  }

  &.contacts {
    left: 24px;
  }

  &.calc {
    left: calc(50% - 9px);
    bottom: -3px;
  }

  &.menu {
    right: 24px;
  }
}

.arrow-button {
  position: absolute;
  text-align: center;
  width: 90px;
  z-index: 1;
  height: 16px;
  bottom: 0;
  left: calc(50% - 45px);

  .icon {
    width: 30px;
    height: 10px;
    position: absolute;
    z-index: 2;
    bottom: -3px;
    left: calc(50% - 15px);

    path {
      transition: $trs;
    }
  }

  .icon-bottom {
    position: absolute;
    left: calc(50% - 45px);
    bottom: -20px;
    z-index: 1;

    path {
      fill: $green;

      &:last-child {
        fill: $white;
      }
    }
  }
}

.header-item {
  padding: 16px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  cursor: pointer;
  color: $default;
  min-width: 150px;

  @media (max-width: 640px) {
    min-width: 100px;
  }

  .title {
    display: flex;
    justify-content: center;
    height: 21px;
  }

  &:hover {
    .icon, .icon-close {
      path {
        fill: $green;
      }
    }

    .desktop {
      color: $green;
      text-shadow: 1px 1px 5px rgba($default, .1);
    }

    .mobile {
      .item-icon {
        path {
          fill: $green;
        }
      }
    }
  }
}
</style>
