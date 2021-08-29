<template>
    <div >
        <p class="title">Quản lý Account</p>
        <el-collapse accordion style="margin-top: 20px" v-model="activeSearch">
            <el-collapse-item name="search-collapse">
                <template slot="title">
                    {{ $t('management.searchTitle') }}
                </template>
                <el-row class="search-box">
                    <el-col :span="6">
                        <div class="grid-content">
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

        <el-row class="status-box">
            <el-radio-group @change="onFilterStatus" v-model="filterRequest.role">
                <el-radio-button :label="'1|2|3'" class="btn-custom btn-status btn-status-all">
                    Tất cả({{ numberOwner + numberUser + numberAdmin }})
                </el-radio-button>
                <el-radio-button :label="'3'" class="btn-custom btn-status btn-status-available">
                    <i class="fa fa-circle" style="color: #2ad33d"></i>
                    User({{ numberUser }})
                </el-radio-button>
                <el-radio-button :label="'2'" class="btn-custom btn-status btn-status-fixing">
                    <i class="fa fa-circle" style="color: #ebcd27"></i>
                    Host({{ numberOwner }})
                </el-radio-button>
                <el-radio-button :label="'1'" class="btn-custom btn-status btn-status-fixing">
                    <i class="fa fa-circle" style="color: red"></i>
                    Admin({{ numberAdmin }})
                </el-radio-button>
                <el-radio-button :label="'4'" class="btn-custom btn-status btn-status-fixing">
                    <i class="fa fa-circle" style="color: black"></i>
                    Ban List({{ numberBanlist }})
                </el-radio-button>
            </el-radio-group>
        </el-row>

        <el-card style="margin-top: 20px">
            <el-row>
                <el-col :span="4">
                    <page-size-select v-model="pageSize" />
                </el-col>
            </el-row>
            <el-row style="margin-top: 16px">
                <data-table
                    :getTableDataFn="getTableData"
                    :pageSize="pageSize"
                    class="custom-data-table"
                    ref="table"
                    rowKey="user.code"
                    v-loading="loading"
                >
                    <el-table-column width="220">
                        <template slot-scope="scope">
                            <div class="tool-button">
                                <div class="audit-button">
                                    <button-create-or-update
                                        v-if="filterRequest.role == 4"
                                        :create-fn="() => onUnDelete(scope.row.user.code)"
                                        :title="$t('Unban')"
                                    ></button-create-or-update>
                                    <button-delete
                                        v-if="filterRequest.role != 4"
                                        :delete-fn="() => onDelete(scope.row.user.code)"
                                        :title="$t('Ban')"
                                    ></button-delete>
                                </div>
                                <div>
                                    <!-- <active-switch
                                        :value="scope.row.active"
                                        :on-switch-fn="
                                            active => toggleActive(scope.row.user.code, active)
                                        "
                                    /> -->
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="ID">
                        <template slot-scope="scope">
                            <span>{{ scope.row.user.id }}</span>
                        </template>
                    </el-table-column> -->

                    <el-table-column label="Name">
                        <template slot-scope="scope">
                            <span>{{ scope.row.user.username }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Email">
                        <template slot-scope="scope">
                            <span>{{ scope.row.user.email }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Facebook">
                        <template slot-scope="scope">
                            <span>{{ scope.row.user.fbUrl }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Phone">
                        <template slot-scope="scope">
                            <span>{{ scope.row.user.phone }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Role" width="180">
                        <template slot-scope="scope">
                            <div>
                                <p
                                    v-if="getLastRole(scope.row.roleEntities) == 1"
                                    style="color: red"
                                >
                                    SYSTEM_ADMIN
                                </p>
                                <p
                                    v-if="getLastRole(scope.row.roleEntities) == 2"
                                    style="color: #ebcd27"
                                >
                                    DORM_OWNER
                                </p>
                                <p
                                    v-if="getLastRole(scope.row.roleEntities) == 3"
                                    style="color: #2ad33d"
                                >
                                    USER
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                </data-table>
            </el-row>
        </el-card>
    </div>
</template>

<script lang="ts">
    import { Component, Ref, Vue } from 'vue-property-decorator';
    import ButtonGroupSearch from '../../components/button/ButtonGroupSearch.vue';
    import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
    import ButtonDelete from '@/components/button/ButtonDelete.vue';
    import DataTable from '../../components/datatable/DataTable.vue';
    import PageSizeSelect from '../../components/datatable/PageSizeSelect.vue';
    import SelectFormItem from '@/components/form-item/SelectFormItem.vue';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    import AccountApi from '@/api/admin-api/AccountApi';
    import ActiveSwitch from '@/components/button/ActiveSwitch.vue';
    export type Account = {
        userId: number;
        userName: string;
        userEmail: string;
        userPhone: number;
        userFacebook: string;
        role: Array<string>;
    };
    interface searchType {
        label: string;
        value: number;
    }
    interface FilterRole {
        role: string;
    }

    @Component({
        components: {
            ButtonGroupSearch,
            DataTable,
            PageSizeSelect,
            SelectFormItem,
            ButtonCreateOrUpdate,
            ButtonDelete,
            ActiveSwitch
        }
    })
    export default class ManageAccount extends Vue {
        private searchType: Array<searchType> = [
            { label: 'Name', value: 1 },
            { label: 'Email', value: 2 },
            { label: 'Phone', value: 3 },
            { label: 'Facebook', value: 4 }
        ];
        @Ref('table')
        private table: DataTable;
        private loading: boolean = false;
        private activeSearch: string = '';
        private searchName: string = null;
        private filterRequest: FilterRole = {
            role: '1|2|3'
        };
        private pageSize: number = 10;
        private numberUser: number = null;
        private numberOwner: number = null;
        private numberAdmin: number = null;
        private numberBanlist: number = null;
        private dialogVisible: boolean = false;
        private switchDormOwner: boolean = false;
        private switchAdmin: boolean = false;
        private userCode: string = null;
        private userName: string = null;
        private userRole: number = null;
        private defaultAvt: string = require('@/assets/images/defaultAvt.png');

        private async getTableData(pageRequest: any): Promise<any> {
            const request = {
                search: this.searchName,
                limit: this.pageSize,
                role: this.filterRequest.role,
                ...pageRequest
            };
            const listAcc = await AccountApi.list(request);
            this.numberUser = listAcc.totalUser;
            this.numberOwner = listAcc.totalOwner;
            this.numberAdmin = listAcc.totalAdmin;
            this.numberBanlist = listAcc.totalBanList;

            console.log(listAcc);
            return listAcc;
        }

        private async onDelete(code: string): Promise<void> {
            try {
                this.loading = true;
                await AccountApi.delete(code);
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
        private async onUnDelete(code: string): Promise<void> {
            try {
                this.loading = true;
                await AccountApi.unDelete(code);
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
        private async toggleActive(code: string, active: boolean) {
            try {
                this.loading = true;
                //await AccountApi.toggleStatus(code);
                if (active == false) {
                    AlertService.success(
                        String(this.$t('notification.changeStatus')),
                        String(this.$t('notification.deactivateSuccessfully'))
                    );
                } else {
                    AlertService.success(
                        String(this.$t('notification.changeStatus')),
                        String(this.$t('notification.activateSuccessfully'))
                    );
                }
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

        private getLastRole(roleEntities: Array<any>) {
            return roleEntities[roleEntities.length - 1].id;
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
        private onFilterStatus() {
            this.table.reload();
        }
    }
</script>

<style lang="scss" scoped>
    .avt {
        padding: 0 0 0 0;
        .el-image {
            width: 10px;
            height: 10px;
            border-radius: 58%;
        }
    }
    .status-box {
        margin-top: 20px;
    }

    .status-box .btn-status {
        width: 200px;
        display: inline-grid !important;
    }
    .search-box {
        font-size: 16px;
        letter-spacing: 0;
        color: #43425d;
        margin-left: 50px;
        margin-top: 25px;
    }
    .title {
        width: 368px;
        height: 49px;
        text-align: left;
        font-size: 34px;
        font-weight: bold;
    }

    /deep/ .el-collapse-item__header {
        background: #0e5ba9;
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
        border: 1px solid #ebeef5;
    }

    .search-box {
        font-size: 16px;
        letter-spacing: 0;
        color: #43425d;
        margin-left: 50px;
        margin-top: 25px;
    }

    /deep/.el-collapse-item__arrow.is-active {
        transform: rotate(0deg);
    }

    /deep/.el-collapse-item__arrow {
        transform: rotate(180deg);
    }

    /deep/.el-collapse-item__header.focusing:focus:not(:hover) {
        color: #ffffff;
    }
</style>
