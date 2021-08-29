<template>
    <el-row class="row">
        <el-card class="sign-in" v-loading="loading">
            <a class="sign-in-title">Xác thực tài khoản của bạn qua email:</a>

            <el-form
                :model="emailFrom"
                ref="user-form"
                :rules="rules"
                class="email-form"
                @submit.native.prevent="onSubmit"
            >
                <text-input-form-item
                    :placeholder="$t('Nhập Email của bạn tại đây')"
                    :value.sync="emailFrom.email"
                    tag="Max name length is 50 characters"
                    title="Email"
                    required-label="true"
                    propName="email"
                    @keyup.enter.native="onSubmit()"
                ></text-input-form-item>

                <span class="Msg-checkpassFail" v-if="checkExitEmail === true">{{
                    mgsCheckExitEmail
                }}</span>

                <div class="countinue-btn">
                    <!-- <el-button class="btn-next" @click="onSubmit()">
                    Tiếp theo
                </el-button> -->

                    <el-button @click.prevent="onSubmit()" class="btn-next">
                        Tiếp tục
                    </el-button>
                </div>
            </el-form>
        </el-card>
    </el-row>
</template>

<script lang="ts">
    import router from '@/router/Router';
    import { Component, Ref, Vue } from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import RadioFormItem from '@/components/form-item/RadioFormItem.vue';
    import RegisterPassword from '@/views/login/RegisterPassword.vue';
    import axios from 'axios';
    import LoginApi from '@/api/login-api/LoginApi';
    import i18n from '@/i18n';
    import ButtonPublic from '@/components/button/ButtonPublic.vue';
    import { ElForm } from 'element-ui/types/form';
    //@ts-ignore
    import GoogleLogin from 'vue-google-login';
    import UserEntity from '@/types/classes/UserEntity';
    import UserApi from '@/api/user-api/UserApi';
    interface EmailForm {
        email: string;
    }
    @Component({
        components: {
            RadioFormItem,
            TextInputFormItem,
            RegisterPassword,
            ButtonPublic,
            GoogleLogin
        }
    })
    export default class EnterEmailToVerify extends Vue {
        private emailFrom: EmailForm = {
            email: null
        };
        private username: String = null;
        private checkExitEmail: boolean = false;
        private mgsCheckExitEmail: String = 'Email đã tồn tại';
        private loading: boolean = false;
        private rules: any = {
            email: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                },
                {
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur', 'change']
                }
            ]
        };

        created() {
            this.username =
                this.$route.params.username != null ? this.$route.params.username : null;
        }
        private async onSign_in(): Promise<void> {
            try {
                this.loading = true;
                const request1 = {
                    email: this.emailFrom.email
                };
                console.log(request1);
                const exitEmail = await UserApi.checkExitEmail(request1);
                console.log(exitEmail);

                if (exitEmail.ExitEmail === false) {
                    router.push({ path: `/verify/${this.emailFrom.email}` });
                } else {
                    this.checkExitEmail = true;
                }
            } catch (error) {
            } finally {
                this.loading = false;
            }
        }

        @Ref('user-form')
        private usernameFromRef: ElForm;

        private async onSubmit(): Promise<void> {
            await this.usernameFromRef.validate(async valid => {
                if (valid) {
                    await this.onSign_in();
                }
            });
        }

        private user: UserEntity = null;
    }
</script>

<style lang="scss" scoped>
    .divider-text {
        white-space: nowrap;
        margin: 0 8px 2px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 10px;
    }
    .divider {
        margin-top: 10px;
        text-align: center;
    }

    .btn-next {
        position: relative;
        color: #fff;
        vertical-align: middle;
        border: 1px solid #0071c2;
        border-radius: 2px;
        align-items: center;
        background-color: #0071c2 !important;
        width: 100%;
    }
    .fb {
        fill: #4267b2;
    }
    .sign-in {
        margin: auto;
        width: 25%;
        text-align: left;
        margin-top: 20px;
        height: 450px;
    }

    .sign-in-title {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
    }

    .email-address {
        display: block;
        padding-bottom: 4px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
    }
    .icon-social {
        display: flex;
        margin-top: 15px;
        justify-content: center;
    }
    .icon-container {
        width: 50px;
        height: 50px;

        border: 1px shadow #e6e6e6;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30px;
    }
    .btn-loginGoogle {
        width: 70px;
        height: 70px;
        border: 1px solid #e6e6e6;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30px;
    }
    .countinue-btn {
        text-align: center;
    }
    .row {
        height: 93vh;
    }
    .Msg-checkpassFail {
        color: #c00 !important;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 4px;
    }
</style>
