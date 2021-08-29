<template>
    <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="room">
        <el-row shadow="always" class="room-card">
            <el-col>
                <room-image
                    :imageByte="imageByte"
                    :code="code"
                    :id="dormId"
                    :favourite="favourite"
                    :userId="userId"
                />
                <el-row>
                    <el-col class="intro">
                        <room-name :name="name" :code="code" :id="dormId" />
                        <room-location :location="location" :disTanceFromFu="disTanceFromFu" />
                        <room-utilitie
                            :span="12"
                            :utility="utility"
                            :dormCapacity="dormCapacity"
                            :roomAvailable="roomAvailable"
                        />
                        <hr />
                        <room-price :minPrice="minPrice" :maxPrice="maxPrice" />
                        <hr />
                        <room-interact :createDate="createDate" />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RoomImage from './RoomImage.vue';
import RoomName from './RoomName.vue';
import RoomLocation from './RoomLocation.vue';
import RoomUtilitie from './RoomUtilitie.vue';
import RoomInteract from './RoomInteract.vue';
import RoomPrice from './RoomPrice.vue';

@Component({
    components: {
        RoomImage,
        RoomName,
        RoomLocation,
        RoomUtilitie,
        RoomInteract,
        RoomPrice,
    },
})
export default class RoomInfor extends Vue {
    @Prop({ required: true }) private result: any;
    @Prop({ required: true }) private userId: number;

    private name: string = null;
    private location: string = null;
    private disTanceFromFu: number = null;
    private utility: any = null;
    private minPrice: number = null;
    private maxPrice: number = null;
    private createDate: Date = null;
    private imageByte: string = null;
    private dormCapacity: number = null;
    private roomAvailable: number = null;
    private code: string = null;
    private dormId: number = null;
    private favourite: any = null;
    constructor() {
        super();
        this.code = this.result.code;
        this.dormId = this.result.dormId;
        this.name = this.result.name;
        this.location =
            this.result.address.civilGroupName != ''
                ? this.result.address.civilGroupName +
                  ' - ' +
                  this.result.address.districtName +
                  ' - ' +
                  this.result.address.subDistrictName
                : this.result.address.districtName + ' - ' + this.result.address.subDistrictName;
        this.disTanceFromFu = this.result.distanceFromFU;
        this.utility = this.result.dormUtilities;
        this.minPrice = this.result.minPrice;
        this.maxPrice = this.result.maxPrice;
        this.createDate = this.result.createdTime;
        this.imageByte = this.result.listUrl[0].bytes;
        this.dormCapacity = this.result.capacity;
        this.roomAvailable = this.result.roomAvailable;
        this.favourite = this.result.favouriteDormEntity;
    }
}
</script>
<style>
.room .room-card {
    border: 2px solid #bbbbbb;
    background: white;
}
.room .room-card:hover {
    border: 2px solid #e6a23c;
    transition: 0.3s ease-out;
}
.room-infor {
    border-radius: 4px;
    margin: 0;
}
.intro {
    padding: 0 10px 0px 10px;
}
.room-infor .el-card__body {
    padding: 0;
}
.room-infor .room {
    padding: 5px;
}
</style>