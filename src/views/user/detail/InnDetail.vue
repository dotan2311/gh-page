<template>
    <div id="innDetail">
        <el-row>
            <el-col :span="4">
                <div class="grid-content "></div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content">
                    <el-row>
                        <el-col :span="18">
                            <div class="grid-content ">
                                <!-- component info -->
                                <inn-info/>
                                <!-- mô tả -->
                                <!-- component -->
                                <inn-description/>
                            </div>
                        </el-col>
                        <!-- show thông tin thêm -->
                        <el-col :span="5">
                            <div class="grid-content">
                                <!-- thong tin chu so huu -->
                                <div class="owner-info">
                                    <el-card class="box-card">
                                        <div class="img-map ">
                                            <el-avatar :size="100" :src="url"
                                                       shape="square"></el-avatar>
                                            <div class="owner-name">
                                                Đỗ VT
                                            </div>
                                        </div>
                                        <div class="line-bottom"></div>
                                        <div class="owner-phone">
                                            Số điện thoại
                                        </div>
                                        <el-tooltip :disabled="disabled"
                                                    content="Click open contact phone"
                                                    effect="light" placement="bottom">
                                            <el-button @click="disabled = !disabled">{{disabled ?
                                                '0393493443' : '**********'}}
                                            </el-button>
                                        </el-tooltip>
                                        <div class="suggest">Thông tin cần thêm</div>
                                        <div :key="o" class="text item suggest-item" v-for="o in 4">
                                            {{'Thông tin ' + o }}
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="23">
                            <dorm-management/>
                        </el-col>
                    </el-row>

                    <el-row>
                        <!-- show thông tin dãy-->

                    </el-row>

                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content "></div>
            </el-col>
        </el-row>
    </div>
</template>


<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import InnInfo from './InnInfo.vue';
    import InnDescription from './InnDescription.vue';
    import DormManagement from './DormManagement.vue';
    import OwnerInformation from './OwnerInformation.vue';


    @Component({
        components: {
            InnInfo,
            InnDescription,
            DormManagement,
            OwnerInformation,


        },
    })
    export default class InnDetail extends Vue {
    }
</script>

<style lang="scss" scoped>

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .box-card {
        width: 100%;
        height: 97%;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .expand-fade-leave-active {
        margin-left: 20px;
        opacity: 0;
    }

    .owner-info {
        height: 676px;
        width: 100%;


    }

    .line-bottom {
        border-bottom: 1px solid gray;
        padding-top: 20px;
    }

    .suggest {
        font-size: 25px;
        font-family: "Times New Roman", Times, serif;
        padding-top: 20px;
    }

    .suggest-item {
        font-size: 20px;
        font-family: "Times New Roman", Times, serif;
        padding: 5px;
    }

    .box-card {
        width: 100%;
        height: 97%;
    }

    .img-map {
        display: flex;
    }

    .owner-name {
        font-size: 20px;
        font-family: "Times New Roman", Times, serif;
        padding: 5px;
        padding-left: 10px;
    }

    .owner-phone {
        font-size: 20px;
        font-family: "Times New Roman", Times, serif;
        padding: 5px;

    }
</style>
