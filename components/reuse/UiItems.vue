<template lang="pug">
div
  div
    div(v-for="item in innerItems")
      | {{item}}
      div(@click="remove(item)")
        | Удалить
    div(@click="add")
      | Добавить
</template>

<script>
  export default {
    name: "UiItems",
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
      }
    }
  }
</script>

