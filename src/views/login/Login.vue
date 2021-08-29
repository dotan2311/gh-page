<!--<template>-->
<!--  <div class="login-wrapper">-->
<!--    <div class="el-row box-content " v-loading.fullscreen.lock="fullscreenLoading">-->
<!--      <div class="login-header">-->
<!--        <div class="brand text-center">-->
<!--          <img class="custom-image" src="@/assets/images/logo.jpg"/>-->
<!--          <br/>-->
<!--          <h2-->
<!--              style="-->
<!--						color: #df6a6b;-->
<!--						margin-top: 0;-->
<!--						font-weight: bold;-->
<!--						font-family: Arial, sans-serif;-->
<!--					"-->
<!--          >-->
<!--            YAKUOUDO ASSISTANT-->
<!--          </h2>-->
<!--        </div>-->
<!--      </div>-->

<!--      <el-form-->
<!--          :inline="false"-->
<!--          class="flex-1 form-style login-content"-->
<!--          :rules="rules"-->
<!--          :model="formData"-->
<!--          ref="loginForm"-->
<!--      >-->
<!--        <el-form-item prop="username">-->
<!--          <el-input-->
<!--              type="text"-->
<!--              v-model="formData.username"-->
<!--              autocomplete="off"-->
<!--              :placeholder="$t('login.username')"-->
<!--              clearable-->
<!--              @keyup.enter.native="confirmLogin"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item prop="password">-->
<!--          <el-input-->
<!--              type="password"-->
<!--              v-model="formData.password"-->
<!--              autocomplete="off"-->
<!--              :placeholder="$t('login.password')"-->
<!--              clearable-->
<!--              @keyup.enter.native="confirmLogin"-->
<!--          />-->
<!--        </el-form-item>-->

<!--        <el-form-item>-->
<!--          <el-button class="btn-block custom-btn-color btn-login" @click="confirmLogin">-->
<!--            {{ $t('login.loginBtn') }}-->
<!--          </el-button>-->
<!--        </el-form-item>-->

<!--        <p class="comment-box">-->
<!--          【ご注意】-->
<!--          <br/>-->
<!--          本システムの推奨ブラウザはGoogleChromeとなります。-->
<!--          他のブラウザだと動作補償がございませんのでご注意く ださい。-->
<!--          <br/>-->
<!--          ログインID、パスワードをお忘れの場合は、システム管 理者へ直接お問い合わせください。-->
<!--        </p>-->
<!--      </el-form>-->
<!--    </div>-->
<!--  </div>-->

<!--</template>-->

<!--<script lang="ts">-->
<!--    import {Component, Prop, Vue, Emit, Ref, Watch} from 'vue-property-decorator';-->
<!--    //import LoginApi from '@/api/account/LoginApi';-->
<!--    import AlertService from '@/services/AlertService';-->
<!--    //import Auth from '@/security/Authentication';-->
<!--    import Pages from '@/router/Pages';-->
<!--    //import vm from '@/main';-->
<!--    import {CookieUtils} from "@/utils/CookieUtils";-->
<!--    import {StringUtils} from "@/utils/StringUtils";-->
<!--    import PusherService from "@/services/PusherService";-->
<!--    import i18n from '@/i18n';-->

<!--    @Component({-->
<!--        components: {},-->
<!--    })-->
<!--    export default class Login extends Vue {-->
<!--        private formData: any = {-->
<!--            username: '',-->
<!--            password: '',-->
<!--        };-->
<!--        private rules: any = {-->
<!--            username: [-->
<!--                {required: true, message: vm.$t('login.pleaseEnterUsername'), trigger: 'blur'},-->
<!--            ],-->
<!--            password: [-->
<!--                {required: true, message: vm.$t('login.pleaseEnterPassword'), trigger: 'blur'},-->
<!--            ],-->
<!--        };-->

<!--        private fullscreenLoading: boolean = false;-->

<!--        private isIEBrowser() {-->
<!--            let userAgent, ieReg, ie;-->
<!--            userAgent = window.navigator.userAgent;-->
<!--            ieReg = /msie|Trident.*rv[ :]*11\./gi;-->
<!--            ie = ieReg.test(userAgent);-->
<!--            return ie;-->
<!--        }-->

<!--        private async confirmLogin(e: Event) {-->
<!--            e.preventDefault();-->
<!--            this.fullscreenLoading = true;-->
<!--            try {-->
<!--                await LoginApi.login(this.formData).then((response: any) => {-->
<!--                    if (this.isIEBrowser()) {-->
<!--                        console.log(-->
<!--                            '管理画面の対象ブラウザはGoogle Chromeです。Google Chromeでご利用ください。'-->
<!--                        );-->
<!--                    }-->
<!--                });-->
<!--            } catch (e) {-->
<!--                AlertService.error(String(i18n.t('common.alertTitle.error')), vm.$t('common.message.serverErrorMessage').toString(), 2000);-->
<!--            } finally {-->
<!--                const accessToken = CookieUtils.getCookie("access_token");-->
<!--                if (StringUtils.isNotEmpty(accessToken)) {-->
<!--                    PusherService.init().then(() => {-->
<!--                        console.log("initialize pusher")-->
<!--                    });-->
<!--                    this.redirectAfterLogin();-->
<!--                } else {-->
<!--                    AlertService.error(String(i18n.t('common.alertTitle.failed')), vm.$t('login.passwordIncorrect').toString(), 1000);-->
<!--                }-->
<!--                this.fullscreenLoading = false;-->

<!--            }-->
<!--        }-->

<!--        private redirectAfterLogin() {-->
<!--            this.$router.push({path: Pages.redirect.path});-->
<!--        }-->

<!--        private resetForm() {-->
<!--            this.formData = {-->
<!--                username: '',-->
<!--                password: '',-->
<!--            };-->
<!--        }-->
<!--    }-->
<!--</script>-->
<!--<style scoped>-->
<!--    .login-wrapper {-->
<!--        height: 100vh;-->
<!--        background-color: whitesmoke;-->
<!--        padding: 20px;-->
<!--    }-->

<!--    .box-content {-->
<!--        margin-left: auto;-->
<!--        margin-right: auto;-->
<!--        margin-top: 20px;-->
<!--        width: 500px;-->
<!--        height: auto;-->
<!--        -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);-->
<!--        -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);-->
<!--        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);-->
<!--        border-radius: 80px;-->
<!--        background-color: white;-->
<!--        padding: 20px;-->
<!--    }-->

<!--    .login-header {-->
<!--        position: relative;-->
<!--        top: 0;-->
<!--        margin: 0;-->
<!--        left: 0;-->
<!--        right: 0;-->
<!--        padding: 30px 0px 0;-->
<!--        font-weight: 300;-->
<!--        text-align: center;-->
<!--    }-->

<!--    .custom-image {-->
<!--        width: 100px;-->
<!--        height: auto;-->
<!--        margin-bottom: 25px;-->
<!--    }-->

<!--    .login-content {-->
<!--        width: auto;-->
<!--        padding: 30px 60px;-->
<!--        color: #999;-->
<!--        margin: 0 auto;-->
<!--    }-->

<!--    .comment-box {-->
<!--        background-color: #fbefef;-->
<!--        color: #555555;-->
<!--        padding: 10px 5px;-->
<!--        border: 1px solid #efb3b2;-->
<!--        font-size: 70%;-->
<!--    }-->

<!--    .btn-login {-->
<!--        color: black;-->
<!--        background: #ffc4ba;-->
<!--        border-color: #ffc4ba;-->
<!--        padding-left: 12px;-->
<!--        padding-right: 12px;-->
<!--        border-radius: 6px;-->
<!--        width: 100%;-->
<!--    }-->
<!--</style>-->
