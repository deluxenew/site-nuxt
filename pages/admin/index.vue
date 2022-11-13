<template lang="pug">
  div.grid.gap-2.p-3
    div.title Палень урапвления "{{ siteName }}"
    div.p-2
      ui-checkbox(v-model="showStaticCategories" label="Показываем категории со статическими данными")
    div.w-100.flex.flex-wrap.gap-4.mt-4
      div.item(
        v-for='item in items'
        :key='item.slug'
      )
        nuxt-link(
          tag='a'
          :to="baseRoute + item.slug + '/'"
        )
          div.p-4.text-4.transition-all(class='bg-[#50d71e] hover:bg-[#50df1e] cursor-[url(https://cdn.custom-cursor.com/db/5388/32/tree-felling-cursor-b.png),_pointer]')
            | {{item.title}}
        div.flex.justify-center.w-100

          div.flex.align-center.justify-center.w-48.cursor-pointer(@click="openEditCategory(item)")
            fa-icon(:icon="['fac', 'edit']")
          div.flex.align-center.justify-center.w-48.cursor-pointer(@click="showDialog(item)")
            fa-icon(:icon="['fac', 'remove']")
    div.grid.gap-2.p-2.bg-green-100.mt-4(class='w-1/2')
      div.text-xl Параметры
      div
        ui-input.mt-2(v-model='title' label="Название категории" type='text')
        ui-input.mt-2(v-model='slug' label="Код категории" type='text')
        ui-input.mt-2(v-model='collectionName' label="Код модели" type='text')
        ui-select.mt-2(v-model='parent' :items="staticCategoriesList" label="Родительсткая категория")
        ui-select.mt-2(v-model='minAccessLevel' :items="accessLevels" label="Уровень доступа")
        div.p-2
          ui-checkbox(v-model="isStaticValues" label="Статические данные?")
      div.text-xl.pt-3 Поля
      div.grid.gap-4.p-2.bg-green-200
        div(v-for='(field, j) in fields' :key='j')
          div.flex
            ui-input(v-model='field.value' type='text' label='Код поля')
            div.flex.align-center.justify-center.w-48.cursor-pointer.p-2(
              @click="removeField({fieldValue: field.value})"
            )
              fa-icon(:icon="['fac', 'remove']")
          div.grid.gap-2.p-2.bg-green-400.mt-2
            div.text-base Свойства
            div.grid.gap-2
              div.grid.gap-2.grid-cols-2(v-for='(prop, i) in field.props' :key='i')
                div
                  ui-select(v-model='prop.key' :items="getFilteredItems(field.value, prop.items)" type='text' label='Код')
                div.flex
                  ui-select(v-model='prop.value' :items="getPropVariants(prop.key)" type='text' label='Значение')
                  div.flex.align-center.justify-center.w-48.cursor-pointer.p-2(
                    @click="removeProp({fieldValue: field.value, propKey: prop.key})"
                  )
                    fa-icon(:icon="['fac', 'remove']")
              ui-button(@click='addProp(field)' text="Добавить свойство")
        ui-button(@click='addField(fields)' text="Добавить Поле")
    ui-button.mt-3(@click='addCategory' :text="(editCategory ? 'Обновить' : 'Добавить') + ' категорию'")
    div.p-4
      div.text-base Готовый объект полей
      pre.pt-2 {{fieldsObject}}
    v-dialog
</template>

<script>
  import UiInput from "COMPONENTS/reuse/UiInput";
  import UiButton from "COMPONENTS/reuse/UiButton";
  import UiSelect from "COMPONENTS/reuse/UiSelect";

  import { props, getPropVariants } from "CONSTANTS/adminItems"
  import UiCheckbox from "COMPONENTS/reuse/UiCheckbox";

  const propExample = {
    key: "",
    value: "",
    items: [...props]
  }
  const fieldExample = {
    key: "",
    value: "",
    props: []
  }

  export default {
    components: { UiCheckbox, UiSelect, UiButton, UiInput },
    layout: "admin",
    name: "index",
    fetchOnServer: false,
    middleware: ["isAuth"],
    fetchDelay: 0,
    data() {
      return {
        title: "",
        slug: "",
        parent: '',
        isStaticValues: false,
        collectionName: "",
        minAccessLevel: 0,
        fields: [],
        editCategory: false,
        showStaticCategories: false
      }
    },
    async fetch() {
      await this.fetchAllCategories()
      await this.fetchAllUserRoles()
    },
    computed: {
      siteName() {
        return this.$siteName
      },
      baseRoute() {
        return this.$route.path
      },
      items() {
        return this.$store.getters["admin/ADMIN_CATEGORIES_ALL"]
            .filter(({ isStaticValues }) => (!isStaticValues && !this.showStaticCategories) || this.showStaticCategories) || []
      },
      staticCategoriesList() {
        return this.items
            .filter(({ isStaticValues }) => !isStaticValues)
            .map((el) => {
              return {
                id: el._id,
                title: el.title,
                value: el.slug,
              }
            })
      },
      fieldsObject() {
        return this.fields.reduce((acc, el) => {
          const { value, props } = el
          const propsObj = props.reduce((propsList, prop) => {
            const { key: propsKey, value: propsValue } = prop
            if (!propsList[propsKey]) propsList[propsKey] = propsValue
            return propsList
          }, {})
          if (!acc[value]) acc[value] = { ...propsObj }
          return acc
        }, {})
      },
      userRoles() {
        return this.$store.getters["users/USER_ROLES"] || []
      },
      accessLevels() {
        return this.userRoles.map((el) => {
          return {
            ...el,
            value: el.accessLevel
          }
        })
      }
    },
    methods: {
      getPropVariants(v) {
        return getPropVariants(v)
      },
      addField(arr) {
        arr.push({ ...fieldExample, props: [] })
      },
      removeField({ fieldValue }) {
        const fieldIdx = this.fields.findIndex(({ value }) => value === fieldValue)
        if (fieldIdx > -1) this.fields.splice(fieldIdx, 1)
      },
      addProp(field) {
        if (field) field.props.push({ ...propExample })
      },
      removeProp({ fieldValue, propKey }) {
        const field = this.fields.find(({ value }) => value === fieldValue)
        if (field && field.props) {
          const propIdx = field.props.findIndex(({ key }) => key === propKey)
          if (propIdx > -1) field.props.splice(propIdx, 1)
        }
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
              handler: () => {
                vm.removeCategory(category)
              }
            },
            {
              title: 'Отмена',
              handler: () => {
                vm.$modal.hide('dialog')
              }
            }
          ]
        })
      },
      openEditCategory(category) {
        if (!category) return
        this.editCategory = true
        const { slug, title, collectionName, minAccessLevel, isStaticValues, parent, fields } = category
        this.slug = slug
        this.title = title
        this.collectionName = collectionName
        this.parent = !!parent ? parent : ''
        this.isStaticValues = isStaticValues
        this.minAccessLevel = minAccessLevel
        if (!fields) this.fields = []
        else this.fields = Object.keys(fields)
            .map((fieldValue) => {
              return {
                value: fieldValue,
                props: Object.keys(fields[fieldValue])
                    .map((propKey) => {
                      return {
                        key: propKey,
                        value: fields[fieldValue][propKey],
                        items: [...props]
                      }
                    })
              }
            })
      },
      getFilteredItems(fieldValue, items) {
        return items && items.filter(({ value }) => !this.fieldsObject[fieldValue][value])
      },
      async fetchAllCategories() {
        await this.$store.dispatch("admin/GET_ADMIN_CATEGORIES_ALL")
      },
      async fetchAllUserRoles() {
        await this.$store.dispatch("users/GET_USER_ROLES")
      },
      async removeCategory({ _id }) {
        await this.$api.removeCategory(_id)
        this.$modal.hide('dialog')
      },
      async addCategory() {
        if (this.fields && !this.fields.length) return
        const sendData = {
          title: this.title,
          slug: this.slug,
          parent: this.parent,
          isStaticValues: this.isStaticValues,
          collectionName: this.collectionName,
          minAccessLevel: this.minAccessLevel,
          fields: this.fieldsObject
        }
        if (this.editCategory) await this.$api.editCategory(sendData)
        else await this.$api.addCategory(sendData)
      },
    }
  }
</script>
