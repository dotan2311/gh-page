<template>
    <el-row class="table">
        <p class="title">Danh sách yêu thích</p>
        <!-- <el-collapse accordion style="margin-top: 20px" v-model="activeSearch">
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
        </el-collapse> -->
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
                    <el-table-column label="Tên trọ" width="600">
                        <template slot-scope="scope">
                            <el-row :gutter="10" class="dorm-name">
                                <el-col :span="8">
                                    <room-image
                                        :imageByte="scope.row.listUrl[0].bytes"
                                        :code="scope.row.code"
                                        :id="scope.row.dormId"
                                        :userId="scope.row.userId"
                                    />
                                </el-col>
                                <el-col :span="16">
                                    <el-row>
                                        <el-col>
                                            <room-name
                                                :name="scope.row.name"
                                                :code="scope.row.code"
                                                :id="scope.row.dormId"
                                            />
                                        </el-col>
                                        <el-col>
                                            <room-location
                                                :location="
                                                    locationHandle(
                                                        scope.row.address.civilGroupName,
                                                        scope.row.address.districtName,
                                                        scope.row.address.subDistrictName
                                                    )
                                                "
                                                :disTanceFromFu="scope.row.distanceFromFU"
                                            />
                                        </el-col>
                                        <el-col>
                                            <room-interact :createDate="scope.row.createdTime" />
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column label="Giá">
                        <template slot-scope="scope">
                            <span class="price" v-if="scope.row.minPrice == scope.row.maxPrice"
                                >{{ handlePrice(scope.row.minPrice) }} triệu / tháng</span
                            >
                            <span class="price" v-else
                                >{{ handlePrice(scope.row.minPrice) }} -
                                {{ handlePrice(scope.row.maxPrice) }} triệu / tháng</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column label="Phòng trống">
                        <template slot-scope="scope">
                            <span>{{ scope.row.roomAvailable }} phòng</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Sức chứa còn lại">
                        <template slot-scope="scope">
                            <span>{{ scope.row.capacity }} người</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="100">
                        <template slot-scope="scope">
                            <div class="tool-button">
                                <div class="audit-button">
                                    <button-delete
                                        :delete-fn="() => onDelete(scope.row.favouriteDormEntity.code)"
                                    ></button-delete>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </data-table>
            </el-row>
        </el-card>
    </el-row>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import ButtonGroupSearch from '@/components/button/ButtonGroupSearch.vue';
import ButtonCreateOrUpdate from '@/components/button/ButtonCreateOrUpdate.vue';
import ButtonDelete from '@/components/button/ButtonDelete.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import PageSizeSelect from '@/components/datatable/PageSizeSelect.vue';
import SelectFormItem from '@/components/form-item/SelectFormItem.vue';
import AlertService from '@/services/AlertService';
import i18n from '@/i18n';
import AccountApi from '@/api/admin-api/AccountApi';
import ActiveSwitch from '@/components/button/ActiveSwitch.vue';
import Pages from '@/router/Pages';
import UserEntity from '@/types/classes/UserEntity';
import UserFavouriteApi from '@/api/user-api/UserFavouriteApi';
import RoomImage from '../search-list/components/RoomImage.vue';
import RoomName from '../search-list/components/RoomName.vue';
import RoomLocation from '../search-list/components/RoomLocation.vue';
import RoomInteract from '../search-list/components/RoomInteract.vue';
import RoomPrice from '../search-list/components/RoomPrice.vue';

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
        RoomImage,
        RoomName,
        RoomLocation,
        RoomInteract,
        RoomPrice,
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
    private pageSize: number = 50;
    private user: UserEntity = null;
    created() {
        this.getUser();
    }
    private getUser() {
        if (localStorage.getItem('CurrentUser')) {
            let localUser = JSON.parse(localStorage.getItem('CurrentUser'));
            let roleNames: Array<string> = [];
            for (let i = 0; i < localUser.rolename.length; i++) {
                roleNames.push(localUser.rolename[i].name);
            }

            this.user = {
                id: localUser.id,
                username: localUser.username,
                avatarUrl: 'data:image/png;base64,' + localUser.bytes,
                roles: roleNames,
                fullName: localUser.fullName,
            };
        }
    }
    private async getTableData(sort: object, pageRequest: any): Promise<any> {
        const request = {
            search: this.searchName,
            limit: this.pageSize,
            userId: this.user.id,
            ...pageRequest,
            ...sort,
        };
        return await UserFavouriteApi.list(request);
    }

    private toEdit(code: string) {
        this.$router.push({ name: 'updateDorm', params: { dormCode: code } });
    }

    private async onDelete(code: string): Promise<void> {
        try {
            this.loading = true;
            await UserFavouriteApi.delete(code);
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

    private locationHandle(
        civilGroupName: string,
        districtName: string,
        subDistrictName: string
    ): string {
        var location: string =
            civilGroupName != ''
                ? civilGroupName + ' - ' + districtName + ' - ' + subDistrictName
                : districtName + ' - ' + subDistrictName;
        return location;
    }

    private handlePrice(price: number) {
        return price / 1000000;
    }

    private getLastRole(roleEntities: Array<any>) {
        return roleEntities[roleEntities.length - 1].id;
    }

    private onClearSearch() {
        this.searchName = null;
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
.table {
    padding: 0 20px 0 20px;
    height : 100vh;
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
.dorm-name {
    /deep/.room-image .el-image {
        min-height: 120px;
        max-height: 120px;
    }
    /deep/.like-btn {
        visibility: hidden;
    }
}
.price {
    font-weight: 600;
    color: orangered;
}
</style>
