<template>
  <div class="user-info" v-if="profile">
    <div class="row align-center space-between" v-for="item in Object.keys(user)">
      <div
        class="row user-row space-between align-center"
        :class="item"
        :style="item === 'avatar' ? style : {}"
      >
        <div class="text-sm">
          {{user[item].title}}:
        </div>

        <div class="value">
          {{profile && profile[item] ? profile[item] : ''}}
        </div>
      </div>

      <div class="edit" @click="editField(item)">
        <fa-icon :icon="['fac', 'edit']"/>
      </div>
    </div>

  </div>
</template>

<script>
  import editField from 'COMPONENTS/modals/edit/EditField'

  export default {
    name: "UserInfo",
    components: {
      editField
    },
    data: function () {
      return {
        user: {
          avatar: {
            title: 'Фото',
            value: 'https://sun1-20.userapi.com/s/v1/ig2/P4HfSYWT4NfaHQRWGoMI3wHlkmUTV2zh5xE32UK5Rh3wnYsC3G7xEPIy4gBJpuk_pC10swprIhLVw_KByBSb7ENf.jpg?size=200x299&quality=96&crop=0,74,576,863&ava=1',
          },
          name: {
            title: 'Имя',
          },
          login: {
            title: 'Почта',
          },
          password: {
            title: 'Пароль',
            value: '********',
          },
          about: {
            title: 'О себе',
          }
        },
      }
    },
    computed: {
      profile() {
        return this.$store.getters["USER"]
      },
      style() {
        return {
          backgroundImage: `url(${this.user.avatar.value})`
        }
      }
    },
    methods: {
      editField(item) {
        const vm = this
        if (!this.openModal) {
          this.$modal.show(
              editField,
              {
                fieldName: item,
                title: `Редактирование поля \"${this.user[item].title}\"`,
                fieldLabel: this.user[item].title,
                value: this.user[item].value,
                expanded: false,
                changeFn: this.setNewValue.bind(this)
              },
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
      setNewValue(field, value) {
        console.log(field, value)
      }
    },
  }
</script>
