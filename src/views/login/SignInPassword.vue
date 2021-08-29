<template>
    <el-row class="row">
        <div>
            <el-card class="sign-in-user">
                <el-form @submit.native.prevent="onSign_in">
                    <h2>Chào mừng {{ username }}</h2>

                    <el-form-item class="" label="Mật khẩu" prop="pass">
                        <el-input
                            type="password"
                            v-model="password"
                            autocomplete="off"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <span class="Msg-checkpassFail" v-if="checkPassword === true">{{
                        mgsCheckPassword
                    }}</span>
                    <div class="signIn-btn">
                        <el-button class="btn-signIn" @click="onSign_in()">
                            Đăng nhập
                        </el-button>
                    </div>
                    <div class="divider">
                        
                        <a class="divider-text" href="" @click="goRecoverPassword">Quên mật khẩu</a>
                    </div>
                    <div></div>
                </el-form>


                <el-dialog title="Thông báo" :visible.sync="dialogVisible" width="30%" center>
                    <span> Tài khoản của bạn bạn đã bị khóa vui long liên hệ với admin </span>
                    <div>
                        <span>Email : fdorm@fpt.edu.vn</span>
                        <span>Phone : 0912.999.999</span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="onHomePage"
                            >Quay lại trang chủ</el-button
                        >
                    </span>
                </el-dialog>
            </el-card>
        </div>
    </el-row>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import TextInputFormItem from '@/components/form-item/TextInputFormItem.vue';
    import VueCookies from 'vue-cookies-ts';
    import Router from '@/router/Router';
    import LoginApi from '@/api/login-api/LoginApi';
    import router from '@/router/Router';
    import Pages from '@/router/Pages';
    import UserApi from '@/api/user-api/UserApi';
    import UserEntity from '@/types/classes/UserEntity';
    import Roles from '@/security/Roles';
    import {CookieUtils} from "@/utils/CookieUtils";
    import Auth from '@/security/Authentication';
import Authentication from '@/security/Authentication';

    @Component({
        components: {
            TextInputFormItem
        }
    })
    export default class SignInPassword extends Vue {
        private password: string = null;
        private username: string = null;
        private dialogVisible: boolean = false;
        private checkPassword: boolean = false;
        private mgsCheckPassword: string = 'Bạn đã nhập sai mật khẩu';

        created() {
            this.username =
                this.$route.params.username != null ? this.$route.params.username : null;
            console.log(this.username);
            console.log(this.$router);
        }

        private goRecoverPassword() :void {
            this.$router.push({name : Pages.forgotPassword.name , params : {username :this.username}})
        }
        private onHomePage():void {
            router.push({path : Pages.home.path})
        }
        private async onSign_in(): Promise<void> {
            const loginRequest = {
                username: this.username,
                password: this.password
            };

            // goi api login tra va token
            const login = await LoginApi.onLoginSuccess(loginRequest);
            console.log(login.loginSucces);
            if (login.loginSucces === false) {
                this.checkPassword = true;
            } else {
                this.$cookies.config({ expires: '1h' });
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                // add token vao localStorage
                localStorage.setItem('jwtToken', login.token);

                this.$cookies.set('access_token', login.token);
                // goi api /me lay ra infor user
                const userInfor = await UserApi.getUserInfor();
                
                
                
                
                
                
                if(userInfor.status === 'Banned'){
                    this.dialogVisible = true;    
                }else{
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
                    
            }
        }
    }
</script>

<style lang="scss" scoped>
    .divider {
        margin-top: 27px;
        margin-left: -1px;
        text-align: center;
    }
    .divider-text {
        white-space: nowrap;
        margin: 0 8px 2px;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        margin-top: 10px;
        color: #0071c2;
        text-decoration: none;
    }
    .sign-in-user {
        margin: auto;
        width: 25%;
        text-align: left;
        margin-top: 20px;
        height: 380px;
    }
    .signIn-btn {
        text-align: center;
    }
    .btn-signIn {
        position: relative;
        color: #fff;
        vertical-align: middle;
        border: 1px solid #0071c2;
        border-radius: 2px;
        align-items: center;
        background-color: #0071c2;
        width: 100%;
    }
    .row {
        height: 88vh;
    }
    .Msg-checkpassFail {
        color: #c00 !important;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin-top: 4px;
    }
</style>
