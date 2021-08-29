<template>
    <div>
        <el-header class="header" style="position: relative">
            <el-image
                style="width: 9%; height: 110%"
                class="title"
                :src="logo"
                @click="onClickTitle"
            ></el-image>
            <div style="float: right; display: flex">
                <!-- <el-button @click="dialogVisible = true" plain type="danger" v-if="user == null">
                    Đăng kí cho thuê
                </el-button> -->

                <el-button
                    @click="goManageAcount"
                    plain
                    type="primary"
                    v-if="user != null && user.roles.includes('SYSTEM_ADMIN')"
                >
                   {{$t('headerI18n.managementAccount')}}
                </el-button>
                
                <el-button
                    @click.native="goManageDorm"
                    plain
                    type="danger"
                    v-if="user != null && user.roles.includes('DORM_OWNER')"
                >
                   {{$t('headerI18n.managementDorm')}}
                </el-button>
                <el-button
                    @click.native="dialogVisible = true"
                    plain
                    type="danger"
                    v-if="
                        user != null &&
                        user.roles.includes('USER') &&
                        !user.roles.includes('DORM_OWNER') &&
                        !user.roles.includes('SYSTEM_ADMIN')
                    "
                >
                    {{$t('headerI18n.registerDormOwner')}}
                </el-button>
                <!-- Dialog Đăng kí chủ trọ -->
                <el-dialog title="Đăng kí chủ trọ" :visible.sync="dialogVisible" width="30%" center>
                    <span>{{$t('headerI18n.textHayhienthithongtincanhan')}}</span>
                    <el-form :model="dorm_owner_infor" ref="dowmOwnerInfor-form" :rules="rules">
                        <text-input-form-item
                            :title="$t('headerI18n.fullname')"
                            tag="Max name length is 50 characters"
                            :placeholder="$t('headerI18n.holderFullname')"
                            :value.sync="dorm_owner_infor.fullName"
                            required-label="true"
                            propName="fullName"
                        >
                        </text-input-form-item>

                        <text-input-form-item
                            :title="$t('headerI18n.email')"
                            tag="Max name length is 50 characters"
                            :placeholder="$t('headerI18n.holderEmail')"
                            :value.sync="dorm_owner_infor.email"
                            required-label="true"
                            propName="email"
                        >
                        </text-input-form-item>

                        <text-input-form-item
                            :title="$t('headerI18n.facebook')"
                            tag="Max name length is 50 characters"
                            :placeholder="$t('headerI18n.holderFacebook')"
                            :value.sync="dorm_owner_infor.fbUrl"
                            required-label="true"
                            propName="fbUrl"
                        >
                        </text-input-form-item>

                        <text-input-form-item
                            :title="$t('headerI18n.phone')"
                            tag="Max name length is 50 characters :"
                            :placeholder="$t('headerI18n.holderPhone')"
                            :value.sync="dorm_owner_infor.phone"
                            required-label="true"
                            propName="phone"
                        >
                        </text-input-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="onSubmitRegisterDormOwner"
                            >Confirm</el-button
                        >
                    </span>
                </el-dialog>

                <div class="right-layout" v-if="user == null">
                    <el-button @click="goLogin" plain type="primary">{{$t('headerI18n.login')}}</el-button>
                </div>
                <!-- <div class="right-layout" v-if="user == null">
                    <el-button @click="goLogin" plain type="primary">Đăng kí</el-button>
                </div> -->

                <div class="right-layout" v-else>
                    <!-- ảnh avatar -->
                    <!-- <el-image class="avatar"
                        shape="circle"
                        fit="cover"
                        size="large"
                        :src="'data:image/png;base64,' + this.user.avatarUrl "
                    ></el-image> -->
                    <!-- <el-avatar
                        :size="40"
                        :src="'data:image/png;base64,' + this.user.avatarUrl"
                    ></el-avatar> -->
                    <el-image
                        v-if="this.user.avatarUrl"
                        class="avt"
                        shape="circle"
                        fit="cover"
                        size="small"
                        :src="'data:image/png;base64,' + this.user.avatarUrl"
                    ></el-image>
                    <el-image
                        v-else
                        class="avt"
                        shape="circle"
                        fit="cover"
                        size="small"
                        :src="defaultAvt"
                    ></el-image>

                    <el-dropdown>
                        <span class="el-dropdown-link" v-if="checkNull(user.fullName)">
                            {{ user.fullName }}
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <span class="el-dropdown-link" v-else>
                            {{ user.username }}
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="goProfile"
                                >{{$t('headerI18n.profileUser')}}</el-dropdown-item
                            >
                            <el-dropdown-item @click.native="goFavouriteDorm">
                                {{$t('headerI18n.favorite')}}
                            </el-dropdown-item>

                            <el-dropdown-item @click.native="goChangePassword"
                                >{{$t('headerI18n.changePassword')}}</el-dropdown-item
                            >
                            <el-dropdown-item @click.native="onLogout"> {{$t('headerI18n.logout')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <div class="right-layout" style="width: 100px" v-if="lang === 'vn'">
                    <i class="fa fa-globe lang-icon"></i>
                    <el-button @click="changeLanguage('en')" type="text">English</el-button>
                </div>
                <div class="right-layout" style="width: 100px" v-else>
                    <i class="fa fa-globe lang-icon"></i>
                    <el-button @click="changeLanguage('vn')" type="text">Tiếng Việt</el-button>
                </div>
            </div>
        </el-header>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from 'vue-property-decorator';
import Pages from '@/router/Pages';
import UserEntity from '@/types/classes/UserEntity';
import Roles from '@/security/Roles';
import I18n from '@/i18n';
import router from '@/router/Router';
import UserApi from '@/api/user-api/UserApi';
import UserInforForm from '@/types/UserInforForm';
import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
import i18n from '@/i18n';
import { ElForm } from 'element-ui/types/form';
import Auth from '@/security/Authentication';

@Component({
    components: {
        TextInputFormItem,
    },
})
export default class Header extends Vue {
    private user: UserEntity = null;
    private avatar: string = null;
    private headerTitle: string = 'FPT Service - Renting House Searching System';
    private avatarUrl: string =
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
    private defaultAvt: string = require('@/assets/images/defaultAvt.png');
    private lang: string = I18n.getCurrentLang();
    private isLogin: boolean = null;
    private dialogVisible: boolean = false;
    private logo: string = require('@/assets/images/logo2.png');

    private dorm_owner_infor: UserInforForm = {
        fullName: null,
        email: null,
        fbUrl: null,
        phone: null,
        avatar: [],
    };

    mounted() {
        if (localStorage.getItem('CurrentUser')) {
            let localUser = JSON.parse(localStorage.getItem('CurrentUser'));
            console.log(localUser);
            let roleNames: Array<string> = [];
            for (let i = 0; i < localUser.rolename.length; i++) {
                roleNames.push(localUser.rolename[i].name);
            }

            this.dorm_owner_infor = {
                fullName: localUser.fullName,
                email: localUser.email,
                fbUrl: localUser.fbUrl,
                phone: localUser.phone,
                avatar: [],
            };
            this.user = {
                id: localUser.id,
                username: localUser.username,
                avatarUrl: localUser.avatarUrl,
                roles: roleNames,
                fullName: localUser.fullName,
            };
            this.avatar = this.user.avatarUrl;
          
            
        }
    }
    created() {
        this.lang = I18n.getCurrentLang();
    }

    private changeLanguage(lang: string) {
        this.lang = lang;
        I18n.changeLanguage(lang);
    }

    private onClickTitle(): void {
        this.$router.push({ path: Pages.home.path });
    }
    private goProfile(): void {
        this.$router.push({ path: Pages.updateProfileUser.path });
    }
    private goChangePassword(): void {
        this.$router.push({ path: Pages.changePassword.path });
    }
    private goManageAcount(): void {
        this.$router.push({ path: Pages.manageAccount.path });
    }
    private goManageDorm(): void {
        this.$router.push({ path: `/dorm-owner/${this.user.id}/management` });
    }
    private goLogin(): void {
        this.$router.push({ path: Pages.signIn.path });
    }

    private goFavouriteDorm():void{
        this.$router.push({ path: Pages.favouriteDorm.path });

    }
    private checkNull(username: string) {
        if (username == null) {
            return null;
        } else if (username.trim() == '') {
            return null;
        }
        return username;
    }
    private onLogout(): void {
        localStorage.removeItem('CurrentUser');
        localStorage.removeItem('jwtToken');
        this.$cookies.remove('access_token');
        this.user = null;
        this.$router.push({ path: Pages.home.path });
        this.$notify({
            title: 'Success',
            message: 'Bạn đã đăng xuất thành công',
            type: 'success',
        });
    }

    private curentUser: UserEntity = JSON.parse(localStorage.getItem('CurrentUser'));

    private async onUpdateRoleDormOwner(): Promise<void> {
        let params = new FormData();
        const userDto = {
            fullName: this.dorm_owner_infor.fullName,
            email: this.dorm_owner_infor.email,
            fbUrl: this.dorm_owner_infor.fbUrl,

            phone: this.dorm_owner_infor.phone,
        };

        params.append('userDto', new Blob([JSON.stringify(userDto)], { type: 'application/json' }));

        await UserApi.update(params);

        const updateProfile = await UserApi.update;

        const success = await UserApi.updateRoleDormOwner();
        const userInfor = await UserApi.getUserInfor();
        localStorage.setItem('CurrentUser', JSON.stringify(userInfor));

        this.dialogVisible = false;
        this.$notify({
            title: 'Success',
            message: 'Bạn đã đăng kí chủ trọ thành công',
            type: 'success',
        });
        window.location.href = `/dorm-owner/${userInfor.id}/management`;
        // this.$router.push({ path: `/dorm-owner/${userInfor.id}/management` });
    }

    private async onSubmitRegisterDormOwner(): Promise<void> {
        await this.dowmOwnerInforFormRef.validate(async (valid) => {
            if (valid) {
                await this.onUpdateRoleDormOwner();
            }
        });
    }

    @Ref('dowmOwnerInfor-form')
    private dowmOwnerInforFormRef: ElForm;
    private rules: any = {
        fullName: [
            {
                required: true,
                message: String(i18n.t('common.message.fieldIsRequired')),
                trigger: ['blur'],
            },
            {
                pattern: /(^.{1,50}$)/,
                message: String(i18n.t('Họ và tên phải từ 1-50 kí tự')),
                trigger: ['blur', 'change'],
            },
        ],
        email: [
            {
                required: true,
                message: String(i18n.t('common.message.fieldIsRequired')),
                trigger: ['blur'],
            },
            {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: String(i18n.t('Bạn chưa điền đúng dạng email')),
                trigger: ['blur', 'change'],
            },
        ],
        fbUrl: [
            {
                required: true,
                message: String(i18n.t('common.message.fieldIsRequired')),
                trigger: ['blur'],
            },
            {
                pattern:
                    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
                message: String(i18n.t('Phải có dạng facebook.com/')),
                trigger: ['blur', 'change'],
            },
        ],
        phone: [
            {
                required: true,
                message: String(i18n.t('common.message.fieldIsRequired')),
                trigger: ['blur'],
            },
            {
                pattern: /((84|0[3|5|7|8|9])+([0-9]{8})\b)/,
                message: String(i18n.t('Chưa đúng định dạng')),
                trigger: ['blur', 'change'],
            },
        ],
    };

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
.header {
    font-size: 16px;
    color: #0e5ba9;
    padding: 10px;
    background-color: #ffffff;
    font-weight: bold;
    border-bottom: 1px solid;

    .title {
        cursor: pointer;
        display: inline-block;
    }

    .right-layout {
        display: flex;
        align-items: center;
        margin-left: 50px;
        .el-image {
            width: 40px;
            height: 40px;
            border-radius: 58%;
        }
    }

    /deep/ .el-dropdown-link {
        margin-left: 10px;
        color: #0e5ba9;
        user-select: none;
    }

    /deep/ .el-button--text {
        color: #0e5ba9;
    }

    .lang-icon {
        margin: 0 5px;
        font-size: 25px;
        color: #adb5bd;
    }
}
</style>
