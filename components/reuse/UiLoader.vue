<template>
  <div class='cssload-loader' :style="style">
    <div class='cssload-inner cssload-one'></div>
    <div class='cssload-inner cssload-two'></div>
    <div class='cssload-inner cssload-three'></div>
  </div>
</template>

<script>
export default {
  name: "UiLoader",
  props: {
    width: {
      type: Number,
      default: 32
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        width: this.fullWidth ? '100%' : this.width + 'px',
        height: this.fullWidth ? '100%' : this.width + 'px'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.cssload-loader {
  position: relative;
  perspective: 780px;
}

.cssload-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
&.cssload-one {
   left: 0%;
   top: 0%;
   animation: cssload-rotate-one 1.15s linear infinite;
   -o-animation: cssload-rotate-one 1.15s linear infinite;
   -ms-animation: cssload-rotate-one 1.15s linear infinite;
   -webkit-animation: cssload-rotate-one 1.15s linear infinite;
   -moz-animation: cssload-rotate-one 1.15s linear infinite;
   border-bottom: 3px solid $green;
 }
&.cssload-two {
   right: 0%;
   top: 0%;
   animation: cssload-rotate-two 1.15s linear infinite;
   -o-animation: cssload-rotate-two 1.15s linear infinite;
   -ms-animation: cssload-rotate-two 1.15s linear infinite;
   -webkit-animation: cssload-rotate-two 1.15s linear infinite;
   -moz-animation: cssload-rotate-two 1.15s linear infinite;
   border-right: 3px solid $gray;
 }
&.cssload-three {
   right: 0%;
   bottom: 0%;
   animation: cssload-rotate-three 1.15s linear infinite;
   -o-animation: cssload-rotate-three 1.15s linear infinite;
   -ms-animation: cssload-rotate-three 1.15s linear infinite;
   -webkit-animation: cssload-rotate-three 1.15s linear infinite;
   -moz-animation: cssload-rotate-three 1.15s linear infinite;
   border-top: 3px solid $default;
 }

}
@keyframes cssload-rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-o-keyframes cssload-rotate-one {
  0% {
    -o-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -o-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-ms-keyframes cssload-rotate-one {
  0% {
    -ms-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -ms-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-webkit-keyframes cssload-rotate-one {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-moz-keyframes cssload-rotate-one {
  0% {
    -moz-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -moz-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes cssload-rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@-o-keyframes cssload-rotate-two {
  0% {
    -o-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    -o-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@-ms-keyframes cssload-rotate-two {
  0% {
    -ms-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    -ms-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@-webkit-keyframes cssload-rotate-two {
  0% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@-moz-keyframes cssload-rotate-two {
  0% {
    -moz-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    -moz-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes cssload-rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

@-o-keyframes cssload-rotate-three {
  0% {
    -o-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    -o-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

@-ms-keyframes cssload-rotate-three {
  0% {
    -ms-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    -ms-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

@-webkit-keyframes cssload-rotate-three {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

@-moz-keyframes cssload-rotate-three {
  0% {
    -moz-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    -moz-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
