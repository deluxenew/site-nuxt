<template>
  <header class="header">
    <div ref="wrapper" class="header-wrapper">
      <header-item-component
        title="Контакты"
        alignTitle="flex-start"
        icon-name="contacts"
        item-name="contacts"
        :title-show="currentItem !== 'contacts'"
        @click="toggleDropDown($event)"
      >
        <transition name="bounce">
          <fa-icon v-if="currentItem === 'contacts'" class="icon-close icon-close-contacts"
                   :icon="['fac', 'close']"/>
        </transition>
      </header-item-component>

      <div class="center">
        <header-item-component
          title="Рассчитать стоимость"
          alignTitle="center"
          class="calc-price"
          icon-name="calculator"
          item-name="calc"
          :title-show="currentItem !== 'calc'"
          @click="toggleDropDown($event)"
        >
          <div class="arrow-button">
            <transition name="bounce">
              <fa-icon v-if="currentItem !== 'calc'" class="icon" :icon="['fac', 'chevronDown']"/>
            </transition>

            <transition name="bounce">
              <fa-icon v-if="currentItem === 'calc'" class="icon-close icon-close-calc-price" :icon="['fac', 'close']"/>
            </transition>

            <fa-icon class="icon-bottom" :icon="['fac', 'arrowHeader']"/>
          </div>
        </header-item-component>
      </div>

      <header-item-component
        title="Меню"
        alignTitle="flex-end"
        icon-name="burger"
        item-name="menu"
        :title-show="currentItem !== 'menu'"
        @click="toggleDropDown($event)"
      >
        <transition name="bounce">
          <fa-icon v-if="currentItem === 'menu'" class="icon-close icon-close-menu" :icon="['fac', 'close']"/>
        </transition>
      </header-item-component>
    </div>

    <drop-down
      ref="dropdown"
      animationName="slide-top"
      :show="showDropDown"
      :customStyle="customStyleDropDown"
    >
      <component
        :is="currentDropDown"
        @close="currentItem = ''"
      />
    </drop-down>
  </header>
</template>

<script>
import DropDown from "../reuse/DropDown";
import CalcProjectForm from "../forms/CalcProjectForm";
import HeaderItemComponent from "./items/HeaderItemComponent";
import ContactsComponent from "./ContactsComponent";
import HeaderMenu from "./HeaderMenu";

export default {
  name: "HeaderWrapper",
  components: {
    HeaderMenu,
    ContactsComponent,
    HeaderItemComponent,
    CalcProjectForm,
    DropDown
  },
  data() {
    return {
      currentItem: '',
      dropdownHeight: 0,
      showDropDown: false,
    }
  },
  watch: {
    currentItem(v) {
      if (v) {
        this.dropdownHeight = window.innerHeight - this.$refs.wrapper.clientHeight
        this.showDropDown = false
        const vm = this
        setTimeout(() => {
          vm.showDropDown = true
        }, 100)
        this.subscribeClick()
      } else {
        this.unsubscribeClick()
        this.showDropDown = false
      }
    }
  },
  computed: {
    currentDropDown() {
      switch (this.currentItem) {
        case "contacts": return "ContactsComponent"
        case "calc": return "CalcProjectForm"
        case "menu": return "HeaderMenu"
      }
    },
    customStyleDropDown() {
      return {
        top: this.$refs.wrapper && this.$refs.wrapper.clientHeight || 0,
        height: this.dropdownHeight || 0,
        right: this.currentItem !== "menu" ? "auto" : 0,
        left: this.currentItem !== "menu" ? 0 : "auto"
      }
    }
  },
  methods: {
    toggleDropDown(v) {
      this.currentItem !== v ? this.currentItem = v : this.currentItem = ""
    },
    onClick(v) {
      if (!this.$refs.dropdown.$el.contains(v.target) && this.showDropDown === true) this.currentItem = ""
    },
    subscribeClick() {
      window.addEventListener('click', this.onClick)
    },
    unsubscribeClick() {
      window.removeEventListener('click', this.onClick)
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
  padding: 0 24px;
  border-bottom: 3px solid $green;
  transition: $trs;
  color: $default;
  font-size: 20px;
  line-height: 1;
  font-weight: 500;
  background-color: $white;
  z-index: 1;
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

  &:hover {
    path {
      fill: $green;
    }
  }
}
.center {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 250px;
  height: 54px;
  left: calc(50% - 125px);
}

.calc-price {
  width: 250px;

  .title {
    padding: 16px 0;
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

.arrow-button {
  position: absolute;
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

.icon-close-contacts {
  left: 24px;
}

.icon-close-calc-price {
  left: calc(50% - 9px);
  bottom: -3px;
}

.icon-close-menu {
  right: 24px;
}
</style>
