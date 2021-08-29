<template>
    <div class="main-form">
        <el-card class="sign-in-user" v-loading="loading">
            <el-form
                :model="emailFrom"
                ref="user-form"
                :rules="rules"
                class="email-form"
                @submit.native.prevent="onSubmit"
            >
                <h2 Class="txt-title">Quên mật khẩu {{ email }}</h2>
                <p class="txt-noti">
                    Không vấn đề gì! Chúng tôi sẽ gửi lại mật khẩu của bạn qua email. Vui lòng nhập
                    địa chỉ email của bạn
                </p>

                <text-input-form-item
                    :placeholder="$t('Nhập email của bạn')"
                    :value.sync="emailFrom.email"
                    required-label="true"
                    tag="Max name length is 50 characters"
                    title="Địa chỉ email của bạn"
                    propName="email"
                    @keyup.enter.native="onSubmit()"
                ></text-input-form-item>
                <span class="Msg-checkpassFail" v-if="checkPassword === true">{{
                    mgsCheckPassword
                }}</span>
            </el-form>
            <div class="forgot-btn">
                <el-button class="btn-forgot" @click="onSubmit()">
                    Gửi link tạo lại mật khẩu
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
import router from '@/router/Router';
import { Component, Vue, Ref } from 'vue-property-decorator';
import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
import i18n from '@/i18n';
import { ElForm } from 'element-ui/types/form';
import UserApi from '@/api/user-api/UserApi';
import AlertService from '@/services/AlertService';
interface EmailForm {
    email: string;
}

@Component({
    components: {
        TextInputFormItem,
    },
})
export default class ForgotPassword extends Vue {
    private password: String;
    private username: String;
    private loading: boolean = false;
    private checkPassword: boolean = false;
    private mgsCheckPassword: string = 'Email không khớp với tài khoản của bạn';
    private emailFrom: EmailForm = {
        email: null,
    };
    created() {
        this.username = this.$route.params.username != null ? this.$route.params.username : null;
        console.log(this.username);
        console.log(this.$router);
    }
    private rules: any = {
        email: [
            {
                required: true,
                message: String(i18n.t('common.message.fieldIsRequired')),
                trigger: ['blur'],
            },
            {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: String(i18n.t('common.message.fieldIsRequired')),
                trigger: ['blur', 'change'],
            },
        ],
    };

    @Ref('user-form')
    private usernameFromRef: ElForm;
    private async sendPassword(): Promise<void> {
        try {
            this.loading = true;
            const request = {
                username: this.username,
                email: this.emailFrom.email,
            };
            console.log(request);
            const response = await UserApi.forgotPassword(request);
            console.log(response);
            if (response.resetStatus === true) {
                router.push({ path: `/recoverToEmail-password/${this.username} ` });
                AlertService.success(
                    String(i18n.t('Thành Công')),
                    String('Bạn đã đặt lại mật khẩu thành công')
                );
            } else {
                this.checkPassword = true;
            }
        } catch (error) {
        } finally {
            this.loading = false;
        }
    }

    private async onSubmit(): Promise<void> {
        await this.usernameFromRef.validate(async (valid) => {
            if (valid) {
                await this.sendPassword();
            }
        });
    }
}
</script>

<style scoped>
.main-form {
    height: 80vh;
}
.Msg-checkpassFail {
    color: #c00 !important;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-top: 4px;
}

.txt-noti {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
}

.sign-in-user {
    margin: auto;
    width: 25%;
    text-align: left;
    margin-top: 20px;
    height: 380px;
}
.forgot-btn {
    text-align: center;
}
.btn-forgot {
    position: relative;
    color: #fff;
    vertical-align: middle;
    border: 1px solid #0071c2;
    border-radius: 2px;
    align-items: center;
    background-color: #0071c2;
    width: 100%;
}
</style>
