<template>
    <div>
        <p class="title">
            Quản lý Tầng
        </p>
        <el-collapse accordion style="margin-top: 20px" v-model="activeSearch">
            <el-collapse-item name="search-collapse">
                <template slot="title">
                    {{ $t('management.searchTitle') }}
                </template>
                <el-row class="search-box">
                    <el-col :span="6">
                        <div class="grid-content">
                            <div style="margin-bottom: 10px">{{ $t('management.searchFloorName')
                                }}
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
                    <el-table-column
                            :label="$t('floor.listFloor.floorName')"
                            prop="name"
                    >
                    </el-table-column>
                    <el-table-column
                            :label="$t('floor.listFloor.dorm')"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.dormEntity.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('floor.listFloor.room')"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.roomEntities.length < 1">Chưa có phòng</span>
                            <span v-else :key="room.code" v-for="room in scope.row.roomEntities">
                                  <router-link
                                          :to="{ name: 'updateRoom', params: { roomCode: room.code }}"
                                          style="text-decoration: none">
                                      <el-link type="primary">{{room.name}}</el-link><br/>
                                  </router-link>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('floor.listFloor.updatedTime')"
                            prop="updateTime"
                            width="155"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.updatedTime | moment('YYYY/MM/DD HH:mm') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('floor.listFloor.createdTime')"
                            prop="createTime"
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
    import ButtonGroupSearch from '../../../../components/button/ButtonGroupSearch.vue';
    import DataTable from '../../../../components/datatable/DataTable.vue';
    import PageSizeSelect from '../../../../components/datatable/PageSizeSelect.vue';
    import ButtonCreateOrUpdate from '../../../../components/button/ButtonCreateOrUpdate.vue';
    import ButtonDelete from '@/components/button/ButtonDelete.vue';
    import Pages from '@/router/Pages';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    import FloorApi from '@/api/dorm-owner-api/FloorApi';
    import UserEntity from '@/types/classes/UserEntity';

    @Component({
        components: {
            ButtonGroupSearch,
            DataTable,
            PageSizeSelect,
            ButtonCreateOrUpdate,
            ButtonDelete
        }
    })
    export default class ListFloor extends Vue {
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
                userId: this.userId,
                searchName: this.searchName.trim(),
                ...pageRequest,
                ...sort,
            };
            return await FloorApi.list(request);
        }

        private toCreate() {
            this.$router.push(Pages.createFloor);
        }

        private toEdit(code: string) {
            this.$router.push({name: 'updateFloor', params: {floorCode: code},});
        }

        private async onDelete(code: string): Promise<void> {
            try {
                this.loading = true;
                await FloorApi.delete(code);
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

    .search-box {
        font-size: 16px;
        letter-spacing: 0;
        color: #43425d;
        margin-left: 50px;
        margin-top: 25px;
    }

    /deep/ .el-icon-arrow-right:before {
        content: url('../../../../assets/images/collapse_search.png');
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
</style>
