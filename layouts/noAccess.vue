<template>
  <div class="page">

  </div>
</template>

<script>


    export default {
        name: 'noAccess',
        head() {
            return {
                title: 'У Вас нет доступа к этой странице',
                meta: [
                    {
                        name: 'viewport',
                        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
                    }
                ]
            }
        },
        data: () => ({
            menuVisible: false
        }),
        computed: {
            isAuth() {
                return this.$auth.loggedIn;
            }
        },
        methods: {
            menuToggle() {
                this.menuVisible = !this.menuVisible;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>

