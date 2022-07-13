<template lang="pug">
div.grid.gap-2.p-3
  div.title Палень урапвления
  div.w-100.flex.flex-wrap.gap-4
    div.item(
      v-for='item in items'
      :key='item.slug'
    )
      nuxt-link(
        tag='div'
        :to="'admin/' + item.slug"
      )
        div.p-4.text-4.transition-all(class='bg-[#50d71e] hover:bg-[#50df1e] cursor-[url(https://cdn.custom-cursor.com/db/5388/32/tree-felling-cursor-b.png),_pointer]')
          | {{item.title}}
      div.flex.justify-center.w-100

        div.flex.align-center.justify-center.w-48.cursor-pointer(@click="openEditCategory(item)")
          fa-icon(:icon="['fac', 'edit']")
        div.flex.align-center.justify-center.w-48.cursor-pointer(@click="showDialog(item)")
          fa-icon(:icon="['fac', 'remove']")
  div.grid.gap-2.p-2.bg-green-100(class='w-1/2')
    div.text-xl Параметры
    div
      ui-input.mt-2(v-model='title' label="Название категории" type='text')
      ui-input.mt-2(v-model='slug' label="Код категории" type='text')
      ui-input.mt-2(v-model='collectionName' label="Код модели" type='text')
    div.text-xl.pt-3 Поля
    div.grid.gap-4.p-2.bg-green-200
      div(v-for='(field, j) in fields' :key='j')
        ui-input(v-model='field.value' type='text' label='Код поля')
        div.grid.gap-2.p-2.bg-green-400
          div.text-base Свойства
          div.grid.gap-2
            div.grid.gap-2.grid-cols-2(v-for='(prop, i) in field.props' :key='i')
              ui-select(v-model='prop.key' :items="props" type='text' label='Код свойства')
              ui-select(v-model='prop.value' :items="getPropVariants(prop.key)" type='text' label='Значение свойства')
            ui-button(@click='addProp(field)' text="Добавить свойство")
      ui-button(@click='addField(fields)' text="Добавить Поле")
  ui-button.mt-3(@click='addCategory' text="Добавить категорию")
  div.p-4
    div.text-base Готовый объект полей
    pre.pt-2 {{fieldsObject}}
  v-dialog
</template>

<script>
  import UiInput from "../../components/reuse/UiInput";
  import UiButton from "../../components/reuse/UiButton";
  import UiSelect from "../../components/reuse/UiSelect";

  import { props, getPropVariants } from "../../constants/adminItems"
  const propExample = {
    key: "",
    value: ""
  }
  const fieldExample = {
    key: "",
    value: "",
    props: []
  }

  export default {
    components: {UiSelect, UiButton, UiInput},
    layout: "admin",
    name: "index",
    fetchOnServer: false,
    fetchDelay: 0,
    data() {
      return {
        title: "",
        slug: "",
        collectionName: "",
        fields: [],
        editCategory: false
      }
    },
    async fetch() {
      await this.fetchAllCategories()
    },
    computed: {
      items() {
        return this.$store.getters["admin/ADMIN_CATEGORIES_ALL"]
      },
      props() {
        return [...props]
      },
      fieldsObject() {
        return this.getFieldObject(this.fields)
      }
    },
    methods: {
      getPropVariants(v) {
        return getPropVariants(v)
      },
      getFieldObject(arr) {
        return arr.reduce((acc, el) => {
          const {value, props} = el
          const propsObj = props.reduce((propsList, prop) => {
            const {key: propsKey, value: propsValue} = prop
            if (!propsList[propsKey]) propsList[propsKey] = propsValue
            return propsList
          }, {})
          if (!acc[value]) acc[value] = {...propsObj}
          return acc
        }, {})
      },
      async fetchAllCategories() {
        await this.$store.dispatch("admin/GET_ADMIN_CATEGORIES_ALL")
      },
      addField(arr) {
        arr.push({...fieldExample, props: []})
      },
      addProp(field) {
        if (field) field.props.push({...propExample})
      },
      async addCategory() {
        if (this.fields && !this.fields.length) return
        const sendData = {
          title: this.title,
          slug: this.slug,
          collectionName: this.collectionName,
          fields: this.fieldsObject
        }
        if (this.editCategory) await this.$api.editCategory(sendData)
        else await this.$api.addCategory(sendData)
      },
      showDialog(category) {
        const vm = this
        this.$modal.show('dialog', {
          title: 'Удаление!',
          text: `Вы действительно хотите удалить "${category.title}"?`,
          buttons: [
            {
              title: 'Удалить',
              default: true,
              handler: () => { vm.removeCategory(category) }
            },
            {
              title: 'Отмена',
              handler: () => {vm.$modal.hide('dialog')}
            }
          ]
        })
      },
      async removeCategory({_id}) {
        await this.$api.removeCategory(_id)
        this.$modal.hide('dialog')
      },
      openEditCategory(category) {
        if (!category) return
        this.editCategory = true
        const {slug, title, collectionName, fields} = category
        this.slug = slug
        this.title = title
        this.collectionName = collectionName
        if (!fields) this.fields = []
        else this.fields = Object.keys(fields)
            .map((fieldName) => {
              return {
                value: fieldName,
                props: Object.keys(fields[fieldName])
                    .map((propName) => {
                      return {
                        key: propName,
                        value: fields[fieldName][propName]
                      }
                    })
              }
            })
      },
    }
  }
</script>
