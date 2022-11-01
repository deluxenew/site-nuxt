<template>
  <div class="p-1">
    <ui-block>

    </ui-block>
    <div class="title">{{title}}</div>
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
  import UiBlock from "COMPONENTS/reuse/UiBlock";
  export default {
    name: "CRUDPanel",
    components: {UiBlock},
    props: {
      title: {
        type: String,
        default: ""
      },
      items: {
        type: Array,
        default: () => []
      },
      crudFn: {
        type: Object,
        default: () => {
          return {
            addItem: () => {},
            addItems: () => {},
            getItems: () => {},
            getItem: () => {},
            editItem: () => {},
            editItems: () => {},
            removeItem: () => {},
            removeItems: () => {},
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
