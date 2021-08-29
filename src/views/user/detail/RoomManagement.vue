<template>
    <div class="room-management">
        <el-card class="box-card">
            <div slot="header">
                <span class="head-info">Thông tin các phòng</span>
            </div>

            <div class="room-info">
                <el-card class="box-card" shadow="never">
                    <div class="room-description">
                        <el-row>
                            <el-col :span="5">
                                <el-card :body-style="{ padding: '0px' }">
                                    <img
                                            class="room-image"
                                            src="https://www.thespruce.com/thmb/EvdqR5HNV6Ev9RBv8qGqHNE8DoM=/3636x2045/smart/filters:no_upscale()/how-to-arrange-living-room-furniture-1976578-hero-c99074dcad854b669b91652046a39203.jpg"
                                    />
                                </el-card>
                            </el-col>
                            <el-col :span="18">
                                <div class="room">
                                    <div class="room-name">Phòng 101</div>
                                    <div class="float">
                                        <el-tag class="info">Tầng 1</el-tag>
                                        <el-tag class="info" type="success">Phòng delux</el-tag>
                                        <el-tag class="info" type="info">Số lượng</el-tag>
                                        <el-tag class="info" type="info">Diện tích</el-tag>
                                    </div>
                                    <el-rate
                                            class="rate"
                                            disabled
                                            score-template="{value} points"
                                            show-score
                                            text-color="#ff9900"
                                            v-model="value"
                                    >
                                    </el-rate>
                                    <div class="price">Giá: 2999999đ / tháng</div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- menu phong -->

                    <el-tabs @tab-click="handleClick" v-model="activeName">
                        <el-tab-pane label="Thông tin" name="first">{{
                            infoRoom
                            }}
                        </el-tab-pane>
                        <el-tab-pane label="Đánh giá và Bình luận" name="second">
                            <el-card class="box-rate">
                                <el-rate :colors="colors" class="rating" v-model="value2">
                                </el-rate>

                                <el-input
                                        :autosize="{ minRows: 2, maxRows: 4 }"
                                        class="input-rating"
                                        placeholder="Please input"
                                        type="textarea"
                                        v-model="textarea2"
                                >
                                </el-input>
                                <el-button class="submit" round type="success"
                                >submit
                                </el-button
                                >
                            </el-card>
                            <!-- view rate -->
                            <el-card>
                                <div class="info-user">
                                    <el-avatar :size="50">
                                        <img
                                                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                                        />
                                    </el-avatar>

                                    <div class="rate_time">
                                        <div class="username">
                                            NVTVlog
                                            <span class="time">
                            <i class="el-icon-time"></i> 10 tháng trước
                          </span>
                                        </div>

                                        <el-rate disabled text-color="#ff9900" v-model="value">
                                        </el-rate>
                                        <div class="comment">Phòng ở tuyệt vời</div>
                                    </div>
                                </div>
                                <div class="line-bottom"></div>
                                <!-- demo -->
                                <div class="info-user">
                                    <el-avatar :size="50">
                                        <img
                                                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                                        />
                                    </el-avatar>

                                    <div class="rate_time">
                                        <div class="username">
                                            NVTVlog
                                            <span class="time">
                            <i class="el-icon-time"></i> 10 tháng trước
                          </span>
                                        </div>

                                        <el-rate disabled text-color="#ff9900" v-model="value">
                                        </el-rate>
                                        <div class="comment">Phòng ở tuyệt vời</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </div>
            <el-pagination :total="100" background layout="prev, pager, next">
            </el-pagination>
        </el-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class RoomManagement extends Vue {
        private infoRoom: String;

        constructor() {
            super();
            this.infoRoom = 'Vị trí rất đẹp và thuận tiện ở quận Cầu Giấy';
        }
    }
</script>
<style lang="scss" scoped>
    .room-management {
        .head-info {
            font-size: 30px;
            font-family: "Times New Roman", Times, serif;
            padding-left: 15px;
            color: rgb(32, 209, 32);
            font-weight: bold;
        }

        .room-info {
            width: 100%;
            height: 1000px;

        }

        .room {
            float: left;
        }

        .box-card {
            width: 100%;
            height: 96%;
        }

        .room-info {
            width: 100%;
            height: 800px;
        }

        .room-image {
            width: 100%;
            height: 200px;
        }

        .room-name {
            font-size: 30px;
            font-family: "Times New Roman", Times, serif;
            padding-bottom: 10px;
        }

        .info {
            font-size: 26px;
            font-family: "Times New Roman", Times, serif;
            margin-right: 10px;
        }

        .price {
            font-size: 35px;
            color: red;
            padding-top: 20px;
        }

        .rate {
            padding-top: 20px;
        }

        .rating {
            padding-bottom: 10px;
        }

        .input-rating {
            width: 80%;
        }

        .submit {
            margin-left: 20px;
        }

        .box-rate {
            background-color: #7885aa;
        }

        .line-bottom {
            border-bottom: 1px solid gray;
            padding-top: 20px;
        }

        .info-user {
            display: flex;
            padding-top: 20px;
        }

        .username {
            font-size: 20px;
            font-family: "Times New Roman", Times, serif;

            padding-bottom: 10px;
        }

        .time {
            font-size: 15px;
        }

        .comment {
            margin-top: 10px;
        }

        .rate_time {
            padding-left: 10px;
        }
    }
</style>