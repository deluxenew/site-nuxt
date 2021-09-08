<template>
  <div>
    <button @click="login">
      login
    </button>
    <button @click="logout">
      logout
    </button>
    <button @click="register">
      register
    </button>
    <button @click="logoutAll">
      logoutAll
    </button>
    <button @click="showModal">
      showModal
    </button>
    {{ isAuth }}
  </div>
</template>

<script>
import AuthRegisterModal from "../components/modals/AuthRegisterModal";

export default {
  name: "login",
  components: {AuthRegisterModal},
  data() {
    return {

    }
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
    },
    async logoutAll() {
      await this.$store.dispatch('auth/logoutAll')
    },
    login() {
      this.$store.dispatch("auth/login", {
        login: 'deluxenew',
        password: 'scaner12'
      });
    },
    async register() {
      try {
        await this.$axios.post('/api/auth/user/register', {
          login: 'deluxenew',
          password: 'scaner12'
        })
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    showModal() {
      this.$modal.show(
        AuthRegisterModal,
        {},
        {
          classes: 'modal-custom',
          transition: 'modal',
          overlayTransition: 'modal-bg',
          adaptive: true,
          height: `${window.innerHeight - 120}px`,
          width: `${window.innerWidth}px`,
          shiftY: 1,
          styles: "overflow: visible; border-radius: 8px; box-shadow: none"
        },
        {}
      )
    },
  },
}
</script>

<style scoped>

</style>
