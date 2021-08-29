<template>
    <el-row class="search-list">
        <fixed-header :threshold="60" fixedClass="sticky">
            <div class="room-filter">
                <top-filter
                    :span="18"
                    :offset="3"
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
                    @change-randius="randiusSelectChange"
                    @change-price="changePrice"
                    @change-square="changeSquare"
                    @reset="reset"
                />
            </div>
        </fixed-header>
        <el-row :gutter="10">
            <el-col :span="3" class="hidden-lg-and-down">
                <div class="ad" style="text-align: center">Quang cao 1</div>
            </el-col>

            <el-col class="content" :xs="24" :sm="24" :md="24" :lg="24" :xl="18">
                <el-row :gutter="5" type="flex" justify="end">
                    <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                        <div class="navbar">
                            <total-result
                                :roomAvailable="roomAvailable"
                                :roomCapacity="roomCapacity"
                            />
                            <left-filter
                                :randius="randius"
                                :prices="prices"
                                :acreage="acreage"
                                :randiusSelect="randiusSelect"
                                :pricesSelect="pricesSelect"
                                :acreageSelect="acreageSelect"
                                @change-randius="randiusSelectChange"
                                @change-price="changePrice"
                                @change-square="changeSquare"
                            />
                        </div>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                        <room-sorter @changeOrder="changeOrder" selectMap="select-mode" />
                        <div class="main" v-loading="loading">
                            <el-row class="map">
                                <GmapMap
                                    @click="infoWindowOpened = false"
                                    :options="options"
                                    :center="center"
                                    :zoom="zoom"
                                    style="height: 750px"
                                >
                                    <GmapMarker
                                        :position="center"
                                        :icon="fULogo"
                                        :clickable="true"
                                    />
                                    <gmap-info-window
                                        :options="infoWindowOptions"
                                        :position="windownPosition"
                                        :opened="infoWindowOpened"
                                        @closeclick="handleInfoWindowClose"
                                    >
                                        <el-row
                                            class="infor-window"
                                            type="flex"
                                            justify="center"
                                            @click.native="gotoDorm(dormCode, dormId)"
                                        >
                                            <el-col class="image" :span="10">
                                                <room-image
                                                    :imageByte="image"
                                                    :code="dormCode"
                                                    :id="dormId"
                                                />
                                            </el-col>
                                            <el-col class="infor" :span="14">
                                                <el-row>
                                                    <el-col class="distance">
                                                        <span>
                                                            Cách cổng trường
                                                            {{ distanceFromFU }} km
                                                        </span>
                                                    </el-col>
                                                    <el-col>
                                                        <room-utilitie
                                                            :span="24"
                                                            :utility="dormUtility"
                                                            :dormCapacity="dormCapacity"
                                                            :roomAvailable="available"
                                                        />
                                                    </el-col>
                                                    <el-col class="price">
                                                        <span class="icon"
                                                            ><i class="fas fa-money-check-alt"></i
                                                        ></span>
                                                        <span v-if="minPrice == maxPrice"
                                                            >Từ {{ minPrice }} triệu / tháng</span
                                                        >
                                                        <span v-else
                                                            >Từ {{ minPrice }} -
                                                            {{ maxPrice }} triệu / tháng</span
                                                        >
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </gmap-info-window>

                                    <el-row
                                        v-for="result in listResult"
                                        :key="result.dormId"
                                        class="dorm"
                                    >
                                        <!-- <gmap-info-window
                                            :options="infoWindowOption2"
                                            :position="{
                                                lat: result.address.latitude,
                                                lng: result.address.longitude,
                                            }"
                                            :opened="true"
                                        >
                                            <el-row class="intro">
                                                {{ formatKm(result.distanceFromFU) }} km |
                                                <span v-if="result.minPrice == result.maxPrice"
                                                    >Từ
                                                    {{
                                                        result.minPrice / Math.pow(10, 6)
                                                    }}
                                                    triệu</span
                                                >
                                                <span v-else
                                                    >Từ {{ result.minPrice / Math.pow(10, 6) }} -
                                                    {{
                                                        result.maxPrice / Math.pow(10, 6)
                                                    }}
                                                    triệu</span
                                                >
                                            </el-row>
                                        </gmap-info-window> -->
                                        <GmapMarker
                                            :position="{
                                                lat: result.address.latitude,
                                                lng: result.address.longitude,
                                            }"
                                            :icon="icon"
                                            :clickable="true"
                                            @mouseover="handleMarkerClicked(result)"
                                        />
                                    </el-row>
                                </GmapMap>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="3" class="hidden-lg-and-down">
                <div class="ad" style="text-align: center">Quang cao 2</div>
            </el-col>
        </el-row>
    </el-row>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import TopFilter from './components/TopFilter.vue';
import TotalResult from './components/TotalResult.vue';
import LeftFilter from './components/LeftFilter.vue';
import RoomSorter from './components/RoomSorter.vue';
import RoomInfor from './components/RoomInfor.vue';
import Paginaion from './components/Paginaion.vue';
import UserDormApi from '@/api/user-api/UserDormApi';
import AlertService from '@/services/AlertService';
import FixedHeader from 'vue-fixed-header';
import RoomPrice from './components/RoomPrice.vue';
import RoomImage from './components/RoomImage.vue';
import { Utilities } from '@/components/datatable/types';
import RoomUtilitie from './components/RoomUtilitie.vue';
import i18n from '@/i18n';
import Pages from '@/router/Pages';
@Component({
    components: {
        TotalResult,
        LeftFilter,
        RoomSorter,
        RoomInfor,
        Paginaion,
        TopFilter,
        FixedHeader,
        RoomImage,
        RoomUtilitie,
        RoomPrice,
    },
})
export default class MapView extends Vue {
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
        { value: 'between 2 and 4', label: '2-4 km' },
        { value: 'between 4 and 6', label: '4-6 km' },
        { value: 'between 6 and 8', label: '6-8 km' },
        { value: 'between 8 and 10', label: '8-10 km' },
        { value: 'between 10 and 12', label: '10-12 km' },
        { value: 'between 12 and 15', label: '12-15 km' },
        { value: '>= 15', label: '>=15 km' },
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
    private randiusSelect: Array<string> = [];
    private pricesSelect: Array<string> = [];
    private acreageSelect: Array<string> = [];
    private totalPage: number = null;
    private currentPage: number = 1;
    private limit: number = null;
    private name: string = null;
    private rediusQuery: string = null;
    private selfContain: string = null;
    private romType: string = null;
    private square: string = null;
    private price: string = null;
    private order: string = null;
    private roomAvailable: number = null;
    private roomCapacity: number = null;
    private listResult: any = null;

    //Map
    private center: any = { lat: 21.013248159997772, lng: 105.5270638872554 };
    private windownPosition: any = { lat: 21.013248159997772, lng: 105.5270638872554 };
    private options: any = {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
    };
    private zoom: number = 12;
    private loading: boolean = true;
    private icon: string = require('@/assets/images/home-icon.png');
    private fULogo: string = require('@/assets/images/FU-logo.png');
    //Map Window infor
    private infoWindowOptions: any = {
        pixelOffset: {
            width: 0,
            height: -15,
        },
        zIndex: 100,
    };
    private infoWindowOption2: any = {
        pixelOffset: {
            width: 0,
            height: -15,
        },
    };
    private infoWindowOpened: boolean = false;
    private image: string = null;
    private dormCode: string = null;
    private dormId: number = null;
    private distanceFromFU: number = null;
    private dormUtility: Utilities = {
        hasParking: false,
        hasSanitization: false,
        hasTransportation: false,
    };
    private dormCapacity: number = null;
    private available: null = null;
    private minPrice: number = null;
    private maxPrice: number = null;
    private test: any = null;

    //MapHandle
    private handleMarkerClicked(r: any) {
        this.test = r;
        this.image = r.listUrl[0].bytes;
        this.dormCode = r.code;
        this.dormId = r.dormId;
        this.dormUtility = r.dormUtilities;
        this.available = r.roomAvailable;
        this.dormCapacity = r.capacity;
        this.minPrice = r.minPrice / 1000000;
        this.maxPrice = r.maxPrice / 1000000;
        this.distanceFromFU = parseFloat(r.distanceFromFU.toFixed(1));
        this.windownPosition = { lat: r.address.latitude, lng: r.address.longitude };
        this.infoWindowOpened = true;
    }
    private handleInfoWindowClose() {
        this.dormCapacity = null;
        this.distanceFromFU = null;
        this.available = null;
        this.dormCode = null;
        this.dormId = null;
        this.minPrice = null;
        this.maxPrice = null;
        this.windownPosition = null;
        this.infoWindowOpened = false;
    }
    private gotoDorm(code: string, id: number) {
        this.$router.push({ path: `/room-list/${code}` });
    }
    //

    created() {
        this.getListDorm();
    }

    private reset() {
        this.randiusSelect = [];
        this.pricesSelect = [];
        this.acreageSelect = [];
        this.name = null;
        this.selfContain = '';
        this.romType = null;
        this.square = null;
        this.price = null;
        this.rediusQuery = null;
        this.getListDorm();
    }
    private chageCurPage(val: any): void {
        this.currentPage = val;
        this.getListDorm();
    }
    private changeOrder(val: string): void {
        this.order = val;
        this.getListDorm();
    }
    private inputChange(val: string): void {
        this.name = val;
        this.getListDorm();
    }
    private selfContainChange(val: string) {
        this.selfContain = val;
        this.getListDorm();
    }
    private randiusSelectChange(val: any) {
        this.randiusSelect = val.arr;
        this.rediusQuery = val.val;
        this.getListDorm();
    }
    private changePrice(val: any) {
        this.pricesSelect = val.arr;
        this.price = val.val;
        this.getListDorm();
    }
    private changeSquare(val: any) {
        this.acreageSelect = val.arr;
        this.square = val.val;
        this.getListDorm();
    }

    private async getListDorm(): Promise<any> {
        try {
            this.loading = true;
            const request = {
                page: this.currentPage,
                limit: 99999,
                name: this.name,
                radius: this.rediusQuery,
                selfContain: this.selfContain,
                roomType: this.romType,
                square: this.square,
                price: this.price,
                order: this.order,
            };
            const listDorm = await UserDormApi.list(request);

            this.listResult = listDorm.listResult;
            this.totalPage = listDorm.totalPage;
            this.roomAvailable = listDorm.roomAvailable;
            this.roomCapacity = listDorm.roomCapacity;
        } catch (error) {
            AlertService.error(String(i18n.t('common.message.serverErrorMessage')));
        } finally {
            this.loading = false;
        }
    }
    private formatKm(distance: number) {
        return parseFloat(distance.toFixed(1));
    }
}
</script>

<style scoped lang="scss">
.map {
    padding-top: 10px;
}
.el-main {
    overflow: hidden !important;
}
.search-list {
    margin: 0 8px;
    height: 100vh;
}
.ad {
    visibility: hidden;
}
.main {
    min-height: 80vh;
}
@media only screen and (max-width: 2560px) {
    .sticky-menu {
        position: fixed;
        top: 50px;
        width: 12.12%;
        z-index: 9;
    }
}
@media only screen and (max-width: 1440px) {
    .sticky-menu {
        position: fixed;
        top: 50px;
        width: 16.12%;
        z-index: 9;
    }
}
@media only screen and (max-width: 1024px) {
    .sticky-menu {
        position: fixed;
        top: 50px;
        width: 16.12%;
        z-index: 9;
        display: none;
    }
    .el-row--flex.is-justify-end {
        display: flow-root;
    }
}
.infor-window {
    width: 300px;
    cursor: pointer;
    .price {
        font-weight: 600;
        color: red;
        position: absolute;
        bottom: -32px;
    }
    /deep/.room-image .el-image {
        height: 100px;
    }
    .infor {
        padding-left: 5px;
    }
    .distance {
        font-weight: 500;
    }
    /deep/.room-utilitie .utilitie span {
        font-size: 12px;
        margin: 0 px 0 0px;
    }
    /deep/.room-utilitie .utilitie {
        margin: 3px 0 0 0;
    }

    /deep/.room-utilitie .utilitie .item {
        margin: 0;
    }
    .icon {
        padding-right: 5px;
    }
    /deep/.like-btn {
        visibility: hidden;
    }
    /deep/.room-image .el-image {
        min-height: 100px; 
        max-height: 100px;
    }
}
.intro {
    font-weight: bold;
    font-size: 10px;
}
/deep/.gm-style .gm-style-iw {
    font-weight: 300;
    font-size: 13px;
    overflow: hidden;
    border: 2px solid orange;
}
/deep/.gm-style .gm-style-iw-t::after {
    background: white;
}
/deep/.gm-style .gm-style-iw-d {
    box-sizing: border-box;
    overflow: auto;
    margin: -7px;
}
/deep/.gm-style .gm-style-iw-c {
    padding-top: 14px;
}
</style>

