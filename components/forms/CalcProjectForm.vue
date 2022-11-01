<template>
  <div class="calc-form">
    <h3 class="title">Рассчет стоимости проекта</h3>

    <ui-input
      v-model="text"
      label="двавай"
      placeholder="вводим"
    />
  </div>
</template>

<script>
import UiInput from "COMPONENTS/reuse/UiInput";

export default {
  name: "CalcProjectForm",
  components: {UiInput},
  data() {
    return {
      text: '',
    }
  },
}
</script>

<style lang="scss" scoped>


</style>
