<template>
  <header class="header">
    <div ref="wrapper" class="header-wrapper">
      <div class="contacts header-item" @click="toggleDropDown('contacts')">
        <transition name="bounce">
          <div class="title" v-if="currentDropDown !== 'contacts'">
            <div class="desktop">
              Контакты
            </div>

            <div class="mobile">
              <fa-icon :icon="['fac', 'contacts']"/>
            </div>
          </div>
        </transition>

        <transition name="bounce">
          <fa-icon v-if="currentDropDown === 'contacts'" class="icon-close" :icon="['fac', 'close']"/>
        </transition>
      </div>

      <div class="calc-price header-item" @click="toggleDropDown('calc')">
        <transition name="bounce">
          <div class="title" v-if="currentDropDown !== 'calc'">
            <div class="desktop">
              Рассчитать стоимость
            </div>
            <div class="mobile">
              <fa-icon :icon="['fac', 'calculator']"/>
            </div>
          </div>
        </transition>

        <div class="arrow-button">
          <transition name="bounce">
            <fa-icon v-if="currentDropDown !== 'calc'" class="icon" :icon="['fac', 'chevronDown']"/>
          </transition>

          <transition name="bounce">
            <fa-icon v-if="currentDropDown === 'calc'" class="icon-close" :icon="['fac', 'close']"/>
          </transition>

          <fa-icon class="icon-bottom" :icon="['fac', 'arrowHeader']"/>
        </div>
      </div>

      <div class="menu header-item" @click="toggleDropDown('menu')">
        <transition name="bounce">
          <div class="title" v-if="currentDropDown !== 'menu'">
            <div class="desktop">
              Меню
            </div>

            <div class="mobile">
              <fa-icon class="burger" :icon="['fac', 'burger']"/>
            </div>
          </div>
        </transition>

        <transition name="bounce">
          <fa-icon v-if="currentDropDown === 'menu'" class="icon-close" :icon="['fac', 'close']"/>
        </transition>
      </div>
    </div>

    <transition name="slide-top">
      <drop-down
        v-if="currentDropDown === 'calc'"
        :customStyle="{
          top: $refs.wrapper.clientHeight,
          height: dropdownHeight
        }"
      >
        <calc-project-form/>
      </drop-down>
    </transition>
  </header>
</template>

<script>
import DropDown from "../reuse/DropDown";
import CalcProjectForm from "../forms/CalcProjectForm";

export default {
  name: "HeaderWrapper",
  components: {CalcProjectForm, DropDown},
  data() {
    return {
      currentDropDown: '',
      dropdownHeight: 0,
    }
  },
  watch: {
    currentDropDown(v) {
      if (v) {
        this.dropdownHeight = window.innerHeight - this.$refs.wrapper.clientHeight
      }
    }
  },
  computed: {

  },
  methods: {
    toggleDropDown(v) {
      this.currentDropDown !== v ? this.currentDropDown = v : this.currentDropDown = ""
    }
  },
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



.desktop {
  text-align: center;
  @media (max-width: 640px) {
    display: none;
  }
}

.mobile {
  width: 21px;
  height: 23px;
  display: flex;
  justify-content: center;
  text-align: center;
  @media (min-width: 641px) {
    display: none;
  }
}

.icon-close {
  width: 18px;
  height: 18px;
  position: absolute;
  z-index: 2;
  top: calc(50% - 9px);

  path {
    transition: $trs;
  }
}

.header-item {
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  cursor: pointer;
  color: $default;
  transition: $trs;

  .title {
    display: flex;
    justify-content: center;
  }

  .arrow-button {
    position: relative;
    text-align: center;
    width: 90px;
    z-index: 1;
    height: 16px;
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

.contacts {
  .icon-close {
    left: 24px;
  }
}

.calc-price {
  position: absolute;
  width: 250px;
  bottom: 0;
  left: calc(50% - 125px);

  .icon-close {
    left: calc(50% - 9px);
    bottom: -3px;
  }
}

.menu {
  .icon-close {
    right: 24px;
  }
  .burger {
    height: 16px;
  }
}
</style>
