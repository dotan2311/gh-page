<template>
    <div class="dorm-image">
        <el-card class="box-card">
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item :key="item" v-for="item in 4">
                    <el-image :src="image" class="image"></el-image>
                </el-carousel-item>
            </el-carousel>

        </el-card>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class DormImage extends Vue {
        private image: String;

        constructor() {
            super();
            this.image = `https://www.thespruce.com/thmb/EvdqR5HNV6Ev9RBv8qGqHNE8DoM=/3636x2045/smart/filters:no_upscale()/how-to-arrange-living-room-furniture-1976578-hero-c99074dcad854b669b91652046a39203.jpg`;
        }
    }
</script>

<style lang="scss" scoped>
    .dorm-image {
        .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.1;
            line-height: 200px;
            margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }

        .image {
            width: 1500px;
            height: 300px;
        }

    }

</style>