<template>
    <el-row class="host-info">
        <el-row>
            <el-col :span="5" class="avt">
                <el-image
                    v-if="avartaUrl"
                    shape="circle"
                    fit="cover"
                    :src="'data:image/png;base64,' + avartaUrl"
                >
                </el-image>

                <el-image v-else shape="circle" fit="cover" size="large" :src="defaultAvt">
                </el-image>
            </el-col>
            <el-col :span="19">
                <span class="name" v-if="hostName">
                    {{ hostName }}
                </span>
                <span class="name" v-else>
                    {{ userName }}
                </span>
                <span class="post-number">Số bài đăng: {{ postNumber }}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <hr />
            </el-col>
        </el-row>
        <el-row class="contact">Liên hệ:</el-row>
        <el-row style="padding-top: 5px">
            <el-col :span="20" class="phone">
                <el-row>
                    <el-col :span="span">
                        <i class="el-icon-phone"></i>
                        <span class="phone-number" v-if="viewPhone">{{ phoneNumber }}</span>
                        <span class="phone-number" v-else>{{ phone }}</span>
                    </el-col>
                    <el-col :span="11">
                        <span
                            class="click"
                            @click="
                                viewPhone = !viewPhone;
                                span = 24;
                            "
                            v-if="!viewPhone"
                        >
                            Bấm để hiện số</span
                        >
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="4" class="fb">
                <el-button @click="toFacebook" type="primary"
                    ><i class="fab fa-facebook-f"></i
                ></el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class HostInfo extends Vue {
    @Prop({ required: false }) private avartaUrl: string;
    @Prop({ required: true }) private hostName: string;
    @Prop({ required: true }) private userName: string;
    @Prop({ required: true }) private postNumber: number;
    @Prop({ required: false }) private phoneNumber: string;
    @Prop({ required: false }) private fbUrl: string;

    private phone: string = null;
    private viewPhone: boolean = false;
    private span: number = 13;
    private subAvatarUrl: string = null;
    private defaultAvt: string = require('@/assets/images/defaultAvt.png');

    created() {
        this.phone = this.phoneNumber;
        this.subAvatarUrl = this.avartaUrl;
    }

    @Watch('phoneNumber')
    private phongChange(val: any) {
        this.phone = val.slice(0, 4) + '****';
    }

    @Watch('avartaUrl')
    private avtChange(val: any) {
        this.subAvatarUrl = val;
    }
    private toFacebook() {
        window.open(this.fbUrl);
    }
}
</script>

<style lang="scss" scoped>
.host-info {
    border: solid 1px #e0e0e0;
    padding: 10px;
    margin: 10px 0 0 0;
    border-radius: 5px;

    .avt {
        padding: 0 0 0 0;
        .el-image {
            width: 50px;
            height: 50px;
            border-radius: 58%;
        }
    }
    .el-avatar--large {
        width: 50px;
        height: 50px;
    }
    .name {
        color: #1a4bb7;
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 5px 0;
    }
    .post-number {
        font-size: 14px;
        line-height: 1.43;
        color: #2b2b2b;
        display: block;
        padding: 10px 0 0 0;
    }
    .phone {
        background: green;
        color: white;
        padding: 10px;
        border-radius: 5px;
        .phone-number {
            padding: 0 0 0 10px;
            font-size: 17px;
            font-weight: bold;
        }
        .click {
            font-size: 14px;
            float: right;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .fb {
        color: white;
        border-radius: 5px;
        padding-left: 3px;
        padding-right: 5px;
        .el-button--primary {
            background-color: #3b5998;
            border-color: #3b5998;
        }
        .el-button {
            padding: 12px 17px;
        }
    }
    .contact {
        font-weight: bold;
    }
}
</style>