<template>
    <div>
        <p class="title">Quản lý Trọ</p>
        <el-row>
            <el-col :span="5">
                <el-row class="static" style="background: #0e5ba9">
                    <el-col :span="8" class="icon"><i class="fal fa-home-lg-alt"></i> </el-col>
                    <el-col :span="16" class="number">
                        <h2>{{ totalDorm }}</h2>
                        <span>Tổng số trọ</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="5">
                <el-row class="static" style="background: #15AABF">
                    <el-col :span="8" class="icon"><i class="fal fa-door-open"></i></el-col>
                    <el-col :span="16" class="number">
                        <h2>{{ totalRoom }}</h2>
                        <span>Tổng số phòng</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="5">
                <el-row class="static" style="background: #2ad33d">
                    <el-col :span="8" class="icon"><i class="fal fa-rectangle-landscape"></i></el-col>
                    <el-col :span="16" class="number">
                        <h2>{{ totalAvailable }}</h2>
                        <span>Phòng trống</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="5">
                <el-row class="static" style="background: #d3302a">
                    <el-col :span="8" class="icon"><i class="fal fa-user"></i></el-col>
                    <el-col :span="16" class="number">
                        <h2>{{ totalInUse }}</h2>
                        <span>Phòng đang sử dụng</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
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

        <!-- <el-row class="status-box">
            <el-radio-group @change="onFilterStatus" v-model="filterRequest.role">
                <el-radio-button :label="'2|3'" class="btn-custom btn-status btn-status-all">
                    Tất cả
                </el-radio-button>
            </el-radio-group>
        </el-row> -->

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
                    rowKey="code"
                    v-loading="loading"
                >
                    <!-- <el-table-column width="220">
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
                    </el-table-column> -->
                    <el-table-column label="Tên trọ">
                        <template slot-scope="scope">
                            <span>{{ scope.row.dormEntity.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Số tầng">
                        <template slot-scope="scope">
                            <span>{{ scope.row.floorDtos.length }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Tổng số phòng">
                        <template slot-scope="scope">
                            <span>{{ scope.row.roomEntities.length }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Phòng trống">
                        <template slot-scope="scope">
                            <span>{{
                                countRoomByStatus(scope.row.roomEntities, 'AVAILABLE')
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Phòng đang sử dụng">
                        <template slot-scope="scope">
                            <span>{{ countRoomByStatus(scope.row.roomEntities, 'IN_USE') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Chi tiết">
                        <template slot-scope="scope">
                            <router-link
                                :to="{ name: 'roomList', params: { code: scope.row.code } }"
                                style="text-decoration: none"
                            >
                                Chi tiết
                            </router-link>
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
import DormApi from '@/api/admin-api/DormApi';
import Pages from '@/router/Pages';

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
        ActiveSwitch,
    },
})
export default class ManageDorm extends Vue {
    private roomList: string = Pages.roomList.path;
    private totalDorm: number = 0;
    private totalAvailable: number = 0;
    private totalInUse: number = 0;
    private totalRoom: number = 0;
    private searchType: Array<searchType> = [
        { label: 'Name', value: 1 },
        { label: 'Email', value: 2 },
        { label: 'Phone', value: 3 },
        { label: 'Facebook', value: 4 },
    ];
    @Ref('table')
    private table: DataTable;
    private loading: boolean = false;
    private activeSearch: string = '';
    private searchName: string = null;
    private filterRequest: FilterRole = {
        role: '2|3',
    };
    private pageSize: number = 10;
    private numberUser: number = null;
    private numberOwner: number = null;
    private async getTableData(sort: object, pageRequest: any): Promise<any> {
        const request = {
            search: this.searchName,
            limit: this.pageSize,
            ...pageRequest,
            ...sort,
        };
        const listDorm = await DormApi.list(request);
        this.totalDorm = listDorm.totalDorm;
        this.totalAvailable = listDorm.totalAvailable;
        this.totalInUse = listDorm.totalInUse;
        this.totalRoom = listDorm.totalRoom;
        return listDorm.adminDormDtoPage;
    }

    private toEdit(code: string) {
        this.$router.push({ name: 'updateDorm', params: { dormCode: code } });
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
        this.searchName=null;
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
    private countRoomByStatus(roomArr: any, status: string) {
        return roomArr.filter(function (el: any) {
            return el.status === status;
        }).length;
    }
}
</script>

<style lang="scss" scoped>
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
.static {
    box-shadow: 0 3px 6px #00000029;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px 10px 0;

    .number {
        padding: 15px;
        background: white !important;
        margin-left: 1px;

        span {
            font-size: 14px;
            color: #999999;
        }
    }

    h2,
    h4 {
        margin: 0 0 15px 0;
    }

    i {
        color: white;
        font-size: 40px;
    }
}
</style>
