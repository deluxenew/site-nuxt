<template lang="pug">
  div.grid.gap-2
    div.grid.gap-2
      div.grid.gap-2.break-all.w-100.p-2.bg-green-300(v-for="item in innerItems")
        | {{item}}

        div.flex
          ui-button(@click="remove(item)" text="Удалить")
          ui-button(@click="add" text="Добавить")
          ui-button(@click="edit(item)" text="Редактировать")
</template>

<script>
  import UiButton from "./UiButton";
  import UiInput from "./UiInput";

  export default {
    name: "UiItems",
    components: { UiInput, UiButton },
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        innerItems: []

      }
    },
    watch: {
      value(v) {
        this.innerItems = v
      }
    },
    methods: {
      add() {
        this.innerItems.push('1')
        this.$emit("add")
      },
      remove(item) {
        this.$emit("remove", item)
      },
      edit(item) {
        this.$emit("edit", item)
      },
      async save() {

      }
    }
  }
</script>

