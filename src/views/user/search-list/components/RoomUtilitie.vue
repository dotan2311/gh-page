<template>
    <el-row class="room-utilitie">
        <el-col>
            <el-row>
                <el-tooltip content="Nơi để xe" placement="top-start">
                    <el-col :span="span" class="utilitie">
                        <span>
                            <i class="fas fa-motorcycle"></i>
                        </span>
                        <span v-if="utility.hasParking == true" class="item">Chỗ để xe </span>
                        <span v-else class="item">---</span>
                    </el-col>
                </el-tooltip>

                <el-tooltip content="Phòng trống" placement="top-start">
                    <el-col :span="span" class="utilitie">
                        <span>
                            <i class="fas fa-door-open"></i>
                        </span>
                        <span class="item">{{ roomAvailable }} Phòng trống</span>
                    </el-col>
                </el-tooltip>
                <el-tooltip content="Sức chứa còn lại / các phòng trống" placement="top-start">
                    <el-col :span="span" class="utilitie">
                        <span>
                            <i class="fas fa-users"></i>
                        </span>
                        <span class="item">{{ dormCapacity }} Người</span>
                    </el-col>
                </el-tooltip>
            </el-row>
        </el-col>
    </el-row>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {Utilities} from '@/components/datatable/types';

@Component
export default class RoomUtilitie extends Vue {
    @Prop({ required: false }) private span: number;
    @Prop({ required: false }) private utility: Utilities;
    @Prop({ required: false }) private dormCapacity: number;
    @Prop({ required: false }) private roomAvailable: number;
    private subUtility: Utilities = null;
    created() {
        this.subUtility = this.utility;
    }

    @Watch('utility')
    private changeUtility(val: any) {
        this.subUtility = val;
    }
}
</script>

<style>
.room-utilitie .utilitie {
    margin: 3px 0 4px 0;
}

.room-utilitie .utilitie span {
    font-size: 14px;
    margin: 0 5px 0 0px;
}

.room-utilitie .utilitie .item {
    margin: 0 0 0 5px;
}
</style>