<template lang="pug">
  div
    my-upload(
      v-show="show"
      :modelValue="show"
      :width="250"
      :height="250"
      :params="params"
      :headers="headers"
      url="/upload"
      img-format="png"
      @cropSuccess="cropSuccess"
      @cropUploadSuccess="cropUploadSuccess"
      @cropUploadFail="cropUploadFail"
      @update:modelValue="toggleShow"
    )
    div.flex
      ui-button(
        @click="toggleShow"
      )
</template>

<script>
  import myUpload from 'vue-image-crop-upload';
  import UiButton from "COMPONENTS/reuse/UiButton";

  export default {
    name: "UiImageCrop",
    components: { UiButton, myUpload },
    props: {
      value: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        params: {
          token: '12321',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        show: false
      }
    },
    computed: {
      imageUrlBase64: {
        get() {
          return this.value
        },
        set(v) {
          this.$emit("input", v)
        }
      },
    },
    methods: {
      toggleShow() {
        this.show = !this.show
      },
      cropSuccess(v) {
        this.imageUrlBase64 = v
        this.show = false
      },
      cropUploadSuccess(v) {
        console.log(v);
        this.show = false
      },
      cropUploadFail(v) {
        console.log(v);
      }
    }
  }
</script>

<style scoped>

</style>
