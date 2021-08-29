<template>
    <el-row class="row">
        <el-card class="register-password-user">
            <h1 class="register-title">Đổi mật khẩu</h1>
            <el-form :model="changePasswordForm" ref="changePassword-form" :rules="rules">
                <password-input-form-item
                    :placeholder="$t('Nhập mật khẩu cũ tại đây')"
                    :value.sync="changePasswordForm.oldPassword"
                    tag="Max name length is 50 characters"
                    title="Mật khẩu cũ"
                    propName="oldPassword"
                ></password-input-form-item>
                <span class="Msg-checkpassFail" v-if="checkPassword === true">{{
                    mgsCheckPassword
                }}</span>

                <password-input-form-item
                    :placeholder="$t('Nhập mật khẩu tại đây')"
                    :value.sync="changePasswordForm.newPassword"
                    tag="Max name length is 50 characters"
                    title="Mật khẩu mới"
                    propName="newPassword"
                ></password-input-form-item>

                <password-input-form-item
                    :placeholder="$t('Nhập lại mật khẩu của bạn')"
                    :value.sync="changePasswordForm.rePassword"
                    tag="Max name length is 50 characters"
                    title="Nhập lại mật khẩu mới"
                    propName="rePassword"
                ></password-input-form-item>
                <span class="Msg-checkRepassFail" v-if="checkConfirmPassword === true">{{
                    mgsCheckConfirmPassword
                }}</span>
            </el-form>

            <el-button @click="onSubmitForm()" class="btn-create">
                Đổi mật khẩu
            </el-button>
        </el-card>
    </el-row>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import SignIn from '@/views/login/SignIn.vue';
    import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
    import PasswordInputFormItem from '@/components/form-item/PasswordInputFormItem.vue';
    import { ElForm } from 'element-ui/types/form';
    import UserApi from '@/api/user-api/UserApi';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    import router from '@/router/Router';

    interface ChangePasswordForm {
        oldPassword: string;
        newPassword: string;
        rePassword: string;
    }

    @Component({
        components: {
            TextInputFormItem,
            SignIn,
            ButtonCreateOrUpdate,
            PasswordInputFormItem
        }
    })
    export default class ChangePassword extends Vue {
        private changePasswordForm: ChangePasswordForm = {
            oldPassword: null,
            newPassword: null,
            rePassword: null
        };
        private username: string = null;
        private checkPassword: boolean = false;
        private mgsCheckPassword: string = 'Bạn đã nhập sai mật khẩu';

        private checkConfirmPassword: boolean = false;
        private mgsCheckConfirmPassword: string = 'Mật khẩu của bạn không khớp';

        private async onChangePassword(): Promise<void> {
            if (this.changePasswordForm.newPassword !== this.changePasswordForm.rePassword) {
                this.checkConfirmPassword = true;
            } else {
                const request = {
                    oldPassword: this.changePasswordForm.oldPassword,
                    newPassword: this.changePasswordForm.newPassword
                };

                const response = await UserApi.changePassword(request);
                console.log(response);
                if (response.Status.includes('Success')) {
                    let localUser = JSON.parse(localStorage.getItem('CurrentUser'));
                    this.username = localUser.username;
                    localStorage.removeItem('CurrentUser');
                    localStorage.removeItem('jwtToken');
                    this.$cookies.remove('access_token');
                    window.location.href = '/sign-in-password/' + this.username;
                    // router.push({ path: `/sign-in-password/${this.username}` });
                    AlertService.success(
                        String(i18n.t('common.alertTitle.success')),
                        String('Đổi mật khẩu thành công, bạn cần đăng nhập lại')
                    );
                } else if (response.Status.includes('Invalid Password')) {
                    AlertService.error(
                        String(i18n.t('common.alertTitle.failed')),
                        String('Bạn đã nhập sai mật khẩu')
                    );
                    this.checkPassword = true;
                }
            }
        }

        @Ref('changePassword-form')
        private changePasswordFormRef: ElForm;

        private async onSubmitForm(): Promise<void> {
            await this.changePasswordFormRef.validate(async valid => {
                if (valid) {
                    await this.onChangePassword();
                }
            });
        }
    }
</script>

<style scoped>
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
    .Msg-checkpassFail {
        color: #c00;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 4px;
    }
    .Msg-checkRepassFail{
        color: #c00;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 4px;
    }
    .row {
        height: 93vh;
    }
</style>
