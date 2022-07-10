<template lang="pug">
div.p-1
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
  div.form
    div.fields
      input.outline(v-model='title' type='text')
      input.outline(v-model='slug' type='text')
      input.outline(v-model='collectionName' type='text')
    div.title Поля
    div.form
      div.list
        div.list-item(v-for='(field, j) in fields' :key='j')
          div {{field.key}}
          input.outline(v-model='field.value' type='text')
          div.wrapper
            div.title Свойства
            div.list
              div.list-item(v-for='(prop, i) in field.props' :key='i')
                input.outline(v-model='prop.key' type='text')
                input.outline(v-model='prop.value' type='text')
            button(@click='addProp(field)') Добавить свойство
      button(@click='addField(fields)') Добавить Поле
    button(@click='addCategory') Добавить
  div.title Редактироваие
  div.form(v-if="editCategory")
    div.fields
      input.outline(v-model='editCategory.title' type='text')
      input.outline(v-model='editCategory.slug' type='text')
      input.outline(v-model='editCategory.collectionName' type='text')
    div.title Поля
    div.form
      div.list
        div.list-item(v-for='(field, j) in editCategory.fields' :key='j')
          div {{field.key}}
          input.outline(v-model='field.value' type='text')
          div.wrapper
            div.title Свойства
            div.list
              div.list-item(v-for='(prop, i) in field.props' :key='i')
                input.outline(v-model='prop.key' type='text')
                input.outline(v-model='prop.value' type='text')
            button(@click='addProp(field)') Добавить свойство
      button(@click='addField(editCategory.fields)') Добавить Поле
    button(@click='addCategory') Добавить
    button(@click='updateCategory') Сохранить

  hr
  button(@click='fetchAllCategories') Получить всех
  | Готовый объект полей
  pre {{fieldsObject}}

</template>

<script>
  const propExample = {
    key: "Ключ",
    value: "Значение"
  }
  const fieldExample = {
    key: "Ключ",
    value: "Название ключа",
    props: []
  }

  export default {
    layout: "admin",
    name: "index",
    fetchOnServer: false,
    fetchDelay: 0,
    data() {
      return {
        title: "Название категории",
        slug: "slugs",
        collectionName: "Slug",
        fields: [],
        editCategory: null
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
        await this.$api.addCategory({
          title: this.title,
          slug: this.slug,
          collectionName: this.collectionName,
          fields: this.fieldsObject
        })
      },
      openEditCategory(category) {
        if (!category) return
        const { slug, title, collectionName, fields } = category
        this.editCategory = {}
        this.editCategory.slug = slug
        this.editCategory.title = title
        this.editCategory.collectionName = collectionName
        this.editCategory.fields = Object.keys(fields)
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
          title: this.editCategory.title,
          slug: this.editCategory.slug,
          collectionName: this.editCategory.collectionName,
          fields: this.getFieldObject(this.editCategory.fields)
        })
      }
    }
  }
</script>
