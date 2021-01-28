import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { ToggleButton } from 'vue-js-toggle-button';
import router from "./router";
import store from "./store";
import Loading from "components/lib/loading";
//import Breadcrumbs from "components/lib/breadcrumbs";
import Alerts from "components/lib/alerts";
import Modals from "components/lib/modals";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './assets/custom.scss';

import moment from 'vue-moment';

import i18n from './locale/multilanguage';

Vue.config.productionTip = false;

Vue.component("loading", Loading);
//Vue.component("breadcrumbs", Breadcrumbs);
Vue.component("alerts", Alerts);
Vue.component("modals", Modals);
Vue.component('toggleButton', ToggleButton);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(moment);

new Vue({
    el: "#app",
    router,
    store,
    i18n,
    template: "<App/>",
    components: { App }
});

