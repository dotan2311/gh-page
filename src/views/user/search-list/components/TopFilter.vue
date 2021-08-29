<template>
    <el-row class="filter">
        <el-col
            :xs="{ span: 24, offset: 0 }"
            :sm="{ span: 24, offset: 0 }"
            :md="{ span: 24, offset: 0 }"
            :lg="{ span: 24, offset: 0 }"
            :xl="{ span: span, offset: offset }"
        >
            <el-row :gutter="10">
                <el-col :span="5" class="search">
                    <el-input
                        @change="inputChange"
                        placeholder="Bạn muốn tìm gì?"
                        v-model="subInput"
                        size="small"
                    >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>

                <el-col :span="3" class="fil ct">
                    <el-select
                        @change="selfContainChange"
                        v-model="subSelfContainedSelect"
                        size="small"
                        placeholder="Cấu trúc"
                    >
                        <el-option
                            v-for="item in selfContained"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" class="fil randius">
                    <el-select
                        @change="randiusSelectChange"
                        size="small"
                        v-model="subRandiusSelect"
                        multiple
                        collapse-tags
                        placeholder="Bán kính"
                    >
                        <el-option
                            v-for="randius in randius"
                            :key="randius.value"
                            :label="randius.label"
                            :value="randius.value"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" class="fil">
                    <el-select
                        @change="changePrice"
                        size="small"
                        v-model="subPricesSelect"
                        multiple
                        collapse-tags
                        placeholder="Khoảng giá"
                    >
                        <el-option
                            v-for="price in prices"
                            :key="price.value"
                            :label="price.label"
                            :value="price.value"
                        >
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="3" class="fil">
                    <el-select
                        @change="changeSquare"
                        size="small"
                        v-model="subAcreageSelect"
                        multiple
                        collapse-tags
                        placeholder="Diện tích"
                    >
                        <el-option
                            v-for="acreage in acreage"
                            :key="acreage.value"
                            :label="acreage.label"
                            :value="acreage.value"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-button @click="reset" type="warning" size="small" class="delete-fil"
                    >Xóa Lọc</el-button
                >
            </el-row>
        </el-col>
    </el-row>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import FixedHeader from 'vue-fixed-header';
enum Events {
    /** emit event UPDATE_VALUE when form item value is changed. */
    CHANGE_PRICE = 'change-price',
    CHANGE_SQUARE = 'change-square',
    CHANGE_RANDIUS = 'change-randius',
    CHANGE_INPUT = 'change-input',
    CHANGE_SELF_CONTIANED = 'change-self-contained',
    RESET = 'reset',
}
@Component({
    components: {
        FixedHeader,
    },
})
export default class TopFilter extends Vue {
    @Prop({ required: true }) private randius: Array<object>;
    @Prop({ required: true }) private prices: Array<object>;
    @Prop({ required: true }) private acreage: Array<object>;
    @Prop({ required: true }) private selfContained: Array<object>;

    @Prop({ required: true }) private randiusSelect: any;
    @Prop({ required: true }) private pricesSelect: Array<string>;
    @Prop({ required: true }) private acreageSelect: Array<string>;
    @Prop({ required: true }) private selfContainedSelect: string;
    @Prop({ required: true }) private input: string;
    @Prop({ required: false }) private offset: number;
    @Prop({ required: false }) private span: number;

    private value: string = '';
    private subRandiusSelect: Array<string> = [];
    private subRoomDeluxSelect: Array<string> = [];
    private subPricesSelect: Array<string> = [];
    private subAcreageSelect: Array<string> = [];
    private subInput: string = '';
    private subSelfContainedSelect: string = '';
    created() {
        this.subRandiusSelect = this.randiusSelect;
        this.subPricesSelect = this.pricesSelect;
        this.subAcreageSelect = this.acreageSelect;
        this.subInput = this.input;
        this.subSelfContainedSelect = this.selfContainedSelect;
    }

    private toQuery(array: any): string {
        var query = array[0];
        array.forEach((element: any) => {
            if (array.indexOf(element) > 0) {
                query = query + ' or ' + element;
            }
        });
        return query;
    }
    private toQueryIn(array: any): string {
        var query = array[0];
        array.forEach((element: any) => {
            if (array.indexOf(element) > 0) {
                query = query + ',' + element;
            }
        });
        return query;
    }
    private toQueryBetween(array: any, table: string): string {
        var query = array[0];
        array.forEach((element: any) => {
            if (array.indexOf(element) > 0) {
                query = query + ' or ' + table + element;
            }
        });
        return query;
    }

    private changeSquare(val: any) {
        this.$emit(Events.CHANGE_SQUARE, {
            val: this.toQueryBetween(val, ' room.square '),
            arr: val,
        });
    }
    private changePrice(val: any) {
        this.$emit(Events.CHANGE_PRICE, {
            val: this.toQueryBetween(val, ' room.price '),
            arr: val,
        });
    }
    private inputChange(val: string) {
        console.log(val);
        this.$emit(Events.CHANGE_INPUT, val);
    }
    private selfContainChange(val: string) {
        this.$emit(Events.CHANGE_SELF_CONTIANED, val);
    }
    private randiusSelectChange(val: any) {
        var sql: string =
            '(select ST_Distance_Sphere(\n' +
            ' point(105.5270638872554, 21.013248159997772),\n' +
            ' point(address.longitude, address.latitude)) / 1000)';

        this.$emit(Events.CHANGE_RANDIUS, {
            val: this.toQueryBetween(val, sql),
            arr: val,
        });
    }

    private reset(): void {
        this.$emit(Events.RESET);
    }
    @Watch('input')
    private changeInput(val: any): void {
        this.subInput = val;
    }
    @Watch('roomDeluxSelect')
    private changeRoomType(val: any): void {
        this.subRoomDeluxSelect = val;
    }
    @Watch('selfContainedSelect')
    private changeSelfContained(val: any): void {
        this.subSelfContainedSelect = val;
    }
    @Watch('randiusSelect')
    private changeRandius(val: any): void {
        this.subRandiusSelect = val;
    }
    @Watch('pricesSelect')
    private priceChange(val: any): void {
        this.subPricesSelect = val;
    }
    @Watch('acreageSelect')
    private priceSquare(val: any): void {
        this.subAcreageSelect = val;
    }
}
</script>

<style>
.room-filter {
    margin: 0px 0 10px 0;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 15%);
    background-color: #f6f6f6;
}
.room-filter .fil {
    padding-right: 10px;
}

.room-filter .filter {
    padding: 5px 0px 5px 0px;
}

.filter .el-inner {
    width: 100px;
}
.filter .fil-name {
    font-size: 13px;
}
.filter .delete-fil {
    float: right;
    margin-right: 5px;
}
.filter .fil .el-input__inner::placeholder {
    color: black;
}
.filter .el-col-2 {
    width: 11%;
}
.filter .ct.el-col-3 {
    width: 11%;
}
.filter .dl.el-col-3 {
    width: 14.3%;
}
.sticky {
    position: fixed;
    top: 0;
    width: 99.13%;
    z-index: 10;
}

.sticky ~ .el-row {
    padding-top: 50px;
}
</style>