import Vue from 'vue';
import App from './App.vue';
import i18n from '@/i18n';
import router from './router/Router';
import Utils from '@/utils';
import './plugin-register';
import '@/components/GlobalComponentRegister';
import '@/assets/styles/app.scss';

declare module 'vue/types/vue' {
    interface Vue {
        $utils: typeof Utils
    }
}

new Vue({
    router,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
