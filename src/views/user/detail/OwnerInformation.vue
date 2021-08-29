<template>
    <div class="owner-info">
        <el-card class="box-card">
            <div class="img-map ">
                <el-avatar :size="100" :src="url" shape="square"></el-avatar>
            </div>
            <div class="line-bottom"></div>
            <el-tooltip :disabled="disabled" content="Click open contact phone" effect="light"
                        placement="bottom">
                <el-button @click="disabled = !disabled">{{disabled ? '0393493443' :
                    '**********'}}
                </el-button>
            </el-tooltip>
            <div class="suggest">Thông tin cần thêm</div>
            <div :key="o" class="text item suggest-item" v-for="o in 4">
                {{'Thông tin ' + o }}
            </div>
        </el-card>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class OwnerInformation extends Vue {
        private url: String;

        constructor() {
            super();
            this.url = `https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg`;
        }
    }
</script>
<style lang="scss" scoped>
    .owner-info {
        height: 676px;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-left: 10px;
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
</style>