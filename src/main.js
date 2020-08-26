import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from 'axios'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all";
import "./assets/scss/app.scss";

import JQuery from "jquery";
window.$ = JQuery;

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

const requireComponent = require.context(
    "./components",
    false,
    /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);

    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
    );

    Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.config.productionTip = false;

store.dispatch('auth/me').then(() => {
    new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount("#app");
})