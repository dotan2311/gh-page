<template>
    <div class="inn-description">
        <el-card class="box-card">
            <div class="clearfix" slot="header">
                <span class="head-info">Mô tả</span>
            </div>
            <div class="content-description">
                {{Content}}
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class InnDescription extends Vue {
        private Content: string;

        constructor() {
            super();
            this.Content = `HaLoInn la mot noi tuyet voi`;
        }
    }
</script>

<style lang="scss" scoped>

    .inn-description {
        padding-top: 10px;

        .box-card {
            height: 480px;

        }

        .head-info {
            font-size: 30px;
            font-family: "Times New Roman", Times, serif;
            padding-left: 15px;
            color: rgb(32, 209, 32);
        }
    }

</style>