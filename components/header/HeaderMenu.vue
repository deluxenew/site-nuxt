<template>
  <div class="top-menu">
    <div class="title">
      Главное меню
    </div>

    <div class="links">
      <ul class="links__list" style="--item-total:6">
        <li v-for="item in items"
            :key="item.id"
            class="links__item"
            :style="`--item-count:${item.id}`"
        >
          <nuxt-link
            :to="item.link"
            class="links__link"
            @click.native="$emit('close'), event => event.preventDefault()"
          >
            <svg v-if="item.id === 2" class="pro" height="512" viewBox="0 0 58 58" width="512" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" fill="none" fill-rule="evenodd">
                <path id="Path" d="m40 54-10.963.5-11.037-.5 3-5 8.037-.5 7.963.5z" fill="#3f5c6c"/>
                <path id="Path"
                      d="m46 56c-.0032948 1.1032019-.8967981 1.9967052-2 2h-30c-1.1011688-.0081672-1.9918328-.8988312-2-2 .0032948-1.1032019.8967981-1.9967052 2-2h30c1.1011688.0081672 1.9918328.8988312 2 2z"
                      fill="#547580"/>
                <path id="Path"
                      d="m58 43.5v3.5c-.0032948 1.1032019-.8967981 1.9967052-2 2h-54c-1.10320187-.0032948-1.9967052-.8967981-2-2v-3.5z"
                      fill="#547580"/>
                <path id="Path"
                      d="m58 7v37h-58v-37c.0032948-1.10320187.89679813-1.9967052 2-2h54c1.1032019.0032948 1.9967052.89679813 2 2z"
                      fill="#7f7f7f"/>
                <path id="Path" d="m54 3v5h-50v-5c0-1.65685425 1.34314575-3 3-3h44c1.6568542 0 3 1.34314575 3 3z" fill="#6f6f6f"/>
                <path id="Path" d="m19 8v32h-12c-1.65685425 0-3-1.3431458-3-3v-29z" fill="#bdc3c7"/>
                <path id="Path" d="m54 8v29c0 1.6568542-1.3431458 3-3 3h-32v-32z" fill="#fff"/>
                <path id="Path"
                      d="m48 23.72v6.21c-.0033531.7824339-.459575 1.4921123-1.17 1.82l-8.96 4.07c-.2715781.1282755-.5698172.1899802-.87.18v-12l1.26 1.88c.4362415.6590205 1.2680053.9321369 2.01.66l7.6-2.76c.05-.02.09-.04.13-.06z"
                      fill="#4dce00"/>
                <path id="Path"
                      d="m37 24v12c-.2948226-.010354-.584276-.081866-.85-.21l-10.04-5.02c-.6796577-.33773-1.1095973-1.031056-1.11-1.79v-8.84l6-5.14z"
                      fill="#4dce00"/>
                <path id="Path"
                      d="m29 32.22v-5.6c-.002433-.3483719.1766148-.672901.4726128-.8566239.2959979-.1837229.6662778-.2001558.9773872-.0433761l1.44.73c.6796577.33773 1.1095973 1.031056 1.11 1.79v5.98"
                      fill="#7f7f7f"/>
                <circle id="Oval" cx="8" cy="4" fill="#65ddb9" r="1"/>
                <circle id="Oval" cx="12" cy="4" fill="#f3d55b" r="1"/>
                <circle id="Oval" cx="16" cy="4" fill="#ff5364" r="1"/>

                <path id="Path"
                      fill="#7f8284"
                      d="m13 13h-5c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h5c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1z"/>
                <rect id="Rectangle" height="4" rx="1" width="4" x="8" y="16" fill="#7f8284"/>
                <rect id="Rectangle" height="4" rx="1" width="4" x="8" y="24" fill="#7f8284"/>
                <rect id="Rectangle" height="4" rx="1" width="4" x="8" y="32" fill="#7f8284"/>

                <path id="Path"
                      d="m37.76 25.88-1.26-1.88-5.8-8.953 9.97-2.977c.8028138-.2188961 1.6575248.0792589 2.15.75l5.85 8.34c.301164.4147525.4005253.9426755.2707493 1.4385359-.129776.4958605-.4750181.9074224-.9407493 1.1214641-.04.02-.08.04-.13.06l-9.054 3.93z"
                      fill="#7f7f7f"/>
                <path id="Path"
                      d="m38.261 27.88c-.3338999.0004964-.6460179-.1656914-.832-.443l-6.635-9.943-5.144 4.406c-.2690133.2485449-.6523779.3301409-.9992902.2126907-.3469124-.1174502-.6018621-.415153-.66456-.7760016-.0626979-.3608485.0768884-.7271025.3638502-.9546891l6-5.14c.2166508-.1863967.5027025-.2711873.7859345-.2329643.2832319.0382229.5365745.1958062.6960655.4329643l7.259 10.878c.3069815.4589663.1838733 1.0798794-.275 1.387-.1634915.1119641-.3568464.1722351-.555.173z"
                      fill="#6f6f6f"/>
              </g>
            </svg>
            <fa-icon v-else class="links__icon" :icon="['fac', item.iconName]"/>
            <span class="links__text">{{item.title}}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {topMenu} from "../../constants/topMenu";

export default {
  name: "HeaderMenu",
  props: {},
  data() {
    return {
      items: topMenu,
    }
  }
}
</script>

<style lang="scss">
:root {
  --base-grid: 8px;
}

.top-menu {
  padding: 32px;
  min-width: 100vw;
  width: 100%;

  .title {
    font-size: 4vw;
    line-height: normal;
    margin-bottom: 40px;
    font-weight: 500;
    text-align: center;
    color: $default;
    width: 100%;
  }


  .links {
    --link-size: calc(var(--base-grid) * 20);
    color: $default;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50vh;
  }

  .links__list {
    position: relative;
    list-style: none;
  }

  .links__item {
    width: var(--link-size);
    height: var(--link-size);
    position: absolute;
    top: 0;
    left: 0;
    margin-top: calc(var(--link-size) / -2);
    margin-left: calc(var(--link-size) / -2);
    --angle: calc(360deg / var(--item-total));
    --rotation: calc(140deg + var(--angle) * var(--item-count));
    transform: rotate(var(--rotation)) translate(calc(var(--link-size) + var(--base-grid) * 2)) rotate(calc(var(--rotation) * -1));
  }

  .links__link {
    opacity: 0;
    animation: on-load .3s ease-in-out forwards;
    animation-delay: calc(var(--item-count) * 150ms);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    background-color: $white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .links__icon {
    width: calc(var(--base-grid) * 8);
    height: calc(var(--base-grid) * 8);
    transition: all .3s ease-in-out;

    path {
      fill: $gray;

      &:last-child {
        fill: $green;
      }
    }
  }

  .pro {
    width: calc(var(--base-grid) * 8);
    height: calc(var(--base-grid) * 8);
    transition: all .3s ease-in-out;
  }

  .links__text {
    position: absolute;
    width: 100%;
    left: 0;
    text-align: center;
    height: calc(var(--base-grid) * 2);
    font-size: calc(var(--base-grid) * 2);
    display: none;
    bottom: calc(var(--base-grid) * 8.5);
    animation: text .3s ease-in-out forwards;
  }

  .links__link:after {
    content: "";
    background-color: transparent;
    width: var(--link-size);
    height: var(--link-size);
    border: 2px dashed $green;
    display: block;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all .3s cubic-bezier(.53, -.67, .73, .74);
    transform: none;
    opacity: 0;
  }

  .links__link:hover .links__icon, .links__link:hover .pro  {
    transition: all .3s ease-in-out;
    transform: translateY(calc(var(--base-grid) * -1));
  }

  .links__link:hover .links__text {
    display: block;
  }

  .links__link:hover:after {
    transition: all .3s cubic-bezier(.37, .74, .15, 1.65);
    transform: scale(1.1);
    opacity: 1;
  }

  @keyframes on-load {
    0% {
      opacity: 0;
      transform: scale(.3);
    }
    70% {
      opacity: .7;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes text {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(0);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(calc(var(--base-grid) * 5));
    }
  }
}
</style>
