<template>
  <header class="header">
    <div ref="wrapper" class="header-wrapper">
      <header-item-component
        title="Контакты"
        alignTitle="flex-start"
        icon-name="contacts"
        item-name="contacts"
        :title-show="currentItem !== 'contacts'"
        :currentItem="currentItem"
        @click="toggleDropDown($event)"
      />

      <div class="center">
        <header-item-component
          title="Рассчитать стоимость"
          alignTitle="center"
          class="calc-price"
          icon-name="calculator"
          item-name="calc"
          :currentItem="currentItem"
          :title-show="currentItem !== 'calc'"
          @click="toggleDropDown($event)"
        />
      </div>

      <header-item-component
        title="Меню"
        alignTitle="flex-end"
        icon-name="burger"
        item-name="menu"
        :currentItem="currentItem"
        :title-show="currentItem !== 'menu'"
        @click="toggleDropDown($event)"
      />
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
  beforeDestroy() {
    this.unsubscribeClick()
  }
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

</style>
