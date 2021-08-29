<template>
    <div>
        <p class="title">
            Quản lý Dãy
        </p>
        <el-collapse accordion class="search-collapse" style="margin-top: 20px"
                     v-model="activeSearch">
            <el-collapse-item name="search-collapse">
                <template slot="title">
                    {{ $t('management.searchTitle') }}
                </template>
                <el-row class="search-box">
                    <el-col :span="6">
                        <div class="grid-content">
                            <div style="margin-bottom: 10px">{{ $t('management.searchDormName') }}
                            </div>
                            <el-input
                                    class="inline-input input-search"
                                    v-model="searchName"
                            ></el-input>
                        </div>
                    </el-col>
                </el-row>
                <ButtonGroupSearch :clear-search-fn="onClearSearch" :search-fn="onSearch">
                </ButtonGroupSearch>
            </el-collapse-item>
        </el-collapse>

        <el-card style="margin-top: 20px">
            <el-row>
                <el-col :span="4">
                    <page-size-select v-model="pageSize"/>
                </el-col>
                <el-col :span="2.5" style="float: right">
                    <ButtonCreateOrUpdate
                            :create-fn="toCreate"
                            :title="$t('common.button.create')"
                    >
                    </ButtonCreateOrUpdate>
                </el-col>
            </el-row>
            <el-row style="margin-top: 16px">
                <data-table
                        :getTableDataFn="getTableData"
                        :pageSize="pageSize"
                        class="custom-data-table"
                        ref="table"
                        rowKey="code"
                        v-loading="loading"
                >
                    <el-table-column width="220">
                        <template slot-scope="scope">
                            <div class="tool-button">
                                <div class="audit-button">
                                    <button-create-or-update
                                            :create-fn="() => toEdit(scope.row.code)"
                                            :title="$t('common.button.update')"
                                    ></button-create-or-update>
                                    <button-delete
                                            :delete-fn="() => onDelete(scope.row.code)"
                                    ></button-delete>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('dorm.listDorm.dormName')" prop="name">
                    </el-table-column>
                    <el-table-column :label="$t('dorm.listDorm.dormImages')" width="400">
                        <template slot-scope="scope">
                            <el-carousel height="300px" indicator-position="none">
                                <el-carousel-item :key="index"
                                                  v-for="(image, index) in scope.row.dormImages">
                                    <el-image :src="'data:image/png;base64,' + image.bytes"
                                              style="display: contents">
                                    </el-image>
                                </el-carousel-item>
                            </el-carousel>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('dorm.listDorm.longitude')"
                            prop="address.longitude"
                            width="170"
                    >
                    </el-table-column>
                    <el-table-column
                            :label="$t('dorm.listDorm.latitude')"
                            prop="address.latitude"
                            width="170"
                    >
                    </el-table-column>
                    <el-table-column
                            :label="$t('dorm.listDorm.address')"
                            min-width="200"
                    >
                        <template slot-scope="scope">
                            <span style="word-break: break-word;">{{ scope.row.address.specificAddress
                                + (scope.row.address.civilGroupEntity.name != null ? ", " + scope.row.address.civilGroupEntity.name : '')
                                + (scope.row.address.subDistrict.name != null ? ", " + scope.row.address.subDistrict.name : '')
                                + (scope.row.address.district.name != null ? ", " + scope.row.address.district.name : '')}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('dorm.listDorm.utilities')"
                            width="170"
                    >
                        <template slot-scope="scope">
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_PARKING')">Chỗ để xe</p>
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_SANITIZATION')">Dịch vụ dọn
                                phòng</p>
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_TRANSPORTATION')">Dịch vụ đưa
                                đón</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('dorm.listDorm.description')"
                            min-width="150"
                            prop="description"
                    >
                    </el-table-column>
                    <el-table-column
                            :label="$t('dorm.listDorm.updatedTime')"
                            width="155"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.updatedTime | moment('YYYY/MM/DD HH:mm') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('dorm.listDorm.createdTime')"
                            width="155"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.createdTime | moment('YYYY/MM/DD HH:mm') }}</span>
                        </template>
                    </el-table-column>
                </data-table>
            </el-row>
        </el-card>
    </div>
</template>

<script lang="ts">
    import {Component, Ref, Vue} from 'vue-property-decorator';
    import ButtonGroupSearch from '@/components/button/ButtonGroupSearch.vue';
    import DataTable from '@/components/datatable/DataTable.vue';
    import PageSizeSelect from '@/components/datatable/PageSizeSelect.vue';
    import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
    import ButtonDelete from '@/components/button/ButtonDelete.vue';
    import Pages from '@/router/Pages';
    import DormApi from '@/api/dorm-owner-api/DormApi';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    import UserEntity from '@/types/classes/UserEntity';

    @Component({
        components: {
            ButtonGroupSearch,
            DataTable,
            PageSizeSelect,
            ButtonCreateOrUpdate,
            ButtonDelete,
        }
    })
    export default class ListDorm extends Vue {
        private loading: boolean = false;
        private pageSize: number = 10;
        private activeSearch: string = '';
        private searchName: string = '';
        private user: UserEntity = null;
        private userId: number = null;

        @Ref('table')
        private table: DataTable;

        created() {
            this.user = JSON.parse(localStorage.getItem('CurrentUser'));
            this.userId = this.user != null ? this.user.id : null;
        }

        private async getTableData(sort: object, pageRequest: any): Promise<any> {
            const request = {
                searchName: this.searchName.trim(),
                userId: this.userId,
                ...pageRequest,
                ...sort,
            };
            return await DormApi.list(request);
        }

        private toCreate() {
            this.$router.push(Pages.createDorm);
        }

        private toEdit(code: string) {
            this.$router.push({name: 'updateDorm', params: {dormCode: code},});
        }

        private async onDelete(code: string): Promise<void> {
            try {
                this.loading = true;
                await DormApi.delete(code);
                AlertService.success(
                        String(i18n.t('common.alertTitle.success')),
                        String(i18n.t('common.message.deleteSuccess'))
                );
                this.reloadTable();
            } catch (error) {
                AlertService.error(
                        String(i18n.t('common.alertTitle.failed')),
                        String(i18n.t('common.message.serverErrorMessage')),
                        2000
                );
            } finally {
                this.loading = false;
            }
        }

        private onClearSearch() {
            this.searchName = '';
            this.reloadTable();
        }

        private onSearch() {
            this.reloadTable();
        }

        private reloadTable(): void {
            this.table.reload();
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        width: 368px;
        height: 49px;
        text-align: left;
        font-size: 34px;
        font-weight: bold;
    }

    .search-collapse {
        /deep/ .el-collapse-item__header {
            background: #0E5BA9;
            font-size: 18px;
            letter-spacing: 0;
            color: #ffffff;
            border-radius: 3px 3px 0 0;
            opacity: 1;
            padding-left: 20px;
        }

        /deep/ .el-collapse-item__header .el-collapse-item__arrow {
            font-size: 35px;
        }

        /deep/ .el-collapse-item__wrap {
            border: 1px solid #EBEEF5;
        }

        /deep/ .el-collapse-item__arrow.is-active {
            transform: rotate(0deg);
        }

        /deep/ .el-collapse-item__arrow {
            transform: rotate(180deg);
        }

        /deep/ .el-collapse-item__header.focusing:focus:not(:hover) {
            color: #ffffff;
        }

        /deep/ .el-icon-arrow-right:before {
            content: url('../../../../assets/images/collapse_search.png');
        }

        .search-box {
            font-size: 16px;
            letter-spacing: 0;
            color: #43425d;
            margin-left: 50px;
            margin-top: 25px;
        }
    }

    /deep/ .el-image__inner {
        object-fit: contain;
    }

</style>
