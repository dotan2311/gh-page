<template>
    <el-row class="search-box">
        <el-button @click="handleSearch" class="btn-custom btn-search">
            {{ $t('common.button.search') }}
        </el-button>
        <el-button @click="handleClearTextSearch" class="btn-custom btn-clear-text-search" plain>
            {{ $t('common.button.clearSearch') }}
        </el-button>
    </el-row>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';

    enum Events {
        SEARCH_MESSAGE = 'search',
        CLEAR_MESSAGE = 'clear'
    }

    @Component
    export default class ButtonGroupSearch extends Vue {

        @Prop({required: true}) searchFn!: Function;
        @Prop({required: true}) clearSearchFn!: Function;

        public async handleSearch(): Promise<any> {
            await this.searchFn();
            this.$emit(Events.SEARCH_MESSAGE);
        }

        public async handleClearTextSearch(): Promise<any> {
            await this.clearSearchFn();
            this.$emit(Events.CLEAR_MESSAGE);
        }
    }
</script>

<style lang="scss" scoped>

    .search-box {
        letter-spacing: 0px;
        color: #43425D;
    }

    .search-box .btn-search {
        background-color: #0E5BA9 !important;
        border: 1px solid #0E5BA9;
        color: #FFFFFF;
        width: 120px;
    }

    .search-box .btn-clear-text-search {
        color: #0E5BA9 !important;
        border: 1px solid #0E5BA9;
    }

</style>
