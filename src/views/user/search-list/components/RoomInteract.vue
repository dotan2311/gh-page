<template>
    <el-row class="room-interact">
        <el-col :span="12" class="interact">
            <span>
                <i class="fas fa-calendar-alt"></i>
            </span>
            <span>{{ time_ago(createDate) }}</span>
        </el-col>
        <!-- <el-col :span="12" class="interact">
            <span>
                <i class="fas fa-eye"></i>
            </span>
            <span>10 Lượt xem</span>
        </el-col> -->
    </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RoomInteract extends Vue {
    @Prop({ required: true }) private createDate: Date;
    private subCreateDate: Date;
    constructor() {
        super();
        this.subCreateDate = this.createDate;
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
            [604800, 'ngày', 86400], // 60*60*24*7, 60*60*24
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
            token = 'Hiện tại';
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

<style>
.room-interact {
    margin: 0 0 10px 0;
}

.room-interact .interact span {
    padding: 0 10px 0 0;
    font-size: 14px;
}
</style>