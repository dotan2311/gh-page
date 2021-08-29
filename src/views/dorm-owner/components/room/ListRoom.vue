<template>
    <div>
        <p class="title">
            Quản lý Phòng
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
                            <div style="margin-bottom: 10px">{{ $t('management.searchRoomName') }}
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

        <el-row class="status-box">
            <el-radio-group @change="onFilterStatus" v-model="roomStatus">
                <el-radio-button :label="'ALL'" class="btn-custom btn-status btn-status-all">
                    {{ $t('room.status.all') }}
                </el-radio-button>
                <el-radio-button :label="'AVAILABLE'"
                                 class="btn-custom btn-status btn-status-available">
                    <i class="fa fa-circle" style="color: #2AD33D"></i>
                    {{ $t('room.status.available') }} ({{ availableRoom }})
                </el-radio-button>
                <el-radio-button :label="'FIXING'" class="btn-custom btn-status btn-status-fixing">
                    <i class="fa fa-circle" style="color: #EBCD27"></i>
                    {{ $t('room.status.fixing') }} ({{ onFixingRoom }})
                </el-radio-button>
                <el-radio-button :label="'IN_USE'" class="btn-custom btn-status btn-status-in-use">
                    <i class="fa fa-circle" style="color: #D3302A"></i>
                    {{ $t('room.status.inUse') }} ({{ inUseRoom }})
                </el-radio-button>
            </el-radio-group>
        </el-row>

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
                            :label="$t('room.listRoom.status')"
                            width="240"
                    >
                        <template slot-scope="scope">
                            <el-form>
                                <div class="form-status">
                                    <i class="fa fa-circle" style="color: #2AD33D; margin-top: 12px"
                                       v-if="scope.row.status === 'AVAILABLE'"></i>
                                    <i class="fa fa-circle" style="color: #EBCD27; margin-top: 12px"
                                       v-if="scope.row.status === 'FIXING'"></i>
                                    <i class="fa fa-circle" style="color: #D3302A; margin-top: 12px"
                                       v-if="scope.row.status === 'IN_USE'"></i>
                                        <select-form-item
                                                :options="listRoomStatus"
                                                :value="scope.row.status"
                                                :change-fn="() => function() {}"
                                                :select-fn="(status) => changeStatus(scope.row.code, status)"
                                        ></select-form-item>
                                </div>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('room.listRoom.roomImages')" width="500">
                        <template slot-scope="scope">
                            <el-carousel height="300px" indicator-position="none">
                                <el-carousel-item :key="index"
                                                  v-for="(image, index) in scope.row.roomImages">
                                    <el-image :src="'data:image/png;base64,' + image.bytes"
                                              style="display: contents;">
                                    </el-image>
                                    <div class="room-name">{{scope.row.name}}</div>
                                </el-carousel-item>
                            </el-carousel>
                        </template>
                    </el-table-column>>
                    <el-table-column
                            :label="$t('room.listRoom.square')"
                            width="120"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.square }} m²</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('room.listRoom.capacity')"
                            width="140"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.capacity }} người</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('room.listRoom.selfContained')"
                            width="140"
                    >
                        <template slot-scope="scope">
                            <p style="margin-top: 0"
                               v-if="scope.row.selfContained === true">Khép kín</p>
                            <p style="margin-top: 0"
                               v-else>Không khép kín</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('room.listRoom.price')"
                            width="160"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.price | currency('₫', 0, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true})}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('room.listRoom.utilities')"
                            width="180"
                    >
                        <template slot-scope="scope">
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_WIFI')">Wifi</p>
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_AIR_CONDITIONER')">Điều
                                hòa</p>
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_WASHING_MACHINE')">Máy
                                giặt</p>
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_FRIDGE')">Tủ lạnh</p>
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_STOVE')">Bếp nấu</p>
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_WARDROBE')">Tủ quần áo</p>
                            <p style="margin-top: 0"
                               v-if="scope.row.utilities.includes('HAS_BALCONY')">Ban công</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('room.listRoom.description')"
                            min-width="150"
                            prop="description"
                    >
                    </el-table-column>
                    <el-table-column
                            :label="$t('room.listRoom.updatedTime')"
                            width="155"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.updatedTime | moment('YYYY/MM/DD HH:mm') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('room.listRoom.createdTime')"
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
    import SelectFormItem from '@/components/form-item/SelectFormItem.vue';
    import ButtonCreateOrUpdate from '../../../../components/button/ButtonCreateOrUpdate.vue';
    import ButtonDelete from '@/components/button/ButtonDelete.vue';
    import Pages from '@/router/Pages';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';
    import {RoomStatus} from '@/types/RoomStatus';
    import RoomApi from '@/api/dorm-owner-api/RoomApi';
    import UserEntity from '@/types/classes/UserEntity';

    @Component({
        components: {
            ButtonGroupSearch,
            DataTable,
            PageSizeSelect,
            ButtonCreateOrUpdate,
            ButtonDelete,
            SelectFormItem,
        }
    })
    export default class ListRoom extends Vue {
        private loading: boolean = false;
        private pageSize: number = 10;
        private activeSearch: string = '';
        private searchName: string = '';
        private roomStatus: RoomStatus = RoomStatus.ALL;
        private user: UserEntity = null;
        private userId: number = null;

        private listRoomStatus: Array<any> = [
            {label: 'Còn trống', value: RoomStatus.AVAILABLE},
            {label: 'Đang sửa chữa', value: RoomStatus.FIXING},
            {label: 'Đang sử dụng', value: RoomStatus.IN_USE}];

        private availableRoom: number = 0;
        private onFixingRoom: number = 0;
        private inUseRoom: number = 0;

        @Ref('table')
        private table: DataTable;

        created() {
            this.user = JSON.parse(localStorage.getItem('CurrentUser'));
            this.userId = this.user != null ? this.user.id : null;
        }

        private async getTableData(sort: object, pageRequest: any): Promise<any> {
            const request = {
                userId: this.userId,
                roomStatus: this.roomStatus,
                searchName: this.searchName.trim(),
                ...pageRequest,
                ...sort,
            };

            const response = await RoomApi.list(request);
            this.availableRoom = response.availableRoom;
            this.onFixingRoom = response.onFixingRoom;
            this.inUseRoom = response.inUseRoom;
            return response.pageResult;
        }

        private async changeStatus(code: string, status: string) {
            try {
                this.loading = true;
                await RoomApi.changeStatus(code, status);
                AlertService.success(
                        String(i18n.t('common.alertTitle.success')),
                        String(i18n.t('common.message.changeStatusSuccessfully'))
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

        private onFilterStatus() {
            this.reloadTable();
        }

        private toCreate() {
            this.$router.push(Pages.createRoom);
        }

        private toEdit(code: string) {
            this.$router.push({name: 'updateRoom', params: {roomCode: code},});
        }

        private async onDelete(code: string): Promise<void> {
            try {
                this.loading = true;
                await RoomApi.delete(code);
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

        .search-box {
            font-size: 16px;
            letter-spacing: 0;
            color: #43425d;
            margin-left: 50px;
            margin-top: 25px;
        }
    }

    .status-box {
        margin-top: 20px;
    }

    .status-box .btn-status {
        width: 200px;
        display: inline-grid !important;
    }

    /deep/ .el-image__inner {
        object-fit: contain;
    }

    .room-name {
        position: absolute;
        top: 8px;
        left: 0;
        font-weight: bold;
        background-color: #3b5998;
        color: white !important;
        padding: 2px 5px;
        border-radius: 0 30px 30px 0;
        opacity: 0.8;
    }

    /deep/ .form-status {
        div.d-flex {
            display: none;
        }
        .el-select {
            width: 80%;
            margin-left: 3px;
        }
        display: flex;
    }
</style>
