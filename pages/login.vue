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
    {{isAuth}}
  </div>
</template>

<script>
export default {
  name: "login",
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
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
    }
  },
}
</script>

<style scoped>

</style>
