<template>
    <el-row class="row">
        <el-card class="sign-in">
            <h1 class="sign-in-title">Nhập mã xác thực tại đây</h1>
            <div class="email-top">
                <a>Mã xác thực đã được gửi về tài khoản :</a>
                <b>{{ email }}</b>
            </div>

            <el-form
                :model="verifyFrom"
                ref="user-form"
                :rules="rules"
                class="email-form"
                @submit.native.prevent="onSubmit"
            >
                <text-input-form-item
                    :placeholder="$t('Nhập mã xác thực của bạn tại đây')"
                    :value.sync="verifyFrom.verifyCode"
                    tag="Max name length is 50 characters"
                    title="Mã xác thực"
                    required-label="true"
                    propName="verifyCode"
                    @keyup.enter.native="onSubmit()"
                    class="input-verify"
                ></text-input-form-item>

                <span class="Msg-checkpassFail" v-if="checkCode === true">{{ mgsCheckCode }}</span>
                <div class="countinue-btn">
                    <!-- <el-button class="btn-next" @click="onSubmit()">
                    Tiếp theo
                </el-button> -->
                    <el-button @click.prevent="sendVerifyCode()" class="btn-sendAgian">
                        Gửi lại mã
                    </el-button>

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
    import Roles from '@/security/Roles';
    interface VerifyForm {
        verifyCode: string;
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
        private verifyFrom: VerifyForm = {
            verifyCode: null
        };
        private checkCode: boolean = false;
        private mgsCheckCode: string = 'Bạn đã nhập sai mã xác thực';

        private rules: any = {
            verifyCode: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                }
            ]
        };
        private email: string = null;
        created() {
            this.email = this.$route.params.email != null ? this.$route.params.email : null;

            this.sendVerifyCode();

            console.log(this.email);
            console.log(this.$router);
        }

        private async sendVerifyCode(): Promise<void> {
            const request2 = {
                username: localStorage.getItem('username'),
                email: this.email
            };
            const response = await UserApi.sendVerifyCode(request2);
            console.log(response);
        }

        private async onSign_in(): Promise<void> {
            const request = {
                code: this.verifyFrom.verifyCode
            };
            console.log(request);
            const response = await UserApi.checkVerifyCode(request);
            console.log(response);

            if (response.verify === true) {
                this.checkCode = false;

                const updateEmail = {
                    username: localStorage.getItem('username'),
                    email: this.email
                };

                const responseUpdateEmail = await UserApi.updateEmail(updateEmail);

                console.log(responseUpdateEmail);
                const loginRequest = {
                    username: localStorage.getItem('username'),
                    password: localStorage.getItem('password')
                };
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                const login = await LoginApi.onLoginSuccess(loginRequest);
                console.log(login.loginSucces);
                if (login.loginSucces === false) {
                } else {
                    this.$cookies.config({ expires: '1h' });

                    // add token vao localStorage
                    localStorage.setItem('jwtToken', login.token);

                    this.$cookies.set('access_token', login.token);
                    // goi api /me lay ra infor user
                    const userInfor = await UserApi.getUserInfor();
                    console.log('Login in', login);
                    //add infor user vào localStorage
                    localStorage.setItem('CurrentUser', JSON.stringify(userInfor));
                    var abc: UserEntity = JSON.parse(localStorage.getItem('CurrentUser'));

                    console.log(abc.id);
                    let roleNames: Array<string> = [];
                    for (let i = 0; i < userInfor.rolename.length; i++) {
                        roleNames.push(userInfor.rolename[i].name);
                    }

                    if (roleNames.includes(Roles.ROLE_DORM_OWNER)) {
                        // router.push({ path: `/dorm-owner/${userInfor.id}/management` });
                        window.location.href = '/dorm-owner/' + userInfor.id + '/management';
                    } else {
                        //back to home page''
                        window.location.href = '/home';
                        // router.push({ path: Pages.home.path });
                    }
                }
            } else {
                this.checkCode = true;
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
    }
</script>

<style lang="scss" scoped>
    .input-verify {
        margin-bottom: 10px;
    }
    .btn-sendAgian {
        margin-bottom: 33px;
        margin-left: 325px;
    }
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
        margin-left: 0xpx;
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
        .el-button + .el-button {
            margin-left: 0px;
        }
    }

    .row {
        height: 93vh;
    }
    .email-form {
        margin-top: 40px;
    }
    .Msg-checkpassFail {
        color: #c00 !important;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 4px;
    }
</style>
