<template>
    <el-row class="error-page">
        <el-col class="error">
            <h1>Oops!</h1>
            <el-image :src="src">
                <div class="image-slot" slot="error">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <p class="notifi">The page you’re trying to reach doesn’t exist.</p>
            <el-button @click="onClickTitle" type="info">Go Home</el-button>
        </el-col>
    </el-row>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Pages from '@/router/Pages';

    @Component
    export default class Home extends Vue {
        private src: string = require('../../../src/assets/images/error.png');

        private onClickTitle(): void {
            this.$router.push({ path: Pages.home.path });
        }
    }
    
</script>
<style lang="scss" scoped>
    .error-page {
        background-color: #f37125;
        height: 100vh;
    }

    .error-page .el-button--info {
        color: #fff;
        background-color: #444444;
        border-color: #444444;
        padding: 15px 40px;
        font-size: 18px;
        text-transform: uppercase;
        font-weight: bold;
        font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    }

    .error {
        justify-content: center;
        text-align: center;
        padding: 40px;
    }

    .error-page h1 {
        color: white;
        font-family: 'proxima-nova', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 5em;
        font-weight: 400px;
        line-height: 1.3;
        margin: 0 0 0.5rem;
    }

    .error-page .notifi {
        color: white;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 2em;
        line-height: 1.6;
        margin: 1.5rem;
        text-align: inherit;
    }
</style>
