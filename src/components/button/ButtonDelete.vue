<template>
    <el-button @click="handleDelete" class="btn-custom btn-delete">
        {{ title? title : $t('common.button.delete') }}
    </el-button>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    enum Events {
        DELETE_MESSAGE = 'on-delete',
    }

    @Component
    export default class ButtonDelete extends Vue {
        @Prop({required: true}) deleteFn!: Function;
        @Prop({required: false}) title!: string;

        public async handleDelete(): Promise<any> {
            await this.deleteFn();
            this.$emit(Events.DELETE_MESSAGE);
        }
    }
</script>

<style lang="scss" scoped>
    .btn-delete {
        background-color: #f26161 !important;
        border: none;
        color: #FFFFFF;
    }
</style>
