<template>
    <el-collapse-item :name="name">
        <template slot="title">
            <div class="collapse__title">
                {{title}}
            </div>
        </template>
        <div class="collapse__content">
            <slot name="content"></slot>
        </div>
    </el-collapse-item>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        components: {}
    })
    export default class CollapseItem extends Vue {
        @Prop()
        private title: string;
        @Prop({required: true})
        private name: string;
    }
</script>
<style lang="scss" scoped>
    .collapse__title {
        margin: 10px;
    }

    /deep/ .el-collapse-item__header {
        height: 32px;
        line-height: 32px;
        background-color: #2B2B2B;
        color: #FFFFFF;
    }

    .collapse__content {
        padding: 20px;
        overflow: auto;
    }
</style>