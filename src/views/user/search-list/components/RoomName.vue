<template>
    <el-row class="room-name">
        <el-col>
            <el-tooltip :content="name" placement="top">
                <router-link
                    :to="{ name: 'roomList', params: { code: code} }"
                    style="text-decoration: none"
                >
                    <h3>{{ name }}</h3>
                </router-link>
            </el-tooltip>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Pages from '@/router/Pages';

@Component
export default class RoomLocation extends Vue {
    @Prop({ required: true }) private name: string;
    @Prop({ required: true }) private code: string;
    @Prop({ required: true }) private id: string;

    private subName: string = null;
    private roomList: string = Pages.roomList.path;
    private watchName: string = null;

    created() {
        this.watchName = this.name;
    }
    @Watch('name')
    private nameChange(val: any): void {
        this.watchName = val;
    }
}
</script>

<style>
.room-name h3 {
    margin: 0;
    text-transform: uppercase;
    font-family: sans-serif;
    color: #f37125;
    line-height: 1.43;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.room-name .el-tooltip {
    background-color: ivory;
}
</style>