<template>
    <el-row class="room-rating">
        <el-col>
            <el-rate disabled score-template="{value} points" text-color="#ff9900" v-model="rating">
            </el-rate>
        </el-col>
    </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class RoomLocation extends Vue {
    private rating: number;

    constructor() {
        super();
        this.rating = 3.7;
    }
}

// export default {
//   name: "room-rating",
//   data() {
//     return {
//       rating: 4.5,
//     };
//   },
//   methods: {},
//   components: {
//     StarRating,
//   },
// };
</script>

<style>
</style>