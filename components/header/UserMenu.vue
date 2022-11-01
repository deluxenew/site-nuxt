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
        iconName="logout"
        :style="`--item-count:${items.length + 1}`"
        text="выход"
        @click="logout"
      />
    </div>
  </div>
</template>

<script>

import {userMenu} from "CONSTANTS/userMenu";
import UiButton from "COMPONENTS/reuse/UiButton";

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

