<template>
    <el-container>
        <el-header class="header-layout">
            <Header />
        </el-header>
        <el-container>
            <el-main class="main-layout">
                <router-view></router-view>
            </el-main>
            <el-footer>
                <Footer />
            </el-footer>
        </el-container>

    </el-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/layout/modules/Header.vue';
import Footer from '@/components/layout/modules/Footer.vue';

@Component({
    components: {
        Header,
        Footer,
    },
})
export default class Layout extends Vue {}
</script>
<style lang="scss" scoped>
.header-layout,
.main-layout {
    padding: 0;
}
</style>
