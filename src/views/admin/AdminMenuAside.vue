<template>
    <el-container>
        <el-aside :class="{ active: !isCollapse, hidden: isCollapse }" class="layout-aside">
            <el-menu class="layout-aside--menu">
                <div v-if="!isCollapse">
                    <div class="layout-aside--title">
                        <h3
                                style="font-weight: bold; margin-left: 20px; min-width: 175px"
                                v-show="!isCollapse"
                        >
                            Trang Quản Lý
                        </h3>
                        <el-button
                                @click="toggleAside"
                                class="btn-collapse"
                                icon="el-icon-arrow-left"
                        ></el-button>
                    </div>
                    <router-link :to="{ name: 'manageAccount' }" style="text-decoration: none">
                        <el-menu-item :index="page.manageAccount.path">
                            <span>
                                Quản lý Account
                                <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
                            </span>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="{ name: 'manageDorm' }" style="text-decoration: none">
                        <el-menu-item :index="page.manageDorm.path">
                            <span>
                                Quản lý Trọ
                                <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
                            </span>
                        </el-menu-item>
                    </router-link>
                </div>
            </el-menu>
        </el-aside>
        <el-container style="min-width: 100vh; height: 100%">
            <div v-if="isCollapse">
                <div>
                    <el-button
                            @click="toggleAside"
                            class="btn-collapse"
                            icon="el-icon-arrow-right"
                            v-show="isCollapse"
                    ></el-button>
                </div>
            </div>
            <el-main :class="{ active: !isCollapse, hidden: isCollapse }" class="main-content">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Pages from '@/router/Pages';

    @Component({
        components: {},
    })
    export default class Aside extends Vue {
        private isCollapse: boolean = false;
        private page = Pages;

        created() {
        }

        private toggleAside() {
            this.isCollapse = !this.isCollapse;
        }
    }
</script>

<style lang="scss" scoped>
    .layout-aside {
        position: absolute;
        min-height: 120%;
        height: 120vh;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        // z-index: 100;

        .layout-aside--menu {
            height: 100%;

            /deep/ .el-menu-item {
                font-size: 16px;
                font-weight: 500;
            }
        }

        .layout-aside--title {
            height: 44px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #0e5ba9;
            color: #ffffff;
        }
    }
    /deep/ .el-icon-arrow-left {
        font-weight: bold;
        font-size: 20px;
    }

    /deep/ .el-icon-arrow-right {
        font-weight: bold;
        font-size: 20px;
    }

    .btn-collapse {
        left: 0;
        border: none;
        background-color: #0e5ba9;
        color: #ffffff;
        font-weight: bold;
    }

    .layout-aside.hidden {
        width: 0 !important;
        transition: 0.4s ease-in-out !important;
    }

    .layout-aside.active {
        width: 250px !important;
        transition: 0.4s ease-in-out !important;
    }

    .main-content.hidden {
        margin-left: 60px;
    }

    .main-content.active {
        margin-left: 250px;

    }

    .main-content {
        min-height: 100vh;
        height: 100%;
        overflow-y: hidden;
    }
</style>
