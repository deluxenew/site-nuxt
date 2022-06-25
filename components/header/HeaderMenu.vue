<template>
  <div class="top-menu">
    <div class="title">
      Главное меню
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
import {mainMenu} from "../../constants/mainMenu";
import ProjectIcon from "../customSvgIcons/ProjectIcon";

export default {
  name: "HeaderMenu",
  components: {ProjectIcon},
  props: {},
  data() {
    return {
      items: mainMenu,
    }
  },
  methods: {
    async itemClick({children}) {
      this.items = children
    },
  }
}
</script>
