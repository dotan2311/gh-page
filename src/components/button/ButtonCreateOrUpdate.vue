<template>
    <el-button @click="handleCreate" class="btn-custom btn-create">
        {{ $t(`${title}`) }}
    </el-button>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import i18n from '@/i18n';

    enum Events {
        CREATE_MESSAGE = 'on-create'
    }

    @Component
    export default class ButtonCreateOrUpdate extends Vue {

        @Prop({required: true}) createFn!: Function;
        @Prop({required: false, default: String(i18n.t('common.button.update'))}) title!: string;

        public async handleCreate(): Promise<any> {
            await this.createFn();
            this.$emit(Events.CREATE_MESSAGE);
        }
    }
</script>

<style lang="scss" scoped>

    .btn-create {
        width: 150px;
        font-size: 14px;
        height: 39px;
        border: none;
        color: #FFFFFF;
        background-color: #0E5BA9 !important;
    }

</style>
