<template>
    <div class="total-result">
        <div class="result">
            <span class="text">Kết quả tìm kiếm:</span>
            <ul class="text-green">
                <li>
                    <span>Phòng trống:</span> <span> {{ roomAvailable }} phòng</span><br />
                </li>
                <li>
                    <span>Sức chứa:</span> <span> {{ roomCapacity }} người</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class totalResult extends Vue {
    @Prop({ required: true }) private roomAvailable: number;
    @Prop({ required: true }) private roomCapacity: number;
    private changeAvailable: number = null;
    private changeCapacity: number = null;

    created() {
        this.changeAvailable = this.roomAvailable;
        this.changeCapacity = this.roomCapacity;
    }

    @Watch('roomAvailable')
    private onRoomAvailableChange(val: any): void {
        this.changeAvailable = val;
    }
    @Watch('roomCapacity')
    private onRoomCapacityChange(val: any): void {
        this.changeCapacity = val;
    }
}
</script>
<style>
.total-result {
    background: white;
    border: 1px solid #dd8c43;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

.total-result .result {
    padding: 5px 0 0 5px;
}

.text-green {
    color: green;
    padding: 0px 0 0 0;
    list-style-type: none;
    margin-top: 1px;
}

.total-result .result .text-green li {
    margin-top: 5px;
}

.total-result .text {
    font-weight: bold;
    font-family: sans-serif;
}
</style>