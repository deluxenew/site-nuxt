import Vue from 'vue';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  chevronDown, close, calculator, arrowHeader, contacts, burger
} from './custom/icons';

config.autoAddCss = false;
config.searchPseudoElements = true;

library.add(
  chevronDown, close, calculator, arrowHeader, contacts, burger
);

Vue.component('fa-icon', FontAwesomeIcon);
