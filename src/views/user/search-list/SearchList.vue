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
                        <!-- <fixed-header :threshold="60" fixedClass="sticky-menu"> -->
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
                        <!-- </fixed-header> -->
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                        <room-sorter @changeOrder="changeOrder" select="select-mode" />
                        <div class="main" v-loading="loading">
                            <el-row class="room-infor" :gutter="10">
                                <room-infor
                                    v-for="result in listResult"
                                    :key="result.dormId"
                                    :result="result"
                                    :userId="userId"
                                />
                            </el-row>
                            <p style="text-align: center" v-if="lengthArr == 0">
                                Không tìm thấy kết quả nào.
                            </p>
                            <paginaion
                                @chageCurPage="chageCurPage"
                                :currentPage="currentPage"
                                :totalPage="totalPage"
                            />
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
import i18n from '@/i18n';
import UserEntity from '@/types/classes/UserEntity';
import Auth from '@/security/Authentication';

@Component({
    components: {
        TotalResult,
        LeftFilter,
        RoomSorter,
        RoomInfor,
        Paginaion,
        TopFilter,
        FixedHeader,
    },
})
export default class SearchList extends Vue {
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
    private loading: boolean = true;
    private lengthArr: number = null;

    private user: UserEntity = null;
    private userId: number = null;
    created() {
        this.getUser();
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
        this.currentPage = 1;
        this.name = val;
        this.getListDorm();
    }
    private selfContainChange(val: string) {
        this.currentPage = 1;
        this.selfContain = val;
        this.getListDorm();
    }
    private randiusSelectChange(val: any) {
        this.currentPage = 1;
        this.randiusSelect = val.arr;
        this.rediusQuery = val.val;
        this.getListDorm();
    }
    private changePrice(val: any) {
        this.currentPage = 1;
        this.pricesSelect = val.arr;
        this.price = val.val;
        this.getListDorm();
    }
    private changeSquare(val: any) {
        this.currentPage = 1;
        this.acreageSelect = val.arr;
        this.square = val.val;
        this.getListDorm();
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
            this.userId = this.user.id;
        }
    }
    private async getListDorm(): Promise<any> {
        try {
            this.loading = true;
            const request = {
                page: this.currentPage,
                limit: 12,
                userId: this.user != null ? this.userId : '',
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
            this.lengthArr = listDorm.listResult.length;
            this.totalPage = listDorm.totalPage;
            this.roomAvailable = listDorm.roomAvailable;
            this.roomCapacity = listDorm.roomCapacity;
        } catch (error) {
            console.log(error);
            AlertService.error(String(i18n.t('common.message.serverErrorMessage')));
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style scoped lang="scss">
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
// @media only screen and (max-width: 2560px) {
//     .sticky-menu {
//         position: fixed;
//         top: 50px;
//         width: 12.12%;
//         z-index: 1;
//     }
// }
// @media only screen and (max-width: 1440px) {
//     .sticky-menu {
//         position: fixed;
//         top: 50px;
//         width: 16.12%;
//         z-index: 1;
//     }
// }
// @media only screen and (max-width: 1024px) {
//     .sticky-menu {
//         position: fixed;
//         top: 50px;
//         width: 16.12%;
//         display: none;
//         z-index: 1;
//     }
//     .el-row--flex.is-justify-end {
//         display: flow-root;
//     }
// }
</style>

