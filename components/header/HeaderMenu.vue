<template>
  <div class="top-menu">
    <div class="title">
      Главное меню
    </div>

    <div class="links">
      <ul class="links__list" :style="`--item-total:${items.length}`">
        <li v-for="item in items"
            class="links__item"
            :style="`--item-count:${item.id}`"
            :key="item.title"
        >
          <div
            v-if="item.children && item.children.length"
            class="links__link"
            @click.stop="itemClick({children: item.children})"
          >
            <project-icon
              v-if="item.id === 2"
              class="pro"
            />
            <fa-icon
              v-else
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
  </div>
</template>

<script>
import {topMenu} from "../../constants/topMenu";
import ProjectIcon from "../customSvgIcons/ProjectIcon";

export default {
  name: "HeaderMenu",
  components: {ProjectIcon},
  props: {},
  data() {
    return {
      items: topMenu,
    }
  },
  methods: {
    async itemClick({children}) {
      this.items = children
    },
  }
}
</script>
<style>
:root {
  --base-grid: calc(8px - (1080px - 100vh) / 50);
}
</style>
<style lang="scss" scoped>


.top-menu {
  padding: 32px;
  min-width: 50vw;
  width: 100%;
  transition: $trs;
  height: 100%;

  .title {
    padding-top: 32px;
    font-size: 32px;
    line-height: normal;
    font-weight: 500;
    text-align: center;
    color: $default;
    width: 100%;
    min-width: 512px;
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
    display: none;
    bottom: calc(var(--base-grid) * 8.5);
    animation: text .3s ease-in-out forwards;
    text-transform: uppercase;
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
