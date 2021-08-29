import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import enLang from 'element-ui/lib/locale/lang/en';
import viLang from 'element-ui/lib/locale/lang/vi';
import locale from 'element-ui/lib/locale';
import VueCurrencyInput from 'vue-currency-input';
import Vue2Filters from 'vue2-filters';
import VueCookies from "vue-cookies-ts";
//@ts-ignore
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDHceKL6LCQusky6nFYduGFGcg4UKyTI6o',
        libraries: 'places',  
    },
})

Vue.use(require('vue-google-charts'))
const moment = require('moment')
require('moment/locale/vi')

Vue.use(require('vue-moment'), {
    moment
});

Vue.use(VueCookies);
Vue.use(Vue2Filters);
Vue.use(require('vue-moment'));
Vue.use(ElementUI);
locale.use(viLang); // default language for element ui
Vue.use(VueCurrencyInput)
