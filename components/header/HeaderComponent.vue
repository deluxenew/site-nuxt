<template>
  <header class="overflow-visible z-50">
    <div ref="wrapper" class="header-wrapper">
      <transition name="bounce-fast" mode="out-in">
        <div v-if="!isAuth && topMenu.length">
          <header-item-component
            title="Вход / Регистрация"
            alignTitle="center"
            class="calc-price"
            icon-name="login"
            item-name="login"
            :currentItem="currentItem"
            :title-show="currentItem !== 'login'"
            @click="showAuthModal"
          />
        </div>
        <template v-else>
          <header-item-component
            :title="userName || ''"
            alignTitle="center"
            class="calc-price"
            icon-name="profile"
            item-name="profile"
            :arrow-down="true"
            :currentItem="currentItem"
            :title-show="currentItem !== 'profile'"
            @click="toggleDropDown($event)"
          />
        </template>
      </transition>
      <header-item-component
        v-for="item in topMenu"
        v-bind="item"
        class="calc-price"
        :class="{active: item.link === $route.path}"
        alignTitle="center"
        :title-show="currentItem !== item.itemName"
        :currentItem="currentItem"
        :key="item.itemName"
        @click="item.arrowDown ? toggleDropDown($event) : gotoLink(item.link)"
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
  import AuthRegisterModal from "~/components/modals/AuthRegisterModal";
  import HeaderItemComponent from "./items/HeaderItemComponent";
  import HeaderMenu from "./HeaderMenu";
  import UserMenu from "./UserMenu";
  import ContactsComponent from "./ContactsComponent";
  import CalcProjectForm from "~/components/forms/CalcProjectForm";

  export default {
    name: "HeaderComponent",
    components: {
      HeaderMenu,
      UserMenu,
      ContactsComponent,
      HeaderItemComponent,
      CalcProjectForm,
      DropDown: () => import('~/components/reuse/DropDown'),
      AuthRegisterModal
    },
    props: {
      topMenu: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentItem: '',
        dropdownHeight: 0,
        showDropDown: false,
        openModal: false
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
      route() {
        return this.$route
      },
      isAuth() {
        // return this.$auth && this.$auth.user
        return false
      },
      userName() {
        // return this.$auth && this.$auth.user && this.$auth.user.login
        return false
      },
      currentDropDown() {
        switch (this.currentItem) {
          case "contacts":
            return "ContactsComponent"
          case "login":
            return "CalcProjectForm"
          case "calc":
            return "CalcProjectForm"
          case "menu":
            return "HeaderMenu"
          case "profile":
            return "UserMenu"
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
      gotoLink(link) {
        this.$router.push(link)
      },
      showAuthModal() {
        const vm = this
        if (!this.openModal) {
          this.$modal.show(
              AuthRegisterModal,
              {},
              {
                classes: 'modal-custom',
                overlayTransition: 'modal-bg',
                adaptive: true,
                shiftY: 1,
                styles: "overflow: visible; border-radius: 8px; box-shadow: none"
              },
              {
                'before-open': () => vm.openModal = true,
                'before-close': () => vm.openModal = false,
              }
          )
        }
      },
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
