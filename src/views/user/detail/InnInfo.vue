<template>
    <div class="inn-info">
        <el-card class="box-card">
            <!-- thẻ toàn khu trọ -->

            <div class="clearfix" slot="header">
                <i class="el-icon-s-home"></i>
                <span class="head-info">Thông tin khu trọ</span>

            </div>
            <!-- thẻ thông tin trọ -->
            <div class="info">
                <div class="name-inn">Khu trọ: {{ NameInn }}
                    <el-rate class="rate"
                             disabled
                             score-template="{value} points"
                             show-score
                             text-color="#ff9900"
                             v-model="value">
                    </el-rate>
                </div>

                <div class="contact">

                    <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
     					   Liên hệ {{OwnerName}}<i class="el-icon-arrow-down el-icon--right"></i>
   						   </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-phone">Số điện thoại: {{Phone}}
                            </el-dropdown-item>
                            <el-dropdown-item icon="fab fa-facebook-f">Facebook: {{Facebook}}
                            </el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus-outline">Zalo: {{Zalo}}
                            </el-dropdown-item>

                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class InnInfo extends Vue {
        private NameInn: string;
        private Phone: string;
        private Facebook: string;
        private Zalo: string;
        private value: number;

        constructor() {
            super();
            this.NameInn = `HaLoInn`;
            this.Phone = `0983483834`;
            this.value = 4.5;
        }
    }
</script>

<style lang="scss" scoped>
    .inn-info {
        .name-inn {
            font-size: 30px;
            font-family: "Times New Roman", Times, serif;
            display: flex;
        }

        .inn {

            border: 2px solid rgb(32, 209, 32);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;

        }

        .el-icon-s-home, .head-info {
            color: rgb(32, 209, 32);
            font-size: 30px;
        }

        .head-info {
            font-size: 30px;
            font-family: "Times New Roman", Times, serif;
            padding-left: 15px;

        }

        .rate {
            padding-left: 50px;
        }
    }
</style>