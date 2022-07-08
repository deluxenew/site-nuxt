<template lang="pug">
  .p-1
    .title Палень урапвления
    .p-2.w-100.flex.flex-wrap
      nuxt-link.p-2.item(tag='div' v-for='item in items' class='w-1/4' :key='item.slug' :to="'admin/' + item.slug")
        .m-2.p-4.text-4.transition-all(class='bg-[#50d71e] hover:bg-[#50df1e] cursor-[url(https://cdn.custom-cursor.com/db/5388/32/tree-felling-cursor-b.png),_pointer]')
          | {{item.title}}
    div
      .form
        input.outline(v-model='title' type='text')
        input.outline(v-model='slug' type='text')
      .title
        | Поля
      .form
        .list
          .list-item(v-for='(field, j) in fields' :key='j')
            div {{field.key}}
            input.outline(v-model='field.value' type='text')
            .wrapper
              .title Свойства
              .list
                .list-item(v-for='(prop, i) in field.props' :key='i')
                  input.outline(v-model='prop.key' type='text')
                  input.outline(v-model='prop.value' type='text')
              button(@click='addProp(field)') Добавить свойство
        button(@click='addField') Добавить Поле
      button(@click='addCategory')
        | Добавить
      button(@click='fetchAllCategories')
        | Получить всех
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
        slug: "slug",
        fields: []
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
        return this.fields.reduce((acc, el) => {
          const {value, props} = el
          const propsObj = props.reduce((propsList, prop) => {
            const {key: propsKey, value: propsValue} = prop
            if (!propsList[propsKey]) propsList[propsKey] = propsValue
            return propsList
          }, {})
          if (!acc[value]) acc[value] = {...propsObj}
          return acc
        }, {})
      }
    },
    methods: {
      async fetchAllCategories() {
        await this.$store.dispatch("admin/GET_ADMIN_CATEGORIES_ALL")
      },
      addField() {
        this.fields.push({...fieldExample, props: []})
      },
      addProp(field) {
        if (field) field.props.push({...propExample})
      },
      async addCategory() {
        if (this.fields && this.fields.length) return
        await this.$api.addCategory({
          title: this.title,
          slug: this.slug,
          fields: this.fieldsObject
        })
      }
    }
  }
</script>
