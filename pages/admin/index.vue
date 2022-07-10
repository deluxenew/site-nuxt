<template lang="pug">
div.grid.gap-2.p-3
  div.title Палень урапвления
  div.p-2.w-100.flex.flex-wrap
    div.item(
      v-for='item in items'
      :key='item.slug'
    )
      nuxt-link.p-2.item(
        tag='div'
        class='w-1/4'
        :to="'admin/' + item.slug"
      )
        div.m-2.p-4.text-4.transition-all(class='bg-[#50d71e] hover:bg-[#50df1e] cursor-[url(https://cdn.custom-cursor.com/db/5388/32/tree-felling-cursor-b.png),_pointer]')
          | {{item.title}}
      div(@click="openEditCategory(item)")
        | Редактировать

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
              ui-input(v-model='prop.key' type='text' label='Код свойства')
              ui-input(v-model='prop.value' type='text' label='Значение свойства')
            ui-button(@click='addProp(field)' text="Добавить свойство")
      ui-button(@click='addField(fields)' text="Добавить Поле")
  ui-button.mt-3(@click='addCategory' text="Добавить категорию")
  div.p-4
    div.text-base Готовый объект полей
    pre.pt-2 {{fieldsObject}}
</template>

<script>
  import UiInput from "../../components/reuse/UiInput";
  import UiButton from "../../components/reuse/UiButton";
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
    components: {UiButton, UiInput},
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
      fieldsObject() {
        return this.getFieldObject(this.fields)
      }
    },
    methods: {
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
        if (this.editCategory) await this.$api.updateCategory(sendData)
        else await this.$api.addCategory(sendData)
      },
      openEditCategory(category) {
        if (!category) return
        this.editCategory = true
        const {slug, title, collectionName, fields} = category
        this.slug = slug
        this.title = title
        this.collectionName = collectionName
        this.fields = Object.keys(fields)
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
      async updateCategory() {
        if (!this.editCategory) return
        await this.$api.editCategory({
          title: this.title,
          slug: this.slug,
          collectionName: this.collectionName,
          fields: this.getFieldObject(this.fields)
        })
      }
    }
  }
</script>
