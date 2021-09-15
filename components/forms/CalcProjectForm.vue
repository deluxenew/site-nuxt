<template>
  <div class="calc-form">
    <h3 class="title">Рассчет стоимости проекта</h3>

    <single-text
      v-model="text"
      label="двавай"
      placeholder="вводим"
    />
  </div>
</template>

<script>
import SingleText from "../reuse/SingleText";

export default {
  name: "CalcProjectForm",
  components: {SingleText},
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
