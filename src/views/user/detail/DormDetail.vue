<template>
    <div id="dormDetail">
        <el-row>
            <!--       slide show -->
            <dorm-image/>
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="16"
            >
                <div class="grid-content">
                    <el-row>
                        <el-col :span="18">
                            <div class="grid-content">
                                <!-- show thông tin -->
                                <dorm-info/>
                                <!-- mô tả -->
                                <dorm-description/>
                                <!-- show dich vu -->
                                <dorm-service/>
                            </div>
                        </el-col>
                        <!-- show thông tin thêm -->
                        <el-col :span="5">
                            <div class="grid-content">
                                <div class="map">
                                    <el-card class="box-card">
                                        <div class="img-map">
                                            <el-image></el-image>
                                        </div>
                                        <div class="line-bottom"></div>
                                        <div class="suggest">Thông tin cần thêm</div>
                                        <div :key="o" class="text item suggest-item" v-for="o in 4">
                                            {{ "Thông tin " + o }}
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <!-- show thông tin chi tiết từng phòng -->
                        <room-management/>
                    </el-row>
                </div
                >
            </el-col>
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>
        </el-row>
    </div>
</template>


<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import DormDescription from './DormDescription.vue';
    import DormImage from './DormImage.vue';
    import DormInfo from './DormInfo.vue';
    import DormService from './DormService.vue';
    import RoomManagement from './RoomManagement.vue';
    import OwnerInfomation from './OwnerInformation.vue';

    @Component({
        components: {
            DormImage,
            DormInfo,
            DormDescription,
            DormService,
            RoomManagement,
            OwnerInfomation,
        },
    })
    export default class DormDetail extends Vue {
    }
</script>

<style lang="scss" scoped>
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .box-card {
        width: 100%;
        height: 96%;
    }

    .map {
        height: 1125px;
        width: 300px;
        display: flex;
        padding-top: 10px;
    }

    .head-info {
        font-size: 30px;
        font-family: "Times New Roman", Times, serif;
        padding-left: 15px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .img-map {
        width: 100%;
        height: 100px;
        border: 1px solid red;
    }

    .line-bottom {
        border-bottom: 1px solid gray;
        padding-top: 20px;
    }

    .radius,
    .suggest {
        font-size: 25px;
        font-family: "Times New Roman", Times, serif;
        padding-top: 20px;
        font: bold;
    }

    .suggest-item {
        font-size: 20px;
        font-family: "Times New Roman", Times, serif;
        padding: 5px;
    }

    #dormDetail {
        margin: 0 8px;
    }
</style>
