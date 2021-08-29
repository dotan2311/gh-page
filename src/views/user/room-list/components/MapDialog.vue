<template>
    <el-dialog top="5vh" title="Vị trí:" :visible.sync="dialog" class="map-dialog">
        <el-row v-loading="loading">
            <iframe
                class="map"
                loading="lazy"
                width="100%"
                height="500px"
                frameborder="0"
                :src="direction(lat, lng)"
            >
            </iframe>
        </el-row>
    </el-dialog>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
    components: {},
})
export default class RoomDialog extends Vue {
    @Prop({ required: true }) private longitude: string;
    @Prop({ required: true }) private latitude: string;
    private dialog: boolean = false;
    private origin: string = null;
    private destination: string = null;
    private url: string = null;
    private direct: string = null;
    private lng: string = null;
    private lat: string = null;
    private loading: boolean = false;

    public showDialog() {
        this.dialog = true;
        this.url =
            'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDHceKL6LCQusky6nFYduGFGcg4UKyTI6o';
        this.origin = '21.013248159997772,105.5270638872554';
        this.lng = this.longitude;
        this.lat = this.latitude;
    }
    private direction(lat: string, lng: string) {
        this.destination = lat + ', ' + lng;
        return this.url + '&origin=' + this.origin + '&destination=' + this.destination;
    }

    @Watch('longitude')
    private watchLng(val: any) {
        this.lng = val;
    }
    @Watch('latitude')
    private watchLat(val: any) {
        this.lat = val;
    }
}
</script>

<style lang="scss" scoped>
.map {
    background-image: url('../../../../assets/images/map_loading.gif');
    background-size: 200px 200px;
    background-position: center;

    background-repeat: no-repeat;
}
/deep/.el-dialog__body {
    padding: 0 20px 20px 20px;
}
</style>