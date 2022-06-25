<template>
  <div class="header-item" @click="$emit('click', itemName)">
    <transition name="bounce-fast" mode="out-in">
      <div class="title" v-if="titleShow" :style="{ justifyContent: alignTitle }">
        <div class="mobile">
          <fa-icon class="item-icon" :icon="['fac', iconName]"/>
        </div>
        <div class="desktop">
          {{ title }}
        </div>
      </div>
    </transition>


    <div class="arrow-button" v-if="arrowDown">
      <transition name="bounce" mode="out-in">
        <fa-icon v-if="currentItem !== itemName" class="icon" :icon="['fac', 'chevronDown']"/>
      </transition>

      <transition name="bounce" mode="out-in">
        <fa-icon v-if="currentItem === itemName" class="icon-close calc" :icon="['fac', 'close']"/>
      </transition>

      <fa-icon class="icon-bottom" :icon="['fac', 'arrowHeader']"/>
    </div>

    <template v-else>
      <transition name="bounce" mode="out-in">
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
      },
      arrowDown: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>

