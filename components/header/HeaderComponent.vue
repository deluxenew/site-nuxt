<template>
  <header>
    <div ref="wrapper" class="header-wrapper">
      <div class="header-contacts">
        Контакты
      </div>
      <div class="calc-price" @click="calcOpen = !calcOpen">
        <transition name="bounce">
          <div v-if="!calcOpen">Рассчитать стоимость</div>
        </transition>
        <div class="arrow-button">
          <transition name="bounce">
            <svg v-if="!calcOpen" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 7">
              <path
                d="M20.833 1.581l-9.57 5.365c-.201.113-.507-.039-.75-.335-.244.305-.556.464-.76.35L.182 1.596C-.059 1.46-.052 1.007.199.583.449.159.848-.075 1.09.06l9.405 5.272L19.926.046c.241-.136.64.098.891.522.251.424.258.878.016 1.013z"
                fill-rule="evenodd">
              </path>
            </svg>
          </transition>
          <transition name="bounce">
            <svg v-if="calcOpen" class="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
              <path
                d="M9.877 8.506l6.84 6.837a.972.972 0 0 1-.689 1.66.97.97 0 0 1-.688-.285L8.501 9.882l-6.839 6.836a.972.972 0 0 1-1.377 0 .973.973 0 0 1 0-1.376l6.839-6.836L.285 1.671A.973.973 0 1 1 1.662.295l6.839 6.836L15.34.294a.974.974 0 0 1 1.377 1.376l-6.84 6.836z"
                fill-rule="evenodd">
              </path>
            </svg>
          </transition>
          <svg class="icon-bottom" xmlns="http://www.w3.org/2000/svg" width="91" height="24" viewBox="0 0 91 24">
            <g fill-rule="evenodd">
              <path d="M0 4l44 20L91 4H0z">
              </path>
              <path d="M91 0L44 20 0 0h91z">
              </path>
            </g>
          </svg>
        </div>
      </div>
      <div class="header-menu">
        Меню
      </div>

    </div>
    <transition name="slide-top">
      <div v-if="calcOpen" class="dropdown"
           :style="{top: `${$refs.wrapper.clientHeight}px`, height: `${dropdownHeight}px`}">
        <div class="calc-form">
          <h3 class="title">Рассчет стоимости проекта</h3>
          <single-text
            v-model="text"
            label="двавай"
            placeholder="вводим"
          />
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import SingleText from "../reuse/SingleText";
export default {
  name: "HeaderWrapper",
  components: {SingleText},
  data() {
    return {
      calcOpen: false,
      dropdownHeight: 0,
      text: '',
    }
  },
  watch: {
    calcOpen(v) {
      if (v) {
        this.dropdownHeight = window.innerHeight - this.$refs.wrapper.clientHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 3px solid $green;
  transition: $trs;
  color: $default;
  font-size: 20px;
  line-height: 1;
  font-weight: 500;
  background-color: $white;
  z-index: 1;
}

.header-contacts {
  display: block;
}

.dropdown {
  position: absolute;
  left: 0;
  width: 100vw;
  padding: 24px;
  z-index: 0;

  .title {
    color: $default;
    font-weight: 800;
    display: block;
    font-family: $font;
    font-size: 4em;
    text-align: center;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  .calc-form {
    height: 100%;
  }
}

.calc-price {
  width: 250px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  text-align: center;
  left: calc(50% - 125px);
  cursor: pointer;
  color: $default;
  transition: $trs;

  .arrow-button {
    position: relative;
    text-align: center;
    width: 90px;
    z-index: 1;
    height: 20px;
    bottom: 0;
    left: calc(50% - 45px);

    .icon {
      width: 30px;
      height: 10px;
      position: absolute;
      z-index: 2;
      bottom: -3px;
      left: calc(50% - 15px);

      path {
        transition: $trs;
      }
    }

    .icon-close {
      width: 18px;
      height: 18px;
      position: absolute;
      z-index: 2;
      left: calc(50% - 9px);
      bottom: -3px;

      path {
        transition: $trs;
      }
    }

    .icon-bottom {
      position: absolute;
      left: calc(50% - 45px);
      bottom: -20px;
      z-index: 1;

      path {
        fill: $green;

        &:last-child {
          fill: $white;
        }
      }
    }
  }

  &:hover {
    color: $green;
    text-shadow: 1px 1px 5px rgba($default, .1);

    .arrow-button {
      .icon, .icon-close {
        path {
          fill: $green;
        }
      }
    }
  }
}
</style>
