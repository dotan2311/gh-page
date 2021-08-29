<template>
    <div class="check-list-area">
        <div class="list-area">
            <p class="text">Khu vực:</p>
            <div class="area">
                <el-checkbox :key="index" v-for="(area, index) in areas">
                    {{ area.name }}
                </el-checkbox>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';

    interface listAraa {
        name: string;
    }

    @Component
    export default class CheckListArea extends Vue {
        private areas: Array<listAraa>;

        constructor() {
            super();
            this.areas = [
                {name: 'Khu vực 1'},
                {name: 'Khu vực 2'},
                {name: 'Khu vực 3'},
                {name: 'Khu vực 4'},
            ];
        }
    }
</script>

<style>
    .check-list-area .el-checkbox {
        margin-bottom: 5px;
        margin-right: 30px !important;
    }

    .check-list-area {
        border: 1px solid #dd8c43;
        border-radius: 4px;
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
        rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    }

    .check-list-area .text {
        margin-top: 0;
        font-weight: bold;
        font-family: sans-serif;
        margin: 0 0 5px 0;
    }

    .check-list-area .list-area {
        padding: 5px 0 0 5px;
    }
</style>