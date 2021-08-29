<template>
    <el-row class="row">
        <el-card class="register-password-user">
            <h1 class="register-title">Tạo mật khẩu</h1>
            <el-form
                :model="registerPasswordForm"
                ref="registerPassword-form"
                :rules="rules"
                @submit.native.prevent="onSubmitForm"
            >
                <div class="email-title">
                    <p>Tạo mật khẩu cho tài khoản {{ username }}</p>
                </div>

                <p>Dùng ít nhất 8 kí tự trong đó có chữ hoa chữ thường và số</p>

                <password-input-form-item
                    title="Mật khẩu của bạn :"
                    tag="Max name length is 50 characters"
                    :placeholder="$t('Nhập mật khẩu của bạn vào đây')"
                    :value.sync="registerPasswordForm.password"
                    required-label="true"
                    propName="password"
                    @keyup.enter.native="onSubmitForm()"
                >
                </password-input-form-item>

                <password-input-form-item
                    title="Nhập lại mật khẩu :"
                    tag="Max name length is 50 characters"
                    :placeholder="$t('Nhập lại mật khẩu của bạn vào đây')"
                    :value.sync="registerPasswordForm.re_password"
                    required-label="true"
                    propName="re_password"
                    @keyup.enter.native="onSubmitForm()"
                >
                </password-input-form-item>
                <span class="Msg-checkpassFail" v-if="checkPassword === true">{{
                    mgsCheckPassword
                }}</span>
            </el-form>

            <el-button @click="onSubmitForm()" class="btn-create">
                Thêm tài khoản
            </el-button>
        </el-card>
    </el-row>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import PasswordInputFormItem from '@/components/form-item/PasswordInputFormItem.vue';
    import SignIn from '@/views/login/SignIn.vue';
    import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
    import UserApi from '@/api/user-api/UserApi';
    import router from '@/router/Router';
    import Pages from '@/router/Pages';
    import LoginApi from '@/api/login-api/LoginApi';
    import { ElForm } from 'element-ui/types/form';
    import i18n from '@/i18n';

    interface RegisterPasswordForm {
        password: string;
        re_password: string;
    }
    @Component({
        components: {
            TextInputFormItem,
            SignIn,
            ButtonCreateOrUpdate,
            PasswordInputFormItem
        }
    })
    export default class RegisterPassword extends Vue {
        private username: string;

        private registerPasswordForm: RegisterPasswordForm = {
            password: null,
            re_password: null
        };

        private email: string = null;

        private watchPass: string = null;
        private watchRePass: string = null;
        private checkPass: boolean = null;
        private checkrePass: boolean = null;
        private checkRegister: boolean = null;

        private rules: any = {
            password: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                },
                {
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    message: String(i18n.t('Mật khẩu phải có 8 kí tự tự , gồm số , chữ thường , chữ hoa')),
                    trigger: ['blur', 'change']
                }
            ],
            re_password: [
                {
                    required: true,
                    message: String(i18n.t('common.message.fieldIsRequired')),
                    trigger: ['blur']
                }
                // {

                //     validator : this.validateConfirmPassword,
                //     message: String(i18n.t('common.message.fieldIsRequired')),
                //     trigger: ['blur', 'change']
                // }
            ]
        };

        validateConfirmPassword = (rule: any, value: any, callback: any) => {
            if (this.registerPasswordForm.re_password.match(value)) {
                callback(new Error('Mật khẩu không trùng khớp'));
            } else {
                callback();
            }
        };

        created() {
            this.username =
                this.$route.params.username != null ? this.$route.params.username : null;
            this.watchPass = this.registerPasswordForm.password;
            this.watchRePass = this.registerPasswordForm.re_password;
            console.log(this.username);
            console.log(this.$router);
        }

        @Ref('registerPassword-form')
        private registerPasswordFormRef: ElForm;
        private checkPassword: boolean = false;
        private mgsCheckPassword: string = 'Mật khẩu không trùng khớp';

        private async onRegister(): Promise<void> {
            const request = {
                username: this.username,
                password: this.registerPasswordForm.password
            };

            if (this.registerPasswordForm.re_password === this.registerPasswordForm.password) {
                const response = await UserApi.register(request);
                console.log(response);

                if (response.exitAcount !== true && response.username !== null){

                
                localStorage.setItem('username',this.username)
                localStorage.setItem('password',this.registerPasswordForm.password)
                router.push({ path: `/email-to-verify/${this.username}` }); 

                }
                // if (response.exitAcount !== true && response.username !== null) {

                     

                //     const login = await LoginApi.onLoginSuccess(request);
                //     this.$cookies.config({ expires: '30d' });
                //     // add token vao localStorage
                //     localStorage.setItem('jwtToken', login.token);

                //     // goi api /me lay ra infor user
                //     const userInfor = await UserApi.getUserInfor();
                //     console.log('Login in', login);
                //     //add infor user vào localStorage
                //     localStorage.setItem('CurrentUser', JSON.stringify(userInfor));

                //     //back to home page
                //     // router.push({ path: Pages.home.path });
                //     window.location.href = '/home';

                //     this.$notify({
                //         title: 'Success',
                //         message: 'Bạn đã đăng kí thành công',
                //         type: 'success'
                //     });
                // }
            } else {
                this.checkPassword = true;
            }
        }

        private async onSubmitForm(): Promise<void> {
            await this.registerPasswordFormRef.validate(async valid => {
                if (valid) {
                    await this.onRegister();
                }
            });
        }
    }
</script>

<style scoped>
    @import url('//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css');

    .Msg-checkpassFail {
        color: #c00;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 4px;
    }
    .register-password-user {
        margin: auto;
        width: 25%;
        text-align: left;
        margin-top: 20px;
    }

    .register-title {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
    }

    .btn-create {
        width: 150px;
        font-size: 14px;
        height: 39px;
        border: none;
        color: #ffffff;
        background-color: #0e5ba9 !important;
    }
    .email-title {
        display: flex;
    }
    .email {
        margin-top: 20px;
    }
    .row {
        height: 93vh;
    }
</style>
