import Vue from 'vue';
import RequiredLabel from '@/components/form-item/modules/RequireLabel.vue';
import InputLabel from '@/components/form-item/modules/InputLabel.vue';
import OptionalLabel from "@/components/form-item/modules/OptionalLabel.vue";
import InfoDialog from "@/components/dialog/InfoDialog.vue";
import DeleteDialog from "@/components/dialog/DeleteDialog.vue";
import ConfirmDialog from "@/components/dialog/ConfirmDialog.vue";
import {ValidationProvider} from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component("RequiredLabel", RequiredLabel);
Vue.component("OptionalLabel", OptionalLabel);
Vue.component("InputLabel", InputLabel);
Vue.component("DeleteDialog", DeleteDialog);
Vue.component("ConfirmDialog", ConfirmDialog);
Vue.component("InfoDialog", InfoDialog);
