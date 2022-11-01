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

import YandexMapComponent from "COMPONENTS/reuse/YandexMapComponent";
import { contacts } from "CONSTANTS/contacts";

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
