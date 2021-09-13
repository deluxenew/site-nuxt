<template>
  <div class="form-wrapper">
    <form :id="id" class="form" :action.prevent="sendData">
      <transition-group name="bounce">
        <div class="form-step"
             v-for="step in objectForm.steps"
             :key="step.id"
             :style="{animationDelay: `${step.stepNumber * 0.5}s`}"
        >
          <div class="number" v-if="step.showStepNumber">{{step.stepNumber}}</div>
          <div class="title" v-if="step.showTitle">{{step.title}}</div>
          <div class="form-row" v-for="(row, index) in step.rows" :key="index">
            <component
              v-for="component in row"
              :key="component.id"
              :is="component.componentName"
              v-bind="{ ...component }"
            />
          </div>
        </div>
      </transition-group>
    </form>
  </div>
</template>

<script>
export default {
  name: "UiForm",
  components: {
    SingleText: () => import('~/components/reuse/SingleText.vue')
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    objectForm: {
      type: Object,
      default: () => ({
        steps: [{
          id: 'required',
          showStepNumber: false,
          stepNumber: 1,
          showTitle: false,
          title: 'Обязательные поля',
          rows: [
            [{ id: 'login' }],
          ],
        }],
        buttons: [
          [
            { id: 'signIn', text: 'Войти', iconName: 'login' },
          ]
        ]
      }),
      required: true
    },
    sendFunction: {
      type: Function,
      default: () => {},
      required: true
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      errorBox: [],
    }
  },
  computed: {
    steps() {
      return this.objectForm && Object.keys(this.objectForm.steps)
    },
  },
  methods: {
    sendData() {

    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {

}
</style>
