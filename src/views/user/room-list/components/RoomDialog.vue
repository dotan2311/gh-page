<template>
    <el-dialog
        top="5vh"
        :title="name"
        @closed="closed"
        @open="open"
        :visible.sync="dialog"
        class="room-dialog"
    >
        <el-row>
            <el-col class="detail" :span="9">
                <el-row>
                    <el-col class="over-view">
                        <span>Tổng quan:</span>
                    </el-col>

                    <el-col class="item" :span="7">
                        <i class="far fa-star icon"></i>
                        <span>Đánh giá: </span>
                    </el-col>
                    <el-col class="rate" :span="17">
                        <el-rate v-model="rateMean" show-score disabled text-color="#ff9900">
                        </el-rate>
                    </el-col>
                    <el-col class="item" :span="12">
                        <i class="far fa-comments icon"></i>
                        <span>Lượt đánh giá: {{ numberRate }}</span>
                    </el-col>
                    <el-col class="item" :span="24">
                        <i class="far fa-calendar-alt icon"></i>
                        <span>Ngày đăng: {{ formatDate(date) }}</span>
                    </el-col>
                    <el-col class="over-view sub">
                        <span>Đặc điểm:</span>
                    </el-col>
                    <el-col class="item">
                        <i class="far fa-warehouse icon"></i>
                        <span>Diện tích: {{ square }} m²</span>
                    </el-col>
                    <el-col class="item">
                        <i class="fal fa-users icon"></i>
                        <span>Sức chứa: {{ capacity }} người</span>
                    </el-col>
                    <el-col class="item">
                        <i class="fal fa-home-lg-alt icon"></i>
                        <span v-if="contained == true">Thiết kế: Khép kín</span>
                        <span v-else>Thiết kế: Không khép kín</span>
                    </el-col>
                    <el-col class="over-view sub">
                        <span>Tiện ích:</span>
                    </el-col>
                    <el-col class="item" :span="12">
                        <i class="far fa-wifi icon"></i>
                        <span v-if="roomUtiliti.hasWifi == true">Wifi</span>
                        <span v-else>---</span>
                    </el-col>
                    <el-col class="item" :span="12">
                        <i class="fal fa-snow-blowing icon"></i>
                        <span v-if="roomUtiliti.hasAirConditioner == true">Điều hòa</span>
                        <span v-else>---</span>
                    </el-col>
                    <el-col class="item" :span="12">
                        <i class="fal fa-dryer-alt icon"></i>
                        <span v-if="roomUtiliti.hasWashingMachine == true">Máy giặt</span>
                        <span v-else>---</span>
                    </el-col>
                    <el-col class="item" :span="12">
                        <i class="far fa-snowflake icon"></i>
                        <span v-if="roomUtiliti.hasFridge == true">Tủ lạnh</span>
                        <span v-else>---</span>
                    </el-col>
                    <el-col class="item" :span="12">
                        <i class="fal fa-fireplace icon"></i>
                        <span v-if="roomUtiliti.hasStove == true">Bếp nấu</span>
                        <span v-else>---</span>
                    </el-col>
                    <el-col class="item" :span="12">
                        <i class="fal fa-cabinet-filing icon"></i>
                        <span v-if="roomUtiliti.hasWardrobe == true">Tủ quần áo</span>
                        <span v-else>---</span>
                    </el-col>
                    <el-col class="item price" :span="24">
                        <i class="fas fa-money-check-alt icon"></i>
                        <span>Giá: {{ formatPrice(price) }}</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="feedback" :span="15">
                <el-row>
                    <!-- commented -->
                    <el-col class="thanks" v-if="checkCmted == true">
                        <edit-feed-back
                            :yourFeedBack="yourFeedBack"
                            @change-checkCmnted="afterDelete"
                            @edit-feedBack="editFeedBack"
                        />
                    </el-col>

                    <el-col class="over-view" v-if="checkCmted == false">
                        <span v-if="checkCmted == false">Đánh giá:</span>
                    </el-col>
                    <el-col class="star-rate" v-if="checkCmted == false">
                        <el-row>
                            <el-col :span="24" class="text">Mức độ hài lòng của bạn:</el-col>
                            <el-col :span="12" class="rating">
                                <el-rate v-model="rate"></el-rate>
                            </el-col>
                            <el-col :span="12" v-if="checkRateValid == false">
                                <span class="err-mess">{{ errRateMess }}</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col v-if="checkCmted == false">
                        <el-row class="list-feedback">
                            <el-col :span="21">
                                <el-input
                                    maxlength="1000"
                                    show-word-limit
                                    type="textarea"
                                    :rows="2"
                                    placeholder="Nhận xét của bạn về phòng"
                                    v-model="feedback"
                                >
                                </el-input>
                            </el-col>

                            <el-col :span="3">
                                <el-button @click="onSendFeedBack" type="warning" class="send-bnt">
                                    <i class="far fa-paper-plane"></i>
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-col v-if="checkCmtValid == false">
                            <span class="err-mess">{{ errCmtMess }}</span>
                        </el-col>
                    </el-col>
                    <el-col class="feed-back">
                        <span class="no-feed" v-if="rateLitshLength == 0"
                            >Chưa có đánh giá nào.</span
                        >
                        <el-row class="feeds" v-for="feed in rateList" :key="feed.index">
                            <el-col :span="2">
                                <el-avatar
                                    icon="el-icon-user-solid"
                                    :src="'data:image/png;base64,' + feed.avatar"
                                ></el-avatar>
                            </el-col>
                            <el-col :span="22">
                                <el-row>
                                    <el-col class="user-name" v-if="feed.userFullName">{{
                                        feed.userFullName
                                    }}</el-col>
                                    <el-col class="user-name" v-else>{{ feed.userName }}</el-col>
                                    <el-col class="user-name" :span="8"
                                        ><el-rate
                                            v-model="feed.roomRateEntity.ratePoint"
                                            disabled
                                            text-color="#ff9900"
                                        >
                                        </el-rate
                                    ></el-col>
                                    <el-col class="time" :span="16">
                                        <i class="el-icon-time"></i>
                                        <span style="padding-left: 5px">{{
                                            time_ago(feed.roomRateEntity.createdTime)
                                        }}</span>
                                    </el-col>
                                    <el-col class="feed-text">
                                        {{ feed.roomRateEntity.comment }}
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col class="paging"
                        ><pagination
                            @chageCurPage="chageCurPage"
                            :currentPage="curPage"
                            :totalPage="totalPage"
                    /></el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog
            width="30%"
            title="Bạn chưa đăng nhập!"
            :visible.sync="innerVisible"
            center
            append-to-body
        >
            <p style="text-align: center">Hãy đăng nhập để có thể nhận xét về phòng.</p>

            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">Hủy bỏ</el-button>
                <el-button @click="goToLogin" type="primary">Đăng nhập</el-button>
            </span>
        </el-dialog>
    </el-dialog>
</template>

<script lang="ts">
import UserRoomApi from '@/api/user-api/UserRoomApi';
import UserRoomRateApi from '@/api/user-api/UserRoomRateApi';
import EditFeedBack from '../components/EditFeedBack.vue';
import { RoomUtilities } from '@/components/datatable/types';
import UserEntity from '@/types/classes/UserEntity';
import OldRoomRateEntity from '@/types/OldRoomRateEntity';
import RoomRateEntity from '@/types/classes/RoomRateEntity';
import { Component, Vue } from 'vue-property-decorator';
import Pagination from './../../search-list/components/Paginaion.vue';
import Pages from '@/router/Pages';
import AlertService from '@/services/AlertService';
import i18n from '@/i18n';
@Component({
    components: {
        Pagination,
        EditFeedBack,
    },
})
export default class RoomDialog extends Vue {
    private dialog: boolean = false;
    private name: string = null;
    private rate: number = null;
    private userRate: number = 4.5;
    private feedback: string = '';
    private code: string = null;
    private id: number = null;
    private rateMean: number = null;
    private numberRate: number = null;
    private date: string = '';
    private square: number = null;
    private contained: boolean = null;
    private type: number = null;
    private price: number = null;
    private capacity: number = null;
    private roomUtiliti: RoomUtilities = {
        hasWifi: false,
        hasAirConditioner: false,
        hasWashingMachine: false,
        hasFridge: false,
        hasStove: false,
        hasWardrobe: false,
        asBalcony: false,
        deleted: false,
    };
    //rate
    private curPage: number = null;
    private totalPage: number = null;
    private rateList: Array<any> = null;
    private rateLitshLength: number = null;
    //GetUser
    private user: UserEntity = null;
    //Feed back
    private rateEntity: RoomRateEntity = null;
    private loadingSend: boolean = false;
    private errCmtMess: string = null;
    private errRateMess: string = null;
    private checkRateValid: boolean = false;
    private checkCmtValid: boolean = false;
    private checkCmted: boolean = false;
    private innerVisible: boolean = false;
    private yourFeedBack: any = null;
    private editFbak: boolean = false;
    private oldFeedBack: OldRoomRateEntity = null;
    private rateCode: string = null;

    public showDialog(code: string, id: number): void {
        this.dialog = true;
        this.code = code;
        this.id = id;
    }
    private getUser() {
        if (localStorage.getItem('CurrentUser')) {
            let localUser = JSON.parse(localStorage.getItem('CurrentUser'));
            let roleNames: Array<string> = [];
            for (let i = 0; i < localUser.rolename.length; i++) {
                roleNames.push(localUser.rolename[i].name);
            }

            this.user = {
                id: localUser.id,
                username: localUser.username,
                avatarUrl: 'data:image/png;base64,' + localUser.bytes,
                roles: roleNames,
                fullName: localUser.fullName,
            };
        }
    }
    private async detailRoom(): Promise<any> {
        const detail = await UserRoomApi.detail(this.code);
        this.rateMean = parseFloat(detail.rateMean.toFixed(1));
        this.numberRate = detail.numberRate;
        this.date = detail.createdDate;
        this.square = detail.square;
        this.capacity = detail.capacity;
        this.contained = detail.contained;
        this.type = detail.type;
        this.roomUtiliti = detail.roomUtilityEntity;
        this.name = detail.name;
        this.price = detail.price;
    }

    private async onSendFeedBack(): Promise<void> {
        if (this.user != null) {
            try {
                this.loadingSend = true;

                if (this.rate == 0) {
                    this.checkRateValid = false;
                    this.errRateMess = 'Vui lòng đánh giá chúng tôi!';
                } else {
                    this.checkRateValid = true;
                }
                if (this.feedback.length == 0 || this.feedback.trim() == '') {
                    this.checkCmtValid = false;
                    this.errCmtMess = 'Vui lòng không để trống';
                } else if (this.feedback.length < 2) {
                    this.checkCmtValid = false;
                    this.errCmtMess = 'Nhận xét của bạn quá ngắn!';
                } else {
                    this.checkCmtValid = true;
                }
                if (this.checkCmtValid && this.checkRateValid) {
                    if (this.editFbak) {
                        this.oldFeedBack = {
                            code: this.rateCode,
                            roomId: this.id,
                            userId: this.user.id,
                            ratePoint: this.rate,
                            comment: this.feedback,
                        };
                        await UserRoomRateApi.editFeedBack(this.oldFeedBack);
                    } else {
                        console.log('else');
                        this.roomRate();
                        console.log(this.rateList);
                        console.log(this.checkCmted);
                        if (this.checkCmted) {
                            console.log('aaaaaaaaaaaaa');

                            AlertService.error(String(i18n.t('common.message.feedbacked')));
                        } else {
                            console.log('bbbbbbbbbbbbbbbbb');

                            this.rateEntity = {
                                roomId: this.id,
                                userId: this.user.id,
                                ratePoint: this.rate,
                                comment: this.feedback,
                            };
                            await UserRoomRateApi.newFeedBack(this.rateEntity);
                            this.roomRate();
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                if (this.checkCmtValid != false && this.checkRateValid != false) {
                    this.loadingSend = false;
                    this.editFbak = false;
                    AlertService.success(String(i18n.t('common.message.thanksForFeedBack')));
                }
            }
        } else {
            this.innerVisible = true;
        }
    }

    private async roomRate(): Promise<any> {
        const request = {
            roomId: this.id,
            page: this.curPage,
            limit: 5,
        };
        const rate = await UserRoomRateApi.rate(request);
        this.totalPage = rate.totalPage;
        this.rateList = rate.rateList;
        this.rateLitshLength = this.rateList.length;
        this.checkCommented(rate.rateList);
        console.log('roomrate ', this.checkCmted);
        console.log(this.rateList);
    }

    private checkCommented(Array: any) {
        if (this.user != null) {
            this.rateList.forEach((rate) => {
                if (rate.roomRateEntity.userId == this.user.id) {
                    this.checkCmted = true;
                    this.yourFeedBack = rate;
                    this.rateList.splice(this.rateList.indexOf(rate), 1);
                    return;
                }
            });
        }
    }
    private chageCurPage(val: any): void {
        this.curPage = val;
        this.roomRate();
    }
    private open() {
        this.getUser();
        this.detailRoom();
        this.roomRate();
        this.checkCmted = false;
    }
    private closed() {
        this.rate = 0;
        this.feedback = null;
        this.checkCmted = false;
        this.yourFeedBack = null;
        this.checkRateValid = true;
        this.checkCmtValid = true;
        this.editFbak = false;
    }
    private goToLogin() {
        this.$router.push({ path: Pages.signIn.path });
    }

    private editFeedBack(oldFeedBack: OldRoomRateEntity) {
        this.checkCmted = false;
        this.editFbak = true;
        this.rate = oldFeedBack.ratePoint;
        this.feedback = oldFeedBack.comment;
        this.rateCode = oldFeedBack.code;
    }

    private afterDelete() {
        this.rate = 0;
        this.feedback = null;
        this.checkCmted = false;
        this.checkRateValid = true;
        this.checkCmtValid = true;
    }

    private formatPrice(price: number): string {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
    }
    private convertDate() {}

    private formatDate(date: string) {
        var arr: string = date.split(' ')[0];
        var split: Array<string> = arr.split('/').reverse();
        var format: string = '';
        split.forEach((s) => {
            if (split.indexOf(s) != split.length - 1) {
                format = format + s + '/';
            } else {
                format = format + s;
            }
        });
        return format;
    }

    private time_ago(time: any): any {
        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                if (time.constructor === Date) time = time.getTime();
                break;
            default:
                time = +new Date();
        }
        var time_formats = [
            [60, 'giây', 1], // 60
            [120, '1 phút trước', '1 phút từ hiện tại'], // 60*2
            [3600, 'phút', 60], // 60*60, 60
            [7200, '1 giờ trước', '1 giờ từ hiện tại'], // 60*60*2
            [86400, 'giờ', 3600], // 60*60*24, 60*60
            [172800, 'Hôm qua', 'Ngày mai'], // 60*60*24*2
            [604800, 'days', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'Tuần trước', 'Tuần sau'], // 60*60*24*7*4*2
            [2419200, 'tuần', 604800], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'Tháng trước', 'Tháng sau'], // 60*60*24*7*4*2
            [29030400, 'tháng', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, '1 năm trước', 'Năm sau'], // 60*60*24*7*4*12*2
            [2903040000, 'Năm', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
            [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
            [58060800000, 'centuries', 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000,
            token = 'trước',
            list_choice = 1;

        if (seconds == 0) {
            return 'Vừa xong';
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'Vừa xong';
            list_choice = 2;
        }
        var i = 0,
            format;
        while ((format = time_formats[i++]))
            if (seconds < format[0]) {
                if (typeof format[2] == 'string') return format[list_choice];
                else return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return time;
    }
}
</script>

<style lang="scss" scoped>
.room-dialog {
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .el-dialog__body {
        color: black;
    }
    /deep/.el-dialog__header {
        border-bottom: 1px solid #bbbbbb;
    }
    .rate {
        padding-top: 14px;
        /deep/.el-rate__icon {
            margin: 0;
        }
    }

    .sub {
        margin-top: 20px;
    }

    .item {
        font-size: 15px;
        padding-top: 15px;
        .icon {
            padding-right: 10px;
        }
    }
    .price {
        margin: 20px 0 10px 0;
        font-weight: 600;
        color: green;
        font-size: 16px;
        border-top: #bbbbbb solid 1px;
    }
    .detail {
        padding-right: 10px;
    }
    .over-view {
        font-size: 15px;
        font-weight: 700;
        padding: 0px 0 10px 0;
        border-bottom: 1px solid #bbbbbb;
    }

    .feedback {
        border-left: 1px solid #bbbbbb;
        padding-left: 10px;
    }
    .list-feedback {
        padding-top: 10px;
        .el-button {
            padding: 14px 25px;
        }
    }
    .send-bnt {
        margin: 0px 5px 5px 5px;
    }
    .star-rate {
        background: #f7f5f0;
        border: 1px solid sandybrown;
        padding: 10px;
        .rating {
            padding-top: 5px;
        }
        /deep/.el-rate__icon {
            font-size: 23px;
        }
    }

    .feed-back {
        margin-top: 10px;
        height: 455px;
        overflow-y: scroll;
        overflow-x: hidden;
        border-bottom: 1px solid sandybrown;
        border-top: 1px solid sandybrown;
        position: relative;
        .no-feed {
            color: #bbbbbb;
            position: absolute;
            top: 200px;
            left: 200px;
        }
        .feeds {
            border-bottom: 1px solid #bbbbbb;
            padding: 10px 0 10px 0;
            .user-name {
                font-size: 17px;
                font-weight: 600;
                font-family: Helvetica, Arial, sans-serif;
            }
            /deep/.el-rate__icon {
                margin: 0;
            }
            .time {
                padding-top: 3px;
            }
            .feed-text {
                padding-top: 5px;
                word-break: break-word;
            }
            /deep/ .el-avatar > img {
                display: block;
                height: 100%;
                width: 100%;
            }
        }
    }
    .err-mess {
        color: red;
        font-size: 12px;
        margin-right: 2px;
    }
    .thanks {
        border: 2px solid green;
    }
    .paging {
        float: right;
    }
}
</style>