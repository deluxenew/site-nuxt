<template lang="pug">
div
  | {{fieldValues}}
  div(v-for="field in fieldValues")
    component(
      :is="field.componentName"
      v-bind="field"
    )

</template>

<script>
  import {getComponentNameByFieldType, getDefaultFieldValue} from "../../constants/adminItems"
  export default {
    name: "CategoryItemFields",
    props: {
      fields: {
        type: Object,
        default: () => {}
      }
    },
    components: {
      UiInput: () => import("../../components/reuse/UiInput"),
      UiItems: () => import("../../components/reuse/UiItems")
    },
    data() {
      return {
        fieldValues: []
      }
    },
    watch: {
      fields(v) {
        this.fieldValues = this.setInnerFields(v)
      }
    },
    mounted() {
      this.setInnerFields(this.fields)
    },
    computed: {

    },
    methods: {
      setInnerFields(v) {
        return v && Object.keys(v)
            .map((fieldName) => {
              const type = v[fieldName]["type"]
              const defaultVariant = getDefaultFieldValue("default", type) || {}
              return {
                componentName: getComponentNameByFieldType(type),
                isRequired: v[fieldName]["required"],
                value: defaultVariant.defaultValue,
                label: defaultVariant.title
              }
            })
      }
    }
  }
</script>

