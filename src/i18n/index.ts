import Vue from "vue";
import VueI18n from "vue-i18n";
import enMessage from "@/i18n/en";
import vnMessage from "@/i18n/vn";

Vue.use(VueI18n);

enum Locales {
    EN = "en",
    VN = "vn"
}

const key = "lang";
let language = localStorage.getItem(key);
if (!language) {
    language = process.env.VUE_APP_DEFAULT_LANG
}

class I18n extends VueI18n {
    public locales = Locales;

    constructor() {
        super()
        this.setLocaleMessage(Locales.EN, enMessage);
        this.setLocaleMessage(Locales.VN, vnMessage);
        this.locale = language;
        this.fallbackLocale = language;
    }

    getCurrentLang = () => {
        return language;
    }
    changeLanguage = (lang: string) => {
        this.locale = lang;
        localStorage.setItem(key, lang);
    }
}

export default new I18n();
