<template>
    <div>
        <div></div>

        <el-card class="Profile-user">
            <h1 style="font-size:25px">Thông tin cá nhân</h1>

            <el-form :model="userinfor" ref="userinfor-form" :rules="rules" method="post">
               

                <image-upload-form-item
                    :file-list="userinfor.avatar"
                    :title="$t('Ảnh đại diện')"
                    @on-remove="handleRemoveFile"
                    @on-select="handleSelectFile"
                    propName="avatar"
                    required-label="false"
                    :limit="1"
                >
                </image-upload-form-item>
                 <div class="avt">
                     
                        <el-image
                            shape="circle"
                            fit="cover"
                            size="large"
                            :src="'data:image/png;base64,' + avatarUrl"
                        ></el-image>
                    
                </div>
                <text-input-form-item
                    title="Họ và tên :"
                    tag="Max name length is 50 characters"
                    :placeholder="$t('Enter your name here')"
                    :value.sync="userinfor.fullName"
                    required-label="true"
                    propName="fullName"
                >
                </text-input-form-item>

                <text-input-form-item
                    title="Email liên hệ :"
                    tag="Max name length is 50 characters"
                    :placeholder="$t('Enter your email here')"
                    :value.sync="userinfor.email"
                    required-label="true"
                    propName="email"
                >
                </text-input-form-item>

                <text-input-form-item
                    title="Facebook cá nhân / Fanpage : "
                    tag="Max name length is 50 characters"
                    :placeholder="$t('Enter your Facebook here')"
                    :value.sync="userinfor.fbUrl"
                    required-label="true"
                    propName="fbUrl"
                >
                </text-input-form-item>

                <text-input-form-item
                    title="Số điện thoại"
                    tag="Max name length is 50 characters :"
                    :placeholder="$t('Enter your phone number here')"
                    :value.sync="userinfor.phone"
                    required-label="true"
                    propName="phone"
                >
                </text-input-form-item>
            </el-form>
            <!-- <el-button class="btn-update" @click="updateProfile()">
                Cập nhật
            </el-button> -->
            <!-- <ButtonCreateOrUpdate
                    :create-fn="onSubmitForm"
                    :title="'Cập nhât'"
                    class="btn-update"
                    
            ></ButtonCreateOrUpdate> -->

            <el-button class="btn-update" @click="onSubmitForm()">
                Cập nhât
            </el-button>
        </el-card>
    </div>
</template>

<script lang="ts">
    import { Component, Ref, Prop, Vue } from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import ImageUploadFormItem from '@/components/form-item/ImageUploadFormItem.vue';
    import UserApi from '@/api/user-api/UserApi';
    import Pages from '@/router/Pages';
    import router from '@/router/Router';
    import i18n from '@/i18n';
    import UserInforForm from '@/types/UserInforForm';
    import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
    import { ElForm } from 'element-ui/types/form';
    import AlertService from '@/services/AlertService';
    import {CookieUtils} from "@/utils/CookieUtils";

    @Component({
        components: {
            TextInputFormItem,
            ImageUploadFormItem,
            ButtonCreateOrUpdate
        }
    })
    export default class ProfileUser extends Vue {
        private avatarUrl: string = null;
        private userinfor: UserInforForm = {
            fullName: null,
            email: null,
            fbUrl: null,
            phone: null,
            avatar: []
        };

        private rules: any = {
            fullName: [
                {
                    pattern: /(^.{1,50}$)/,
                    message: String(i18n.t('Họ và tên phải từ 1-50 kí tự')),
                    trigger: ['blur', 'change']
                }
            ],
            email: [
                {
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: String(i18n.t('Bạn chưa điền đúng dạng email')),
                    trigger: ['blur', 'change']
                }
            ],
            fbUrl: [
                {
                    pattern: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
                    message: String(i18n.t('Phải có dạng facebook.com/')),
                    trigger: ['blur', 'change']
                }
            ],
            phone: [
                {
                    pattern: /((84|0[3|5|7|8|9])+([0-9]{8})\b)/,
                    message: String(i18n.t('Chưa đúng định dạng')),
                    trigger: ['blur', 'change']
                }
            ]
        };

        private dob: Date = null;
        private house_name: string = null;

        private listFileRaw: Array<any> = [];
        private listUploadedCode: Array<any> = [];

        created() {
            if (localStorage.getItem('CurrentUser')) {
                let localUser = JSON.parse(localStorage.getItem('CurrentUser'));
                console.log(localUser);
                this.userinfor.fullName = localUser.fullName;
                this.userinfor.email = localUser.email;
                this.userinfor.fbUrl = localUser.fbUrl;
                this.userinfor.phone = localUser.phone;
                this.avatarUrl = localUser.avatarUrl;
                
            }

            // let avcdef = this.$cookies.get('access_token');
            let avvv = CookieUtils.getCookie('access_token');
            console.log('token',avvv)
            console.log('avataraaaa', this.avatarUrl);
        }

        @Ref('userinfor-form')
        private userInforFormRef: ElForm;

        private async updateProfile(): Promise<void> {
            let params = new FormData();
            const userDto = {
                fullName: this.userinfor.fullName,
                email: this.userinfor.email,
                fbUrl: this.userinfor.fbUrl,

                phone: this.userinfor.phone
            };
            console.log('aaa', userDto);
            params.append(
                'userDto',
                new Blob([JSON.stringify(userDto)], { type: 'application/json' })
            );

            if (this.userinfor.avatar) {
                this.userinfor.avatar.forEach((element: any) => {
                    if (element.status == 'ready') {
                        if (element.status == 'ready') {
                            this.listFileRaw.push(element.raw);
                        } else if (element.status == 'success' || element.code) {
                            this.listUploadedCode.push(element.code);
                        }
                    }
                });

                console.log('listFileRaw', this.listFileRaw);
                if (this.listFileRaw) {
                    for (let i = 0; i < this.listFileRaw.length; i++) {
                        params.append('avatar', this.listFileRaw[i]);
                    }
                }
            }

            console.log(params[1]);
            await UserApi.update(params);

            const userInfor = await UserApi.getUserInfor();
            localStorage.setItem('CurrentUser', JSON.stringify(userInfor));
            // this.avatarUrl =  URL.createObjectURL(this.b64toBlob(userInfor.bytes, 'image/png'));
            // router.push({ path : Pages.updateProfileUser.path});
            AlertService.success(
                String(i18n.t('common.alertTitle.success')),
                String('Cập nhật thông tin thành công')
            );

            window.location.href = '/update-profile-user';
        }

        private async onSubmitForm(): Promise<void> {
            await this.userInforFormRef.validate(async valid => {
                if (valid) {
                    await this.updateProfile();
                }
            });
        }

        private handleSelectFile(fileList: Array<any>): void {
            this.userinfor.avatar = fileList;
        }

        private handleRemoveFile(fileList: Array<any>) {
            this.userinfor.avatar = fileList;
        }
        private b64toBlob(b64Data: any, contentType: string) {
            contentType = contentType || 'image/png';
            const byteCharacters = atob(b64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            return new Blob([byteArray], { type: contentType });
        }
    }
</script>

<style lang="scss" scoped>
    .avt {
        padding: 0 0 0 0;
        .el-image {
            width: 100px;
            height: 100px;
            border-radius: 58%;
        }
    }
    .Profile-user {
        width: 30%;
        margin: auto;
        margin-top: 20px;
    }
    .btn-update {
        width: 150px;
        font-size: 14px;
        height: 39px;
        border: none;
        color: #ffffff;
        background-color: #0e5ba9 !important;
    }
</style>
