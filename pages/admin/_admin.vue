<template>
  <div class="wrapper">
    <div class="title">{{categoryName}}</div>
    {{category}}
    <div>
      <div>
        <input
          class="outline"
          v-model="title"
          type="text"
        >
        <input
          class="outline"
          v-model="slug"
          type="text"
        >
        <button @click="addItem">
          Добавить
        </button>
<!--        <button @click="fetchAllCategories">-->
<!--          Получить всех-->
<!--        </button>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AdminPageView",
    layout: "admin",
    fetchOnServer: false,
    fetchDelay: 0,
    data() {
      return {
        title: "",
        slug: "",
      }
    },
    computed: {
      route() {
        return this.$route.params.admin
      },
      category() {
        return this.$store.getters[`admin/CATEGORY`](this.route)
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
      async getCategoryFull() {
        await this.$store.dispatch(`admin/GET_CATEGORY`, { route: this.route })
      },
      async addItem() {
        await this.$store.dispatch(`admin/ADD_CATEGORY_ITEM`, {item: {title: this.title, slug: this.slug}, route: this.route })
      }
    }
  }
</script>

