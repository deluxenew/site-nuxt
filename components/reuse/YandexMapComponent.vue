<template>
  <yandex-map
    class="pt-5"
    :coords="[55.747019,37.620546]"
    zoom="17"
    style="width: 100%; height: 300px;"
    :cluster-options="{
        1: {clusterDisableClickZoom: true}
       }"
    :behaviors="['ruler']"
    :controls="['trafficControl']"
    map-type="map"
    :settings="settings">
    <ymap-marker
      markerId="1"
      marker-type="placemark"
      :coords="[55.747019,37.620546]"
      hint-content="Hint content 1"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
      :icon="{color: 'green', glyph: 'Factory'}"
      cluster-name="1"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
  const settings = {
    apiKey: '421059e0-77b3-486f-adee-ba1f6780d773',
    lang: 'ru_RU',
    version: '2.1'
  }

  export default {
    name: "YandexMapComponent",
    data() {
      return {
        settings: settings,
      }
    },
  }
</script>

