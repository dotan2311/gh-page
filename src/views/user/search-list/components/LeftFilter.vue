<template>
    <div class="left-filter hidden-md-and-down" >
        <div class="list-filter">
            <p class="text">Bán kính:</p>
            <div class="area">
                <el-checkbox-group @change="randiusSelectChange" v-model="subRandiusSelect">
                    <el-checkbox
                        v-for="randius in randius"
                        :key="randius.value"
                        :label="randius.value"
                        :value="randius.value"
                    >
                        {{ randius.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <hr />
        <div class="list-filter">
            <p class="text">Khoảng giá:</p>
            <div class="area">
                <el-checkbox-group @change="changePrice" v-model="subPricesSelect">
                    <el-checkbox
                        v-for="prices in prices"
                        :key="prices.value"
                        :label="prices.value"
                        :value="prices.value"
                    >
                        {{ prices.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <hr />
        <div class="list-filter">
            <p class="text">Diện tích:</p>
            <div class="area">
                <el-checkbox-group @change="changeSquare" v-model="subAcreageSelect">
                    <el-checkbox
                        v-for="acreage in acreage"
                        :key="acreage.value"
                        :label="acreage.value"
                        :value="acreage.value"
                    >
                        {{ acreage.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <hr />
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import FixedHeader from 'vue-fixed-header';

enum Events {
    /** emit event UPDATE_VALUE when form item value is changed. */
    CHANGE_PRICE = 'change-price',
    CHANGE_SQUARE = 'change-square',
    CHANGE_RANDIUS = 'change-randius',
}
@Component({
    components: {
        FixedHeader,
    },
})
export default class LeftFilter extends Vue {
    @Prop({ required: true }) private randius: any;
    @Prop({ required: true }) private prices: Array<object>;
    @Prop({ required: true }) private acreage: Array<object>;

    @Prop({ required: true }) private randiusSelect: any;
    @Prop({ required: true }) private pricesSelect: Array<string>;
    @Prop({ required: true }) private acreageSelect: Array<string>;

    private subRandiusSelect: Array<string> = [];
    private subRoomDeluxSelect: Array<string> = [];
    private subPricesSelect: Array<string> = [];
    private subAcreageSelect: Array<string> = [];
    created() {
        this.subRandiusSelect = this.randiusSelect;
        this.subPricesSelect = this.pricesSelect;
        this.subAcreageSelect = this.acreageSelect;
    }
    private toQuery(array: any): string {
        var query = array[0];
        array.forEach((element: any) => {
            if (array.indexOf(element) > 0) {
                query = query + ' and ' + element;
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
    @Watch('roomDeluxSelect')
    private changeRoomType(val: any): void {
        this.subRoomDeluxSelect = val;
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
.left-filter .el-checkbox {
    margin-bottom: 5px;
    display: block;
}
.left-filter {
    background-color: white;
    border: 1px solid #dd8c43;
    border-radius: 4px;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
.left-filter .text {
    margin-top: 0;
    font-weight: bold;
    font-family: sans-serif;
    margin: 0 0 5px 0;
}
.left-filter .list-filter {
    padding: 5px 0px 5px 5px;
}
.left-filter hr {
    width: 90%;
    text-align: center;
}

</style>