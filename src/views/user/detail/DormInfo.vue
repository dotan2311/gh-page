<template>
    <div class="dorm-info">

        <el-card class="box-card">
            <!-- thẻ toàn khu trọ -->

            <div class="clearfix" slot="header">
                <i class="el-icon-s-home"></i>
                <span class="head-info">Thông tin dãy trọ</span>

            </div>
            <!-- thẻ thông tin trọ -->
            <div class="info">
                <div class="name-dorm">Dãy trọ {{ NameInn }} thuộc khu trọ {{NameInn}}
                    <el-rate class="rate"
                             disabled
                             score-template="{value} points"
                             show-score
                             text-color="#ff9900"
                             v-model="value">
                    </el-rate>

                </div>
                <div class="address">
                    Địa chỉ:{{address}}
                </div>

            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class DormInfo extends Vue {
        private NameInn: string;
        private Phone: string;
        private Facebook: string;
        private address: string;
        private value: number;

        constructor() {
            super();
            this.NameInn = `HaLoInn`;
            this.value = 4.5;
            this.address = `KM29-Khu công nghệ cao Hòa Lạc - Huyện Thạch Thất - Hà Nội`;
        }
    }
</script>

<style lang="scss" scoped>
    .dorm-info {
        padding-top: 10px;

        .name-dorm {
            font-size: 30px;
            font-family: "Times New Roman", Times, serif;

        }


        .el-icon-s-home, .head-info {
            color: rgb(32, 209, 32);
            font-size: 30px;
            font-weight: bold;
        }

        .head-info {
            font-size: 30px;
            font-family: "Times New Roman", Times, serif;
            padding-left: 15px;

        }

        .rate {
            padding-bottom: 20px;
        }
    }


</style>