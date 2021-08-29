<template>
    <el-select
            :label="pageSize + ' ' + $t('common.dataTable.item')"
            :placeholder="pageSize + ' ' + $t('common.dataTable.item')"
            :value="pageSize + ' ' + $t('common.dataTable.item')"
            @change="changePageSize"
            size="large"
    >
        <el-option
                :label="10 + ' ' + $t('common.dataTable.item')"
                style="text-align: center"
                value="10"
        />
        <el-option
                :label="20 + ' ' + $t('common.dataTable.item')"
                style="text-align: center"
                value="20"
        />
        <el-option
                :label="30 + ' ' + $t('common.dataTable.item')"
                style="text-align: center"
                value="30"
        />
        <el-option
                :label="50 + ' ' + $t('common.dataTable.item')"
                style="text-align: center"
                value="50"
        />
    </el-select>
</template>

<script lang="ts">
    import {Component, Model, Vue} from 'vue-property-decorator';

    enum Events {
        ON_CHANGE_PAGE_SIZE = 'on-change-page-size'
    }

    @Component
    export default class PageSizeSelect extends Vue {
        @Model(Events.ON_CHANGE_PAGE_SIZE, {type: Number}) pageSize!: number;

        private changePageSize(pageSize: number) {
            this.$emit(Events.ON_CHANGE_PAGE_SIZE, Number(pageSize));
        }
    }
</script>

<style lang="scss" scoped>
    .el-select {
        /deep/ .el-input__inner {
            min-width: 100px;
            text-align: center;
        }
    }
</style>
