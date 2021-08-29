<template>
    <div style="height: 100vh">
        <p class="title">Home</p>
        <el-date-picker placeholder="Năm" type="year" v-model="yearToStatistic"></el-date-picker>
        <el-row style="margin-top: 16px">
            <el-col>
                <el-row :gutter="20" type="flex" align="middle" justify="center">
                    <el-col :span="5">
                        <el-row class="static" style="background: #2ad33d">
                            <el-col :span="8" class="icon"
                            ><i class="fal fa-rectangle-landscape"></i>
                            </el-col>
                            <el-col :span="16" class="number">
                                <h4>{{firstMonth}} - {{currentMonth}}</h4>
                                <h2>{{totalAvailableUntilCurrentMonth}}</h2>
                                <span>Còn trống</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <el-row class="static" style="background: #ebcd27">
                            <el-col :span="8" class="icon"><i class="fal fa-tools"></i></el-col>
                            <el-col :span="16" class="number">
                                <h4>{{firstMonth}} - {{currentMonth}}</h4>
                                <h2>{{totalFixingUntilCurrentMonth}}</h2>
                                <span>Đang sửa chữa</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <el-row class="static" style="background: #d3302a">
                            <el-col :span="8" class="icon"><i class="fal fa-user"></i></el-col>
                            <el-col :span="16" class="number">
                                <h4>{{firstMonth}} - {{currentMonth}}</h4>
                                <h2>{{totalInUseUntilCurrentMonth}}</h2>
                                <span>Đang sử dụng</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <el-row class="static" style="background: #0e5ba9">
                            <el-col :span="8" class="icon"><i class="far fa-sigma"></i></el-col>
                            <el-col :span="16" class="number">
                                <h4>{{firstMonth}} - {{currentMonth}}</h4>
                                <h2>{{totalAverageUntilCurrentMonth}}</h2>
                                <span>Average</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row type="flex" align="middle" justify="center">
                    <GChart
                            :data="statisticData.chartData"
                            :options="statisticData.chartOptions"
                            style="width: auto; min-width: 100%; height: 80vh; margin-bottom: 16px"
                            type="ColumnChart"
                    />
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    // @ts-ignore
    import {GChart} from 'vue-google-charts';
    import moment from 'moment';
    import StatisticData from '@/types/StatisticData';
    import HomeStatisticApi from '@/api/dorm-owner-api/HomeStatisticApi';
    import UserEntity from '@/types/classes/UserEntity';

    @Component({
        components: {
            GChart,
        },
    })
    export default class HomeStatistic extends Vue {
        private loading: boolean = false;
        private yearToStatistic: any = moment();
        private user: UserEntity = null;
        private userId: number = null;
        private currentMonth: string = moment().format("MM/YYYY");
        private firstMonth: string = moment().startOf('year').format("MM/YYYY");
        private totalAvailableUntilCurrentMonth = 0;
        private totalFixingUntilCurrentMonth = 0;
        private totalInUseUntilCurrentMonth = 0;
        private totalAverageUntilCurrentMonth = 0;


        private statisticData: StatisticData = {
            chartData: [
                ['Tháng', 'Còn trống', 'Đang sửa chữa', 'Đang sử dụng', 'Average'],
                ['2021/05', 165, 938, 522, 614.6],
                ['2021/06', 135, 1120, 599, 682],
                ['2021/07', 157, 1167, 587, 623],
                ['2021/08', 139, 1110, 615, 609.4],
                ['2021/09', 136, 691, 629, 569.6],
            ],
            chartOptions: {
                title: 'Thống kê số phòng trạng thái và tháng',
                vAxis: {title: 'Số phòng'},
                hAxis: {title: 'Tháng'},
                seriesType: 'bars',
                legend: {maxLines: 2},
                series: {
                    0: {color: '#2AD33D'},
                    1: {color: '#EBCD27'},
                    2: {color: '#D3302A'},
                    3: {color: '#0e5ba9', type: 'line'},
                },
            },
        };

        created() {
            this.user = JSON.parse(localStorage.getItem('CurrentUser'));
            this.userId = this.user != null ? this.user.id : null;
            this.getStatistic(Number(moment(this.yearToStatistic).format('YYYY')));
            this.getTotalHomeStatistic(Number(moment(this.yearToStatistic).format('YYYY')));
        }

        @Watch('yearToStatistic')
        private yearToStatisticChange() {
            this.getStatistic(Number(moment(this.yearToStatistic).format('YYYY')));
        }

        private async getTotalHomeStatistic(year: number): Promise<void> {
            try {
                this.loading = true;
                const response = await HomeStatisticApi.getTotalHomeStatistic(year, this.userId);
                if (response) {
                    this.totalAvailableUntilCurrentMonth = response.totalAvailableUntilCurrentMonth;
                    this.totalFixingUntilCurrentMonth = response.totalFixingUntilCurrentMonth;
                    this.totalInUseUntilCurrentMonth = response.totalInUseUntilCurrentMonth;
                    this.totalAverageUntilCurrentMonth = response.totalAverageUntilCurrentMonth;
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

        private async getStatistic(year: number): Promise<void> {
            try {
                this.loading = true;
                const response = await HomeStatisticApi.getHomeStatistic(year, this.userId);
                if (response) {
                    let size = Array.isArray(response) ? response.length : Object.keys(response).length;
                    let statisticData = new StatisticData();
                    statisticData.chartData = [
                        ['Tháng', 'Còn trống', 'Đang sửa chữa', 'Đang sử dụng', 'Average'],
                    ];
                    for (let i = 0; i < size; i++) {
                        let charDataElement = [
                            response[i].month + '/' + response[i].year,
                            response[i].numAvailableRooms,
                            response[i].numFixingRooms,
                            response[i].numInUseRooms,
                            response[i].averageNumberRooms,
                        ];
                        statisticData.chartData.push(charDataElement);
                    }
                    this.statisticData.chartData = statisticData.chartData;
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

    .static {
        box-shadow: 0 3px 6px #00000029;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 20px 10px 0;

        .number {
            padding: 15px;
            background: white !important;
            margin-left: 1px;

            span {
                font-size: 14px;
                color: #999999;
            }
        }

        h2, h4{
            margin: 0 0 15px 0;
        }

        i {
            color: white;
            font-size: 40px;
        }
    }
</style>
