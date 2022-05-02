import { createApp } from 'vue';
import {
  faBriefcase,
  faIcons,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import { dom, library } from '@fortawesome/fontawesome-svg-core';

import App from './App.vue';

import 'normalize.css';

import './assets/base.scss';

library.add(faBriefcase, faIcons, faMusic);

createApp(App).mount('#app');

dom.watch();
