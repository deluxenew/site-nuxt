<template>
  <div class="p-1">
    <div class="title">Палень урапвления</div>
    <div class="p-2 w-100 flex flex-wrap">
      <nuxt-link
        tag="div"
        v-for="item in items"
        class="p-2 item w-1/4"
        :key="item.slug"
        :to="'admin/' + item.slug"
      >
        <div class="
          m-2 p-4 text-4 bg-[#50d71e] hover:bg-[#50df1e] transition-all
          cursor-[url(https://cdn.custom-cursor.com/db/5388/32/tree-felling-cursor-b.png),_pointer]
        ">
          {{item.title}}
        </div>
      </nuxt-link>
    </div>
    <div>
      <div class="form">
        <input class="outline" v-model="title" type="text">
        <input class="outline" v-model="slug" type="text">
      </div>
      <div class="title">
        Поля
      </div>
      <div class="form">
        <div class="list">
          <div
            class="list-item"
            v-for="field in fields"
            :key="field.name"
          >
            <input
              class="outline"
              v-model="field.name"
              type="text"
            >
            <input
              class="outline"
              v-model="field.value"
              type="text"
            >
            <div class="wrapper">
              <div class="title">Свойства</div>

              <div class="list">
                <div
                  class="list-item"
                  v-for="prop in field.props"
                  :key="prop.key"
                >
                  <input
                    class="outline"
                    v-model="prop.key"
                    type="text"
                  >
                  <input
                    class="outline"
                    v-model="prop.value"
                    type="text"
                  >
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <button @click="addCategory">
        Добавить
      </button>
      <button @click="fetchAllCategories">
        Получить всех
      </button>
    </div>
  </div>
</template>

<script>
  const fieldExample = {
    name: "Название поля",
    value: "Значение",
    props: [
      {
        key: "Ключ",
        value: "Значение"
      }
    ]
  }
  export default {
    layout: "admin",
    name: "index",
    fetchOnServer: false,
    fetchDelay: 0,
    data() {
      return {
        title: "Название категории",
        slug: "slug",
        fields: [
          {
            ...fieldExample,
            props: [...fieldExample.props]
          },
        ]
      }
    },
    async fetch() {
      await this.fetchAllCategories()
    },
    computed: {
      items() {
        return this.$store.getters["admin/ADMIN_CATEGORIES_ALL"]
      },
    },
    methods: {
      async fetchAllCategories() {
        await this.$store.dispatch("admin/GET_ADMIN_CATEGORIES_ALL")
      },
      async addCategory() {
        await this.$api.addCategory({title: this.title, slug: this.slug, categoryModelFields: this.fields})
      }
    }
  }
</script>
