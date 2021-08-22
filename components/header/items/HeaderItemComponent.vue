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

    <slot/>
  </div>
</template>

<script>
export default {
  name: "HeaderItemComponent",
  props: {
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

.header-item {
  padding: 16px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  cursor: pointer;
  color: $default;

  .title {
    display: flex;
    justify-content: center;
  }

  &:hover {
    .arrow-button {
        .icon, .icon-close {
          path {
            fill: $green;
          }
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
