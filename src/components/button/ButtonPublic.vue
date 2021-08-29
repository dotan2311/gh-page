<template>
    <el-button @click="handlePublic" class="btn-custom btn-public">
        {{ title }}
    </el-button>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    enum Events {
        PUBLIC = 'public',
    }

    @Component
    export default class ButtonPublic extends Vue {

        @Prop({required: false, default: 'Public'}) title!: string;
        @Prop({required: true}) publicFn!: Function;

        public async handlePublic(): Promise<any> {
            await this.publicFn();
            this.$emit(Events.PUBLIC);
        }
    }
</script>

<style lang="scss" scoped>
    .btn-public {
        width: 200px;
        font-size: 16px;
        height: 39px;
        border: none;
        background-color: #1FA9D8 !important;
    }
</style>
