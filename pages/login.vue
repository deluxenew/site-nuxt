<template>
  <div>

  </div>
</template>

<script>
import AuthRegisterModal from "COMPONENTS/modals/AuthRegisterModal";

export default {
  name: "login",
  components: {
    AuthRegisterModal
  },
  data() {
    return {

    }
  },
  computed: {
    isAuth() {
      return this.$store.getters["IS_AUTH"]
    },
  },
  methods: {

    async logoutAll() {
      await this.$store.dispatch('logoutAll')
    },
    login() {
      this.$store.dispatch("SIGN_IN_USER_ACTION", {
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

  },
}
</script>

