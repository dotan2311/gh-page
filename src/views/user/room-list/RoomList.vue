<template>
    <div class="room-list">
        <el-row>
            <el-col :span="4" class="hidden-lg-and-down ad">
                <div style="text-align: center">Quang cao 1</div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="16">
                <el-row class="main-infor">
                    <el-col :span="13">
                        <el-carousel indicator-position="inside" class="carousel" :interval="5000">
                            <el-carousel-item v-for="src in srcList" :key="src.index">
                                <el-image
                                    :src="'data:image/png;base64,' + src.bytes"
                                    :preview-src-list="listPreview"
                                    class="img"
                                >
                                </el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>

                    <el-col :span="11" class="basic-infor">
                        <el-row class="room-name">
                            <el-tooltip :content="roomName" placement="top">
                                <h3>{{ roomName }}</h3>
                            </el-tooltip>
                        </el-row>
                        <room-location :location="location" :disTanceFromFu="disTanceFromFu" />
                        <hr />
                        <el-row style="padding-top: 10px">
                            <el-col :span="10">
                                <span class="text-ut">Tiện ích:</span>
                                <room-utilitie
                                    :span="24"
                                    :utility="utility"
                                    :dormCapacity="dormCapacity"
                                    :roomAvailable="roomAvailable"
                                />
                            </el-col>
                            <el-col :span="14" class="owner">
                                <span class="text-ut">Chủ sử hữu:</span>
                                <host-info
                                    :avartaUrl="avartaUrl"
                                    :hostName="hostName"
                                    :userName="userName"
                                    :postNumber="postNumber"
                                    :phoneNumber="phoneNumber"
                                    :fbUrl="fbUrl"
                                />
                                <hr />
                                <span class="text-ut">Chỉ đường:</span>
                                <!-- Map -->
                                <el-row class="dorm-map" @click.native="openMapDialog">
                                    <el-col href="" :underline="false" class="map">
                                        <el-row class="main">
                                            <el-col>
                                                <i class="fas fa-map-marker-alt icon"></i>
                                            </el-col>
                                            <el-col>
                                                <span class="text">Xem vị trí</span>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="rooms">
                    <el-col class="head">
                        <span class="choose">Chọn phòng:</span>
                    </el-col>
                    <el-col :span="24" class="filter">
                        <top-filter
                            :offset="0"
                            :span="24"
                            :input="name"
                            :randius="randius"
                            :prices="prices"
                            :acreage="acreage"
                            :selfContained="selfContained"
                            :randiusSelect="randiusSelect"
                            :pricesSelect="pricesSelect"
                            :acreageSelect="acreageSelect"
                            :selfContainedSelect="selfContain"
                            @change-input="inputChange"
                            @change-self-contained="selfContainChange"
                            @change-price="changePrice"
                            @change-square="changeSquare"
                            @reset="reset"
                    /></el-col>
                    <el-col :span="4" class="floor-sort">
                        <i class="far fa-building icon"></i>
                        <el-select
                            size="small"
                            v-model="floorSelect"
                            @change="floorIdChange"
                            multiple
                            collapse-tags
                            placeholder="Chọn tầng"
                        >
                            <el-option
                                v-for="floor in listFloor"
                                :key="floor.index"
                                :label="floor.name"
                                :value="floor.id"
                            >
                            </el-option> </el-select
                    ></el-col>
                    <el-col class="main-list" v-loading="loading">
                        <el-row>
                            <el-col>
                                <el-row class="list">
                                    <p style="text-align: center" v-if="length == 0">
                                        Không tìm thấy kết quả nào.
                                    </p>
                                    <el-col :span="12" v-for="room in roomList" :key="room.index">
                                        <el-row class="room-preview">
                                            <el-col :span="11">
                                                <el-carousel
                                                    indicator-position="inside"
                                                    :interval="0"
                                                >
                                                    <el-carousel-item
                                                        v-for="src in room.listUrl"
                                                        :key="src.index"
                                                    >
                                                        <el-image
                                                            class="img"
                                                            :src="
                                                                'data:image/png;base64,' + src.bytes
                                                            "
                                                            :preview-src-list="
                                                                previewList(room.listUrl)
                                                            "
                                                        >
                                                        </el-image>
                                                    </el-carousel-item>
                                                </el-carousel>
                                            </el-col>
                                            <el-col :span="13" class="right">
                                                <el-row class="pre-info">
                                                    <el-col>
                                                        <span class="room-name"
                                                            >{{ room.name }}
                                                        </span>
                                                        <span
                                                            style="float: right"
                                                            class="status in-use"
                                                            v-if="room.status == 'IN_USE'"
                                                            >Đang được thuê</span
                                                        >
                                                        <span
                                                            style="float: right"
                                                            class="status fixing"
                                                            v-if="room.status == 'FIXING'"
                                                            >Sửa chữa</span
                                                        >
                                                        <span
                                                            style="float: right"
                                                            class="status available"
                                                            v-if="room.status == 'AVAILABLE'"
                                                            >Trống</span
                                                        >
                                                    </el-col>
                                                    <el-col class="utility">
                                                        <i class="fas fa-building icon"></i>
                                                        <span> Tầng: {{ room.floorName }}</span>
                                                    </el-col>
                                                    <el-col class="utility">
                                                        <i class="fas fa-warehouse icon"></i>
                                                        <span
                                                            >Diện tích phòng:
                                                            {{ room.square }} m²</span
                                                        >
                                                    </el-col>
                                                    <el-col class="utility">
                                                        <i class="fas fa-users icon"></i>
                                                        <span
                                                            >Sức chứa:
                                                            {{ room.capacity }} người</span
                                                        >
                                                    </el-col>
                                                    <el-col class="utility">
                                                        <i class="fas fa-money-check-alt icon"></i>
                                                        <span class="price"
                                                            >Giá: {{ formatPrice(room.price) }} /
                                                            Tháng</span
                                                        >
                                                    </el-col>
                                                </el-row>
                                                <el-row
                                                    @click.native="
                                                        openRoomDialog(room.code, room.roomId)
                                                    "
                                                >
                                                    <el-col class="view-more">
                                                        Xem thêm thông tin
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col>
                        <pagination
                            @chageCurPage="chageCurPage"
                            :currentPage="curPage"
                            :totalPage="totalPage"
                        />
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="5" class="hidden-lg-and-down ad">
                <div style="text-align: center">Quang cao 1</div>
            </el-col>
        </el-row>
        <room-dialog ref="roomDialog" />
        <map-dialog ref="mapDialog" :longitude="longitude" :latitude="latitude" />
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator';
import RoomLocation from './../search-list/components/RoomLocation.vue';
import RoomUtilitie from './../search-list/components/RoomUtilitie.vue';
import HostInfo from './components/HostInfo.vue';
import TopFilter from './../search-list/components/TopFilter.vue';
import RoomDialog from './components/RoomDialog.vue';
import MapDialog from './components/MapDialog.vue';
import Pagination from './../search-list/components/Paginaion.vue';
import UserDormApi from '@/api/user-api/UserDormApi';
import UserRoomApi from '@/api/user-api/UserRoomApi';
import { floors, Utilities } from '@/components/datatable/types';

@Component({
    components: {
        RoomLocation,
        RoomUtilitie,
        HostInfo,
        TopFilter,
        RoomDialog,
        MapDialog,
        Pagination,
    },
})
export default class RoomList extends Vue {
    private prices: Array<object> = [
        { value: '<= 2000000', label: '<=2 Triệu' },
        { value: 'between 3000000 and 5000000', label: '3 - 5 triệu' },
        { value: 'between 5000000 and 7000000', label: '5 - 7 triệu' },
        { value: 'between 7000000 and 10000000', label: '7 - 10 triệu' },
        { value: '>= 10000000', label: '=>10 triệu' },
    ];
    private acreage: Array<object> = [
        { value: ' <= 20', label: '<=20 m²' },
        { value: ' between 20 and 30', label: '20 - 30 m²' },
        { value: ' between 30 and 40', label: '30 - 40 m²' },
        { value: ' between 40 and 50', label: '40 - 50 m²' },
        { value: ' between 50 and 60', label: '50 - 60 m²' },
        { value: ' between 60 and 70', label: '60 - 70 m²' },
        { value: ' between 70 and 80', label: '70 - 80 m²' },
        { value: ' between 80 and 90', label: '80 - 90 m²' },
        { value: ' between 90 and 100', label: '90 - 100 m²' },
        { value: ' >= 100', label: '>= 100 m²' },
    ];
    private randius: Array<object> = [
        { value: '<= 2', label: '<=2 km' },
        { value: '2', label: '2-4 km' },
        { value: '3', label: '4-6 km' },
        { value: '4', label: '6-8 km' },
        { value: '5', label: '8-10 km' },
        { value: '6', label: '10-12 km' },
        { value: '7', label: '12-15 km' },
        { value: '8', label: '>=15 km' },
    ];
    private selfContained: Array<object> = [
        {
            value: '1',
            label: 'Khép kin',
        },
        {
            value: '0',
            label: 'Không khép kín',
        },
        {
            value: '1,0',
            label: 'Tất cả',
        },
    ];

    private selfContain: string = null;
    private randiusSelect: Array<string> = [];
    private pricesSelect: Array<string> = [];
    private acreageSelect: Array<string> = [];
    private srcList: Array<any> = null;
    private listPreview: Array<string> = [];
    private avartaUrl: string = null;
    private hostName: string = null;
    private userName: string = null;
    private postNumber: number = null;
    private phoneNumber: string = null;
    private fbUrl: string = null;
    private dormCode: string = null;
    private roomName: string = null;
    private location: string = null;
    private disTanceFromFu: number = 0;
    private utility: Utilities = {
        hasParking: false,
        hasSanitization: false,
        hasTransportation: false,
    };
    private dormCapacity: number = null;
    private roomAvailable: number = null;
    private longitude: number = null;
    private latitude: number = null;
    // Room List
    private dormId: string = null;
    private subDormId: string = null;
    private curPage: number = 1;
    private totalPage: number = null;
    private limit: number = null;
    private floorId: any = null;
    private name: string = null;
    private contained: string = null;
    private type: string = null;
    private price: string = null;
    private square: string = null;
    private status: string = null;
    private loading: boolean = false;
    private length: number = null;
    //Floor List
    private listFloor: Array<floors> = null;
    private floorSelect: Array<any> = [];

    private roomList: any = null;
    @Ref('roomDialog')
    private detailDialog: RoomDialog;

    private openRoomDialog(code: string, id: number): void {
        this.detailDialog.showDialog(code, id);
    }

    @Ref('mapDialog')
    private mapDialog: MapDialog;

    private openMapDialog(): void {
        this.mapDialog.showDialog();
    }

    created() {
        this.dormCode = this.$route.params.code != null ? this.$route.params.code : null;
        if (this.dormCode) {
            this.listRoom();
            this.detailDorm();
        }
    }

    private async detailDorm(): Promise<any> {
        const request = {
            code: this.dormCode,
        };
        const detail = await UserDormApi.detail(this.dormCode);
        this.roomName = detail.name;
        this.hostName = detail.userInforDto.fullName;
        this.userName = detail.userInforDto.userName;
        this.phoneNumber = detail.userInforDto.phone;
        this.postNumber = detail.userInforDto.dormNumber;
        this.fbUrl = detail.userInforDto.fbUrl;
        this.avartaUrl = detail.userInforDto.avatarUrl;
        this.location =
            detail.address.civilGroupName != ''
                ? detail.address.civilGroupName +
                  ' - ' +
                  detail.address.districtName +
                  ' - ' +
                  detail.address.subDistrictName
                : detail.address.districtName + ' - ' + detail.address.subDistrictName;
        this.longitude = detail.address.longitude;
        this.latitude = detail.address.latitude;
        this.disTanceFromFu = parseFloat(detail.distanceFromFU.toFixed(1));
        this.srcList = detail.listUrl;
        this.utility = detail.dormUtilities;
        this.dormCapacity = detail.capacity;
        this.roomAvailable = detail.roomAvailable;
        this.srcList.forEach((element) => {
            this.listPreview.push('data:image/png;base64,' + element.bytes);
        });
        this.floors(detail.dormId);
    }

    private async listRoom(): Promise<any> {
        try {
            this.loading = true;
            const request = {
                page: this.curPage,
                limit: 10,
                code: this.transDormCode(),
                floorId: this.floorId,
                name: this.name,
                contained: this.selfContain,
                type: this.type,
                price: this.price,
                square: this.square,
                status: this.status,
            };
            const roomList = await UserRoomApi.list(request);
            this.totalPage = roomList.totalPage;
            this.roomList = roomList.listRoom;
            this.length = roomList.listRoom.length;
        } catch (error) {
        } finally {
            this.loading = false;
        }
    }
    private async floors(dormId: string): Promise<any> {
        const listFloor = await UserDormApi.floors(dormId);
        this.listFloor = listFloor;
    }

    private toQueryIn(array: any): string {
        if (array.length > 0) {
            var query = array[0];
            array.forEach((element: any) => {
                if (array.indexOf(element) > 0) {
                    query = query + ',' + element;
                }
            });
            return 'in (' + query + ')';
        }
        return null;
    }
    private transDormCode() {
        return this.dormCode.split('-').join('');
    }
    private floorIdChange(val: any) {
        this.curPage=1
        this.floorId = this.toQueryIn(this.floorSelect);
        this.listRoom();
    }

    private chageCurPage(val: any): void {
        this.curPage = val;
        this.listRoom();
    }
    private inputChange(val: string): void {
        this.curPage=1
        this.name = val;
        this.listRoom();
    }
    private selfContainChange(val: string) {
        this.curPage=1
        this.selfContain = val;
        this.listRoom();
    }

    private changePrice(val: any) {
        this.curPage=1
        this.pricesSelect = val.arr;
        this.price = val.val;
        this.listRoom();
    }
    private changeSquare(val: any) {
        this.curPage=1
        this.acreageSelect = val.arr;
        this.square = val.val;
        this.listRoom();
    }
    private reset() {
        this.randiusSelect = [];
        this.pricesSelect = [];
        this.acreageSelect = [];
        this.name = null;
        this.selfContain = '';
        this.type = null;
        this.square = null;
        this.price = null;
        this.listRoom();
    }
    private previewList(val: Array<any>): Array<string> {
        var arr: Array<string> = [];
        val.forEach((element) => {
            arr.push('data:image/png;base64,' + element.bytes);
        });
        return arr;
    }
    private formatPrice(price: number): string {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
    }
}
</script>

<style lang="scss" scoped>
.room-list {
    height: 100vh;
    padding-top: 10px;
    background: #f3f3f3;
    .ad {
        visibility: hidden;
    }
    /deep/.el-image__inner {
        object-fit: cover;
    }
    .img {
        width: 100%;
        height: 100%;
    }
    .main-list {
        min-height: 30vh;
    }
    .main-infor {
        padding: 10px;
        border: 1px solid #dddddd;
        border-radius: 5px;
        background: white;
        .list {
            border: 1px solid black;
        }

        .basic-infor {
            padding: 0 0 0 20px;
        }

        .carousel {
            border-radius: 10px;
        }
        /deep/.el-carousel__container {
            position: relative;
            height: 500px;
        }

        .room-name h3 {
            margin: 0;
            text-transform: uppercase;
            font-family: sans-serif;
            color: orange;
            line-height: 1.43;
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            background: white;
        }
        /deep/.room-location .distance {
            font-family: sans-serif;
            font-size: 15px;
        }
        /deep/.room-utilitie .utilitie {
            margin: 13px 0 4px 0;
            color: grey;
            font-size: 20px;
        }
        /deep/.room-utilitie .utilitie span {
            font-size: 17px;
            margin: 0 10px 0 0px;
        }
        .room-utilitie {
            border-right: 1px solid #c7d1df;
        }
        .text-ut {
            font-weight: bold;
            font-size: 17px;
        }
        .owner {
            padding-left: 10px;
        }
    }

    .rooms {
        padding: 10px;
        border: 1px solid #dddddd;
        border-radius: 5px;
        background: white;
        margin-top: 10px;
        .head {
            border-bottom: 1px solid #bbbbbb;
            padding: 10px 0 10px 0;
        }
        .choose {
            font-size: 20px;
            font-weight: 700;
            font-family: 'Roboto', sans-serif;
        }
        .floor-name {
            padding: 5px 0 5px 0;
            border-bottom: 1px solid #bbbbbb;
            font-weight: bold;
        }
        .list {
            padding: 10px 0 10px 0;
            border-bottom: 1px solid #bbbbbb;
            .room-preview {
                border: 1px solid #bbbbbb;
                margin-right: 10px;
                margin-bottom: 10px;
            }
        }
        /deep/.el-carousel__container {
            position: relative;
            height: 237px;
        }
        .pre-info {
            padding: 10px;

            .room-name {
                font-size: 16px;
                font-weight: 700;
            }
            .utility {
                padding: 10px 0 10px 0;
                font-size: 15px;
            }
            .icon {
                padding: 0 10px 0 0;
                font-size: 15px;
                color: gray;
            }
            .price {
                color: green;
                font-weight: 700;
            }
            .status {
                font-size: 12px;
                color: white;
                font-weight: 600;
                padding: 4px;
                border-radius: 3px;
            }
            .in-use {
                background-color: red;
            }
            .available {
                background-color: green;
            }
            .fixing {
                background-color: rgb(245, 141, 5);
            }
        }

        .view-more {
            text-align: center;
            border: 1px solid #488bec;
            bottom: 0;
            padding: 10px;
            margin-top: 7px;
            color: white;
            background: #488bec;
            cursor: pointer;
        }
        .floor-sort {
            border-radius: 3px;
            border-bottom: 1px solid orange;

            /deep/.el-input__inner {
                border: 0px;
                border-radius: 0;
                padding: 0;
            }
            /deep/ .el-input__inner::placeholder {
                color: black;
            }
            .icon {
                padding: 0 5px 0 0;
            }
        }
    }
    /deep/.randius {
        display: none;
    }
    .filter {
        /deep/.el-col-3 {
            width: 16%;
        }
        padding: 3px;
        background-color: #f6f6f6;
    }

    .dorm-map:hover .text {
        color: #5392f9;
    }
    .dorm-map {
        margin: 10px 0 0 0;
        border-radius: 5px;
        cursor: pointer;
        .map {
            background-image: url('https://cdn6.agoda.net/images/MAPS-1213/default/bkg-map-entry.svg');
            background-repeat: no-repeat;
            background-size: cover;
            text-align: center;
        }
        .icon {
            color: red;
            font-size: 40px;
            margin-bottom: 10px;
        }
        .text {
            font-size: 16px;
            font-family: mallory, Helvetica Neue, Helvetica, Arial, sans-serif;
            text-transform: uppercase;
            color: #3c3c3c;
            font-weight: 700;
        }
        .main {
            border: 1px solid #e0e0e0;
            padding: 20px 100px;
        }
    }
}
</style>