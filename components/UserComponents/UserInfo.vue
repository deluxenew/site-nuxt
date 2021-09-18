<template>
  <div class="user-info">
    <div class="row align-center space-between" v-for="item in Object.keys(user)">
      <div
        class="row user-row space-between align-center"
        :class="item"
        :style="item === 'avatar' ? style : {}"
      >
        <div class="title">
          {{user[item].title}}:
        </div>

        <div class="value">
          {{user[item].value}}
        </div>
      </div>

      <div class="edit">
        <fa-icon :icon="['fac', 'edit']"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        avatar: {
          title: 'Фото',
          value: 'https://sun1-20.userapi.com/s/v1/ig2/P4HfSYWT4NfaHQRWGoMI3wHlkmUTV2zh5xE32UK5Rh3wnYsC3G7xEPIy4gBJpuk_pC10swprIhLVw_KByBSb7ENf.jpg?size=200x299&quality=96&crop=0,74,576,863&ava=1',
        },
        name: {
          title: 'Имя',
          value: 'Человек Богемский nhf nf nf nf f nf fn f nf f nf n',
        },
        login: {
          title: 'Почта',
          value: 'Почта@почта.почт',
        },
        password:  {
          title: 'Пароль',
          value: '********',
        },
        about: {
          title: 'О себе',
          value: 'Ну вот я такой-то такой-то, может вовсе и не такой, но скорее такой, чем не такой, хотя и сам не знаю.',
        }
      },
    }
  },
  computed: {
    style() {
      return {
        backgroundImage: `url(${this.user.avatar.value})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-info {
    display: flex;
    flex-direction: column;
    .row + .row {
      padding-top: 8px;
    }
    .user-row {
      width: calc(100% - 40px);

      &.avatar {
        padding: 8px;
        align-items: flex-start;
        height: 200px;
        width: 200px;
        background-position: center top;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 8px;
        box-shadow: inset 0 0 20px $gray;

        .title, .value {
          display: none;
        }

        @media (max-width: 800px) {
          width: 100px;
          height: 100px;
        }
      }
    }

    .title {
      flex: 0 0 80px;
    }

    .value {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      padding: 5px;
      text-overflow: ellipsis;
    }

    .edit {
      margin-left: 8px;
      flex: 0 0 32px;
      height: 32px;
      cursor: pointer;

      .fa-edit {
        path {
          transition: $trs;
          fill: $default;
          &:last-child {
            fill: $gray;
          }
        }
      }

      &:hover:not(&.disabled) {
        .fa-edit {
          path {
            fill: $green;
            &:last-child {
              fill: $gray;
            }
          }
        }
      }
    }
  }
</style>
