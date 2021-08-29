<template>
    <el-row class="maintenance">
        <el-image :src="src"></el-image>

        <h1 class="text">Sorry we're down for maintenance</h1>

        <h2 class="text">We'll be back shortly.</h2>
    </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Home extends Vue {
    private src: string = require('../../assets/images/baotri.png');
}
</script>

<style lang="scss" scoped>
.maintenance {
    background-color: #f37125;
    text-align: center;
    padding: 150px;
    height: 100vh;
    .text {
        color: white;
    }
    h1 {
        font-size: 30px;
    }
}
</style>