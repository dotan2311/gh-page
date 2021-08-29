<template>
    <el-row class="feeds">
        <el-col><h4 style="margin: 0 0 10px 0">Bài đánh giá của bạn:</h4></el-col>
        <el-col :span="2">
            <el-avatar
                icon="el-icon-user-solid"
                :src="'data:image/png;base64,' + yourFeedBack.avatar"
            ></el-avatar>
        </el-col>
        <el-col :span="22">
            <el-row>
                <el-col class="user-name" v-if="yourFeedBack.userFullName">{{ yourFeedBack.userFullName }}</el-col>
                <el-col class="user-name" v-else>{{ yourFeedBack.userName }}</el-col>
                <el-col class="user-name" :span="8"
                    ><el-rate
                        v-model="yourFeedBack.roomRateEntity.ratePoint"
                        disabled
                        text-color="#ff9900"
                    >
                    </el-rate
                ></el-col>
                <el-col class="time" :span="16">
                    <i class="el-icon-time"></i>
                    <span style="padding-left: 5px">{{
                        time_ago(yourFeedBack.roomRateEntity.createdTime)
                    }}</span>
                </el-col>
                <el-col class="feed-text">
                    {{ yourFeedBack.roomRateEntity.comment }}
                </el-col>
                <el-col class="edit-feedback"
                    ><span @click="editFeedBack" class="edit">Chỉnh sửa</span
                    ><span @click="centerDialogVisible = true" class="delete">Xóa</span></el-col
                >
            </el-row>
        </el-col>
        <el-dialog
            title="Xóa đánh giá"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
            append-to-body
        >
            <p style="text-align: center">Bạn có chắc chắn muốn xóa bài đánh giá này</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Hủy</el-button>
                <el-button type="primary" @click="deleteFeedBack">Xác Nhận</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script lang="ts">
import UserRoomRateApi from '@/api/user-api/UserRoomRateApi';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertService from '@/services/AlertService';
import i18n from '@/i18n';
enum Events {
    /** emit event UPDATE_VALUE when form item value is changed. */
    CHANGE_CHECKCMTED = 'change-checkCmnted',
    EDIT_FEEDBACK = 'edit-feedBack',
}
@Component({
    components: {},
})
export default class EditFeedBack extends Vue {
    @Prop({ required: false }) private yourFeedBack: any;
    private centerDialogVisible: boolean = false;
    private async deleteFeedBack(): Promise<any> {
        try {
            await UserRoomRateApi.deleteFeedBack(this.yourFeedBack.roomRateEntity.code);
        } catch (error) {
            AlertService.error(String(i18n.t('common.message.serverErrorMessage')));
        } finally {
            this.$emit(Events.CHANGE_CHECKCMTED);
            this.centerDialogVisible = false;
            AlertService.success(String(i18n.t('common.message.deleteSuccess')));
        }
    }
    private editFeedBack() {
        this.$emit(Events.EDIT_FEEDBACK, this.yourFeedBack.roomRateEntity);
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
.feeds {
    // border-top: 1px solid #bbbbbb;
    // margin-top: 10px;
    padding: 10px;
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
    .edit-feedback {
        padding-top: 10px;
        font-size: 12px;
        color: gray;
        font-weight: 700;
        .edit {
            cursor: pointer;
        }
        .delete {
            padding-left: 30px;
            cursor: pointer;
        }
        .edit:hover,
        .delete:hover {
            text-decoration: underline;
        }
    }
}
</style>