<template>
    <div style="height: 100vh">
        <p class="title">Thống kê thời gian sử dụng phòng trong năm</p>
        <el-date-picker
                placeholder="Năm"
                type="year"
                v-model="yearToStatistic">
        </el-date-picker>
        <el-row style="margin-top: 16px">
            <el-col :key="data.id" :span="8" v-for="data in statisticData">
                <GChart
                        :data="data.chartData"
                        :options="data.chartOptions"
                        style="width: 600px; height: 300px;margin-bottom: 16px;"
                        type="PieChart"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import {Component, Ref, Vue, Watch} from 'vue-property-decorator';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    // @ts-ignore
    import {GChart} from 'vue-google-charts';
    import moment from 'moment';
    import RoomStatisticApi from '@/api/dorm-owner-api/RoomStatisticApi';
    import StatisticData from '@/types/StatisticData';
    import UserEntity from '@/types/classes/UserEntity';

    @Component({
        components: {
            GChart,
        },
    })
    export default class RoomStatistic extends Vue {
        private loading: boolean = false;
        private user: UserEntity = null;
        private userId: number = null;
        private yearToStatistic: any = moment();

        private availableDays: any = [];
        private fixingDays: any = [];
        private inUseDays: any = [];

        private statisticData: Array<StatisticData> = [];

        created() {
            this.user = JSON.parse(localStorage.getItem('CurrentUser'));
            this.userId = this.user != null ? this.user.id : null;
            this.getStatistic(Number(moment(this.yearToStatistic).format('YYYY')));
        }

        @Watch('yearToStatistic')
        private yearToStatisticChange() {
            this.getStatistic(Number(moment(this.yearToStatistic).format('YYYY')));
        }

        private async getStatistic(year: number): Promise<void> {
            try {
                this.loading = true;
                this.statisticData = [];
                const response = await RoomStatisticApi.list(year, this.userId);
                if (response) {
                    let size = Array.isArray(response) ? response.length : Object.keys(response).length;
                    for (let i = 0; i < size; i++) {
                        let statisticData = new StatisticData();
                        statisticData.id = response[i].roomId;
                        statisticData.chartData = [['Status', 'Day of year']];
                        if (response[i].availableDays != 0 || response[i].fixingDays != 0 || response[i].inUseDays != 0) {
                            this.availableDays = ['Còn trống (ngày)', response[i].availableDays];
                            this.fixingDays = ['Đang sửa chữa (ngày)', response[i].fixingDays];
                            this.inUseDays = ['Đang sử dụng (ngày)', response[i].inUseDays];
                            statisticData.chartData.push(this.availableDays);
                            statisticData.chartData.push(this.fixingDays);
                            statisticData.chartData.push(this.inUseDays);
                        }
                        statisticData.chartOptions = {
                            title: 'Phòng: ' + response[i].roomName,
                            slices: {
                                0: {color: '#2AD33D'},
                                1: {color: '#EBCD27'},
                                2: {color: '#D3302A'},
                            },
                        };
                        this.statisticData.push(statisticData);
                    }
                }
            } catch (error) {
                AlertService.error(
                        String(i18n.t('common.alertTitle.failed')),
                        String(i18n.t('common.message.serverErrorMessage')),
                        2000
                );
            } finally {
                this.loading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        height: 49px;
        text-align: left;
        font-size: 34px;
        font-weight: bold;
    }

    /deep/ .el-col {
        g text {
            font-size: 24px;
        }

        g g g text {
            font-size: 18px;
        }

        text {
            font-size: 24px;
        }
    }
</style>
