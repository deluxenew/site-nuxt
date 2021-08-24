<template>
  <div class="contacts">
    <div class="title">
      Контакты
    </div>
    <div class="contact-item">
      <fa-icon class="phone-icon" :icon="['fac', 'phoneMini']"/>
      <span class="text">{{ contacts.phone }}</span>
    </div>

    <div class="contact-item">
      <fa-icon class="email-icon" :icon="['fac', 'eMail']"/>
      <span class="text">{{ contacts.email }}</span>
    </div>

    <div class="contact-item">
      <fa-icon class="address-icon" :icon="['fac', 'address']"/>
      <span class="text">{{ contacts.address }}</span>
    </div>

    <yandex-map-component />
  </div>
</template>

<script>

import YandexMapComponent from "../reuse/YandexMapComponent";
import { contacts } from "../../constants/contacts";

export default {
  name: "ContactsComponent",
  components: {YandexMapComponent},
  data() {
    return {
      contacts
    }
  }
}
</script>

<style lang="scss" scoped>
.contacts {
  padding: 32px;
  min-width: 50vw;

  .title {
    font-size: 32px;
    line-height: normal;
    margin-bottom: 40px;
    font-weight: 500;
    text-align: center;
    color: $default;
    width: 100%;
    min-width: 512px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 500;

    .text {
      padding-left: 24px;
    }

    .phone-icon {
      width: 25px;
      height: 40px;
      path {
        fill: $gray;
      }
    }

    .email-icon {
      width: 25px;

      path {
        fill: $gray;
      }
    }

    .address-icon {
      width: 25px;

      path {
        fill: $gray;
      }
    }
  }
  .contact-item + .contact-item {
    padding-top: 24px;
  }
}

</style>
