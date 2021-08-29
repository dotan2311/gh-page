<template>
    <el-row class="room-price">
        <el-col
            ><el-row>
                <el-tooltip content="Giá" placement="top-start">
                    <el-col :span="24" class="price">
                        <span class="icon"><i class="fas fa-money-check-alt"></i></span>
                        <span class="vnd" v-if="minPrice == maxPrice"
                            >Từ {{ formatPrice(priceMin) }} / Tháng</span
                        >
                        <span class="vnd" v-else
                            >Từ {{ formatPrice(priceMin) }} - {{ formatPrice(priceMax) }} /
                            Tháng</span
                        >
                    </el-col>
                </el-tooltip>
            </el-row>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class RoomPrice extends Vue {
    @Prop({ required: true }) private minPrice: number;
    @Prop({ required: true }) private maxPrice: number;

    private priceMin: number;
    private priceMax: number;

    constructor() {
        super();
        this.priceMin = this.minPrice;
        this.priceMax = this.maxPrice;
    }
    private formatPrice(price: number): string {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
    }
}
</script>

<style>
.room-price {
    margin: 0 0 10px 0;
}

.room-price .price .icon {
    padding: 0 10px 0 0;
    font-size: 14px;
}

.room-price .vnd {
    color: #ff3333;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 16px;
}
</style>