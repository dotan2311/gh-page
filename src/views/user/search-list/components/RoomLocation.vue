<template>
    <el-row class="room-location">
        <el-col>
            <el-tooltip content="Vị trí" placement="top">
                <div class="location">
                    <span>
                        <i class="fas fa-map-marker-alt"></i>
                    </span>
                    <span class="address">{{ subLocation }}</span>
                </div>
            </el-tooltip>
            <span class="distance">Cách cổng trường {{ distance }} km </span>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class RoomLocation extends Vue {
    @Prop({ required: true }) private location: string;
    @Prop({ required: true }) private disTanceFromFu: number;

    private subLocation: string = null;
    private distance: number;

    created() {
        this.subLocation = this.location;
        this.distance = parseFloat(this.disTanceFromFu.toFixed(1));
    }
    @Watch('location')
    private locationChange(val: any) {
        this.subLocation = val;
    }
    @Watch('disTanceFromFu')
    private disTanceFromFuChagne(val: any) {
        this.distance = val;
    }
}
</script>

<style>
.room-location {
    margin: 5px 0 5px 0;
}

.room-location .location .address {
    color: #409eff;
}

.room-location .location span {
    margin: 0 5px 0 0;
    font-size: 14px;
}

.room-location .distance {
    font-weight: 500;
    font-family: sans-serif;
    padding-left: 16px;
}

.room-location .distance span {
    padding: 0 0 0 16px;
}
</style>