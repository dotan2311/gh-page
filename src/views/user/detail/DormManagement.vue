<template>
    <div class="dorm-management">
        <el-card class="box-card">

            <div slot="header">
                <span class="head-info">Các dãy trọ sở hữu</span>

            </div>

        </el-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    // test tam cua Dat

    @Component({
        components: {}
    })
    export default class DormManagement extends Vue {
        constructor() {
            super();


        }
    }
</script>
<style lang="scss" scoped>
    .head-info {
        font-size: 30px;
        font-family: "Times New Roman", Times, serif;
        padding-left: 15px;
        color: rgb(32, 209, 32);
        font-weight: bold;
    }
</style>