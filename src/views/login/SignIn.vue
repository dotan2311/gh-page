<template>
    <el-row class="row">
        <el-card class="sign-in">
            <h1 class="sign-in-title">Đăng nhập hoặc tạo tài khoản</h1>

            <el-form
                :model="usernameFrom"
                ref="user-form"
                :rules="rules"
                class="email-form"
                @submit.native.prevent="onSubmit"
            >
                <text-input-form-item
                    :placeholder="$t('Nhập tên đăng nhập của bạn tại đây')"
                    :value.sync="usernameFrom.username"
                    tag="Max name length is 50 characters"
                    title="Tên đăng nhập"
                    required-label="true"
                    propName="username"
                    @keyup.enter.native="onSubmit()"
                ></text-input-form-item>
                <div class="countinue-btn">
                    <!-- <el-button class="btn-next" @click="onSubmit()">
                    Tiếp theo
                </el-button> -->

                    <el-button @click.prevent="onSubmit()" class="btn-next">
                        Đăng nhập
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
    //@ts-ignore
    import facebookLogin from 'facebook-login-vuejs';
    import UserEntity from '@/types/classes/UserEntity';
    interface SiginUsernameForm {
        username: string;
    }
    @Component({
        components: {
            RadioFormItem,
            TextInputFormItem,
            RegisterPassword,
            ButtonPublic,
            GoogleLogin,
            facebookLogin
        }
    })
    export default class SignIn extends Vue {
        private usernameFrom: SiginUsernameForm = {
            username: null
        };

        private rules: any = {
            username: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                },
                {
                    pattern: /^.{6,30}$/,
                    message: String(i18n.t('Tài khoản phải chứa từ 6 đến 30 kí tự')),
                    trigger: ['blur', 'change']
                }
            ]
        };

        private async onSign_in(): Promise<void> {
            const request = {
                username: this.usernameFrom.username
            };
            const userEmail = await LoginApi.getUserEmail(request);
            console.log(userEmail);
            if (userEmail.success === true && userEmail.verify === true) {
                router.push({ path: `/sign-in-password/${this.usernameFrom.username}` });
            } else if (userEmail.success === true && userEmail.verify !== true) {
                router.push({ path: `/email-to-verify/${this.usernameFrom.username}` });
            } else if (userEmail.success === false) {
                router.push({ path: `/register-password/${this.usernameFrom.username}` });
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

        private params: any = {
            client_id: '405043361636-r7fk8eg2ss521baij9egmkvg8b0ksamd.apps.googleusercontent.com'
        };

        private renderParams: any = {
            width: 50,
            height: 50,
            longtitle: true
        };

        private getUserData(fbUser: any) {
            console.log(fbUser);
        }

        private user: UserEntity = null;

        private onSuccess(googleUser: any) {
            console.log(googleUser);
            console.log(googleUser.getBasicProfile().getName());

            this.user = {
                id: null,
                username: googleUser.getBasicProfile().getName(),
                avatarUrl: googleUser.getBasicProfile().getImageUrl(),
                fullName: googleUser.getBasicProfile().getName()
            };

            console.log('googleUser', this.user);
            // This only gets the user information: id, name, imageUrl and email
        }
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
</style>
