<template>
    <el-row class="paging" justify="center" type="flex">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="subCurrentPage"
            :page-count="totalPage"
            background
            layout="prev, pager, next"
        >
        </el-pagination>
    </el-row>
</template>
<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Paginaion extends Vue {
    @Prop({ required: true }) private currentPage: number;
    @Prop({ required: true }) private totalPage: number;

    private subCurrentPage: number = null;
    private subTotalPage: number = null;

    created() {
        this.subCurrentPage = this.currentPage;
        this.subTotalPage = this.totalPage;
    }

    private handleCurrentChange(val: any):void {
        this.$emit('chageCurPage', this.subCurrentPage);
    }
    @Watch('currentPage')
    private onRoomAvailableChange(val: any): void {
        this.subCurrentPage = val;
    }
    @Watch('totalPage')
    private onRoomCapacityChange(val: any): void {
        this.subTotalPage = val;
    }
}
</script>

<style lang="scss" scoped>
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #e6a23c;
}

.paging .el-pagination {
    margin: 5px 0 5px 0;
}
</style>