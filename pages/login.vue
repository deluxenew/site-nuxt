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
    {{isAuth}}
  </div>
</template>

<script>
import AuthRegister from "../components/modals/AuthRegister";
import {visible} from "chalk";
export default {
  name: "login",
  components: {AuthRegister},
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
    async register () {
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
         AuthRegister,
      {},
        {
          height: 'auto',
          width: `${window.innerWidth - 16}px`,
          shiftY: 0.95,
          styles: "overflow: visible; border-radius: 8px;"
        }
        // modal_events
      )
    },
  },
}
</script>

<style scoped>

</style>
