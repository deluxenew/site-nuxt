<template>
  <div class="top-menu">
    <div class="title">
      Меню пользователя
    </div>

    <div class="links">
      <ul class="links__list" :style="`--item-total:${items.filter(el => !el.isParent).length}`">
        <li v-for="item in items"
            class="links__item"
            :class="{ parent: item.isParent }"
            :style="`--item-count:${item.id}`"
            :key="item.title"
        >
          <div
            v-if="item.children && item.children.length"
            class="links__link"
            @click.stop="itemClick({children: item.children})"
          >
            <fa-icon
              class="links__icon"
              :icon="['fac', item.iconName]"
              :key="item.iconName"
            />
            <span class="links__text">{{ item.title }}</span>
          </div>
          <nuxt-link
            v-else
            :to="item.link"
            class="links__link"
            @click.native="$emit('close')"
          >
            <fa-icon
              class="links__icon"
              :icon="['fac', item.iconName]"
              :key="item.iconName"
            />
            <span class="links__text">{{ item.title }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="row bottom">
      <ui-button
        class="button"
        :style="`--item-count:${items.length + 1}`"
        text="выход"
        @click="logout"
      />
    </div>
  </div>
</template>

<script>

import {userMenu} from "../../constants/userMenu";
import UiButton from "../reuse/UiButton";

export default {
  name: "UserMenu",
  components: {UiButton},
  props: {},
  data() {
    return {
      items: userMenu,
    }
  },
  methods: {
    async itemClick({children}) {
      this.items = children
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$emit('close')
    },
  }
}
</script>
<style>
:root {
  --base-grid: calc(8px - (1080px - 100vmin) / 50);
}
</style>

<style lang="scss" scoped>
.button {
  opacity: 0;
  animation: on-load .3s ease-in-out forwards;
  animation-delay: calc(var(--item-count) * 150ms);
}
.top-menu {
  padding: 32px;
  min-width: 50vw;
  width: 100%;
  transition: $trs;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    width: 100vw;
  }

  .title {
    padding-top: 32px;
    font-size: $h2;
    line-height: normal;
    font-weight: 500;
    font-family: $font;
    text-align: center;
    color: $default;
    width: 100%;
  }

  .links {
    --link-size: calc(var(--base-grid) * 22);
    color: $default;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 64px);
    top: 50vh;
    padding-top: 32px;
  }

  .links__list {
    position: relative;
    list-style: none;
  }

  .links__item {
    width: var(--link-size);
    height: var(--link-size);
    position: absolute;
    top: 0;
    left: 0;
    margin-top: calc(var(--link-size) / -2);
    margin-left: calc(var(--link-size) / -2);
    --angle: calc(360deg / var(--item-total));
    --rotation: calc(120deg + var(--angle) * var(--item-count));
    transform: rotate(var(--rotation)) translate(calc(var(--link-size) + var(--base-grid) * 8 - (1080px - 100vh) / 32)) rotate(calc(var(--rotation) * -1));
    cursor: pointer;

    &.parent {
      transform: translate(0);
    }
  }

  .links__link {
    opacity: 0;
    animation: on-load .3s ease-in-out forwards;
    animation-delay: calc(var(--item-count) * 150ms);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    background-color: $white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .links__icon {
    width: calc(var(--base-grid) * 8);
    height: calc(var(--base-grid) * 8);
    transition: all .3s ease-in-out;

    path {
      fill: $gray;

      &:last-child {
        fill: $green;
      }
    }
  }

  .pro {
    width: calc(var(--base-grid) * 8);
    height: calc(var(--base-grid) * 8);
    transition: all .3s ease-in-out;
  }

  .links__text {
    position: absolute;
    width: 100%;
    left: 0;
    text-align: center;
    height: calc(var(--base-grid) * 2);
    font-size: calc(var(--base-grid) * 2);
    bottom: calc(var(--base-grid) * 8.5);
    animation: text .3s ease-in-out forwards;
    text-transform: uppercase;
    transition: all .3s cubic-bezier(.53, -.67, .73, .74);
  }

  .links__link:after {
    content: "";
    background-color: transparent;
    width: var(--link-size);
    height: var(--link-size);
    border: 2px dashed $green;
    display: block;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all .3s cubic-bezier(.53, -.67, .73, .74);
    transform: none;
    opacity: 0;
  }

  .links__link:hover .links__icon, .links__link:hover .pro {
    transition: all .3s ease-in-out;
    transform: translateY(calc(var(--base-grid) * -1));
  }

  .links__link:hover .links__text {
    display: block;
    color: $green;
  }

  .links__link:hover:after {
    transition: all .3s cubic-bezier(.37, .74, .15, 1.65);
    transform: scale(1.1);
    opacity: 1;
  }

  @keyframes on-load {
    0% {
      opacity: 0;
      transform: scale(.3);
    }
    70% {
      opacity: .7;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes text {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(0);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(calc(var(--base-grid) * 5));
    }
  }
}
</style>
