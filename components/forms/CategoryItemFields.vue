<template lang="pug">
div.grid.gap-2.p-2.bg-green-100
  div(v-for="field in fieldValues" :key="field.fieldName")
    component(
      :is="field.componentName"
      v-model="field.value"
      v-bind="field"
      @input="inputHandler"
      :key="field.fieldName"
    )

</template>

<script>
  import { getComponentNameByFieldType, getDefaultFieldValue } from "../../constants/adminItems"

  export default {
    name: "CategoryItemFields",
    props: {
      value: {
        type: Object,
        default: () => {}
      },
      fields: {
        type: Object,
        default: () => {}
      }
    },
    components: {
      UiButton: () => import("../../components/reuse/UiButton"),
      UiInput: () => import("../../components/reuse/UiInput"),
      UiInputNumber: () => import("../../components/reuse/UiInputNumber"),
      UiItems: () => import("../../components/reuse/UiItems"),
      UiCheckbox: () => import("../../components/reuse/UiCheckbox"),
    },
    data() {
      return {
        fieldValues: []
      }
    },
    watch: {
      value(v) {
        Object.keys(v).forEach((el) => {
          const field = this.fieldValues.find(({fieldName}) => fieldName === el)
          if (!field) return
          field.value = v[el]
        })
      },
      fields(v) {
        this.fieldValues = this.setInnerFields(v)
      }
    },
    mounted() {
      this.fieldValues = this.setInnerFields(this.fields)
    },
    computed: {

    },
    methods: {
      inputHandler() {
        this.$emit('input', this.fieldValues.reduce((acc, el) => {
          const {value, fieldName} = el
          if (!acc[fieldName]) acc[fieldName] = value
          acc[fieldName] = value
          return acc
        }, {}))
      },
      setInnerFields(v) {
        return v && Object.keys(v)
            .map((fieldName) => {
              const type = v[fieldName]["type"]
              const defaultVariant = getDefaultFieldValue("default", type) || {}
              return {
                componentName: getComponentNameByFieldType(type),
                isRequired: v[fieldName]["required"],
                value: defaultVariant.defaultValue,
                label: `${defaultVariant.title} (${fieldName})`,
                fieldName
              }
            })
      },
    }
  }
</script>

