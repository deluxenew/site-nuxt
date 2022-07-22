<template lang="pug">
div.wrapper
  div.title {{categoryName}}

  div.flex.w-100.align-center.justify-center
    div.p-1.cursor-pointer(v-for="item in category.items" :key="item._id" @click="clickItem(item)")
      div.p-4.bg-green-300
        | {{item.title}}
  div
    div
      category-item-fields(v-model="fieldsValues" :fields='category && category.fields')
      ui-button(
        text="Добавить"
        @click="addItem"
      )
</template>

<script>
  import CategoryItemFields from "../../components/forms/CategoryItemFields";
  import UiButton from "../../components/reuse/UiButton";
  export default {
    name: "AdminPageView",
    components: {UiButton, CategoryItemFields},
    layout: "admin",
    fetchOnServer: false,
    fetchDelay: 0,
    data() {
      return {
        title: "",
        slug: "",
        fieldsValues: {}
      }
    },
    computed: {
      route() {
        return this.$route.params.admin
      },
      category() {
        return this.$store.getters[`admin/CATEGORY`](this.route) || {}
      },
      categoryName() {
        return this.category && this.category.title || ""
      },
      items() {
        return this.category && this.category.items
      }
    },
    async fetch() {
      await this.getCategoryFull()
    },
    methods: {
      clickItem(item) {
        this.fieldsValues = item
      },
      async getCategoryFull() {
        await this.$store.dispatch(`admin/GET_CATEGORY`, { route: this.route })
      },
      async addItem() {
        await this.$store.dispatch(`admin/ADD_CATEGORY_ITEM`, {item: this.fieldsValues, route: this.route })
      }
    }
  }
</script>

