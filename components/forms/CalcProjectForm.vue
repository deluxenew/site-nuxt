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
import UiInput from "../reuse/UiInput";

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
.calc-form {
  width: 100vw;
  padding: 32px;
}
.title {
  color: $default;
  font-weight: bold;
  display: block;
  font-family: $font;
  font-size: $h2;
  text-align: center;
  margin-bottom: 20px;
  margin-right: 20px;
}

.calc-form {
  height: 50%;
}
</style>
