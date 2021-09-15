<template>
  <div class="form-wrapper">
    <div class="title" v-if="title">{{title}}</div>

    <form :id="id" class="form" :action.prevent="sendData">
      <transition-group name="bounce">
        <div class="form-step"
             v-for="step in modelForm.steps"
             :key="step.id"
             :style="{animationDelay: `${step.stepNumber * 0.5}s`}"
        >
          <div class="number" v-if="step.showStepNumber">{{step.stepNumber}}</div>
          <div class="title" v-if="step.showTitle">{{step.title}}</div>
          <div class="form-row" v-for="(row, index) in step.rows" :key="index">
            <component
              v-for="component in row"
              v-model="component.value"
              v-bind="{ ...component }"
              :disabled="loading"
              :is="component.componentName"
              :key="component.id"
              @setError="setError"
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
    SingleText: () => import('~/components/reuse/SingleText.vue'),
    UiButton: () => import('~/components/reuse/UiButton.vue')
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
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
    modelForm: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    },
  },
  methods: {
    sendData() {

    },
    setError(v) {
      const idx = this.errorBox.findIndex(({fieldName}) => fieldName === v.fieldName)
      if (idx) this.errorBox.splice(idx, 1, v)
      else this.errorBox.push(v)
    },
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {

  .form-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 16px;
  }
}
</style>
