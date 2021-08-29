<template>
    <div class="dorm-service">
        <el-card class="box-card">
            <!-- list dịch vụ -->
            <div class="clearfix" slot="header">

                <span class="head-info">Tiện ích dãy trọ</span>


            </div>
            <el-row :key="o" :offset="index > 0 ? 2 : 0" v-for="(o, index) in 4">
                <el-col :key="o" :offset="index > 0 ? 2 : 0" :span="8" v-for="(o, index) in 2">
                         <span class="service-content">   
                         <el-avatar :src="iconsrc" shape="square"></el-avatar>
                        <span class="text">{{service}}</span>
                        </span>
                </el-col>
            </el-row>


        </el-card>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class DormImage extends Vue {
        private iconsrc: String;
        private service: String;

        constructor() {
            super();
            this.iconsrc = `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`;
            this.service = `tien ich 1`;
        }
    }
</script>

<style lang="scss" scoped>

    .dorm-service {
        padding-top: 10px;

        .box-card {
            height: 400px;
        }

        .service-content {
            font-size: 25px;
            padding: 10px;
            display: flex;
            justify-content: center;
            margin-left: -70px;

        }

        .text {
            text-align: center;
            font-family: "Times New Roman", Times, serif;
            padding-left: 10px;

        }

        .head-info {
            font-size: 30px;
            font-family: "Times New Roman", Times, serif;
            padding-left: 15px;
            color: rgb(32, 209, 32);
            font-weight: bold;
            padding: 0 -10px;
        }
    }


</style>