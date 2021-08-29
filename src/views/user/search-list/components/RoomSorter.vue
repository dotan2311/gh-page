<template>
    <el-row class="sorter">
        <el-col :span="4" class="select" v-if="selectMap == null">
            <i class="el-icon-document icon"></i>
            <el-select @change="changeOrder" v-model="value" placeholder="Select" size="small">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </el-col>

        <el-col :span="10" class="view">
            <span class="mode">Chế độ xem:</span>
            <span class="default" :class="select" @click="changeView"
                ><i class="fas fa-th icon" :class="select"></i>Mặc định</span
            >

            <span class="map" :class="selectMap" @click="changeView">
                <i class="fas fa-map-marked-alt icon" :class="selectMap"></i>Bản đồ</span
            >
        </el-col>
    </el-row>
</template>

<script lang="ts">
import Pages from '@/router/Pages';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class RoomSorter extends Vue {
    @Prop({ required: false }) private select: string;
    @Prop({ required: false }) private selectMap: string;
    
    private changeView() {
        if (this.selectMap) {
            this.$router.push({ path: Pages.home.path });
        } else {
        }
        if (this.select) {
            this.$router.push({ path: Pages.homeMap.path });
        } else {
        }
    }

    private options: Array<object> = [
        {
            value: 'timeDesc',
            label: 'Tin mới nhất',
        },
        {
            value: 'timeAsc',
            label: 'Tin cũ nhất',
        },
        {
            value: 'priceAsc',
            label: 'Giá tăng dần',
        },
        {
            value: 'PriceDesc',
            label: 'Giá giảm dần',
        },
        {
            value: 'nameAsc',
            label: 'Tiêu đề A - Z',
        },
        {
            value: 'nameDesc',
            label: 'Tiêu đề Z - A',
        },
    ];
    private value: String = 'timeDesc';

    private changeOrder(val: string): void {
        this.$emit('changeOrder', val);
    }
    private selectClass: string = 'select-mode';
}
</script>

<style lang="scss">
.sorter {
    border: 1px solid #1fb34a;
    border-radius: 3px;
    padding: 5px;
    background: white;
    .mode {
        font-weight: 700;
    }
    .default {
        padding-right: 10px;
        border-right: 1px solid #9a9a9a;
    }
    .map {
        padding-left: 5px;
    }
    .icon {
        margin-right: 0px;
        color: #9a9a9a;
    }
    .default,
    .map:hover {
        cursor: pointer;
    }
    .select-mode {
        color: coral;
        font-weight: bold;
    }
}
.sorter .text {
    margin: 10px;
}
.sorter .select {
    border-bottom: 1px solid #dd8c43;
    padding-top: 3px;
    display: flex;
    float: right;
}
.sorter .view {
    padding-top: 5px;
    font-size: 14px;
    line-height: 1.43;
    float: left;
}
.sorter .el-input__inner {
    border: 0px;
    border-radius: 0;
    padding: 0;
}
.sorter .icon {
    padding: 8px 5px;
}
</style>