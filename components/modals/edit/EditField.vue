<template>
  <modal-wrapper
    :defaultWidth="500"
    :defaultHeight="300"
    :hideFooter="true"
    :expanded="expanded"
    @close="$emit('close')"
  >
    <template slot="modal-header">
      <div class="title">{{ title }}</div>
    </template>

    <template slot="modal-body">
      <div class="row">
        <UiInput
          v-model="model"
          v-bind="$utils.formFieldByName(fieldName)"
          :label="fieldLabel"
        />
      </div>

      <div class="row buttons">
        <ui-button
          :loading="isLoading"
          text="OK"
          @click="changeFn(fieldName, model)"
        />
        <ui-button
          :loading="isLoading"
          text="Отмена"
          @click="$emit('close')"
        />
      </div>
    </template>

  </modal-wrapper>
</template>

<script>

  export default {
    name: "EditField",
    props: {
      fieldName: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      fieldLabel: {
        type: String,
        default: '',
      },
      value: {
        type: String, Number,
        default: '',
      },
      expanded: {
        type: Boolean,
        default: false,
      },
      changeFn: {
        type: Function,
        default: () => {
        }
      }
    },
    components: {
      ModalWrapper: () => import('COMPONENTS/modals/ModalWrapper'),
      UiButton: () => import('COMPONENTS/reuse/UiButton'),
      UiInput: () => import('COMPONENTS/reuse/UiInput'),
    },
    data() {
      return {
        model: this.value
      }
    },
    computed: {
      isLoading() {
        return this.$store.getters["IS_LOADING"]
      },
    },
    methods: {}
  }
</script>
