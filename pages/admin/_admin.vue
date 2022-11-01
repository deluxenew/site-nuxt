<template lang="pug">
div.wrapper
  div.title.flex
    | {{categoryName}}
    div.p-2.text-base.cursor-pointer(@click="showForm")
      | Добавить элемент

  div.flex.w-100.align-center.justify-center
    div.p-1.cursor-pointer(v-for="item in category.items" :key="item._id")
      div.p-4.bg-green-300
        | {{item.title || item.name}}
      div.flex.justify-center.w-100

        div.flex.align-center.justify-center.w-48.cursor-pointer(@click="clickItem(item)")
          fa-icon(:icon="['fac', 'edit']")
        div.flex.align-center.justify-center.w-48.cursor-pointer(@click="showDialog(item)")
          fa-icon(:icon="['fac', 'remove']")
  div(v-show="fieldsValues")
    category-item-fields(v-model="fieldsValues" :fields='category && category.fields')
    ui-button(
      text="Добавить"
      @click="addItem"
    )
    ui-button(@click="save" text="Сохранить")
  v-dialog
</template>

<script>
  import CategoryItemFields from "COMPONENTS/forms/CategoryItemFields";
  import UiButton from "COMPONENTS/reuse/UiButton";

  export default {
    name: "AdminPageView",
    components: {UiButton, CategoryItemFields},
    layout: "admin",
    fetchOnServer: false,
    fetchDelay: 0,
    data() {
      return {
        fieldsValues: null
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
        return this.category.title || ""
      },
      items() {
        return this.category.items || []
      },
    },
    async fetch() {
      await this.getCategoryFull()
    },
    methods: {
      clickItem(item) {
        this.fieldsValues = item
      },
      showForm() {
        this.fieldsValues = {}
      },
      async getCategoryFull() {
        await this.$store.dispatch(`admin/GET_CATEGORY`, { route: this.route })
      },
      async addItem() {
        await this.$store.dispatch(`admin/ADD_CATEGORY_ITEM`, {item: this.fieldsValues, route: this.route })
      },
      async save() {
        await this.$store.dispatch(`admin/EDIT_CATEGORY_ITEM`, {item: this.fieldsValues, route: this.route })
      },
      showDialog(item) {
        const vm = this
        this.$modal.show('dialog', {
          title: 'Удаление!',
          text: `Вы действительно хотите удалить "${item.title}"?`,
          buttons: [
            {
              title: 'Удалить',
              default: true,
              handler: () => { vm.removeItem(item) }
            },
            {
              title: 'Отмена',
              handler: () => {vm.$modal.hide('dialog')}
            }
          ]
        })
      },
      async removeItem({_id}) {
        await this.$api.removeCategoryItem(this.route, _id)
        this.$modal.hide('dialog')
      },
    }
  }
</script>

